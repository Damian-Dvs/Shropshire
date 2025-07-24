import React, { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { useNavigate } from "react-router-dom";

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"] | order(publishedAt desc)[0...3]{
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        body
      }`;
      const result = await client.fetch(query);
      setPosts(result);
    };

    fetchPosts();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-16 bg-white" id="blog-preview">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-black mb-12">
          Latest Blog Posts
        </h2>

        {posts.map((post) => (
          <div key={post._id} className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-bold text-black mb-2">{post.title}</h3>
            <p className="text-gray-500 text-sm mb-2">
              {new Date(post.publishedAt).toLocaleDateString("en-GB")}
            </p>
            {expandedId === post._id ? (
              <>
                <PortableText value={post.body} />
                <button
                  className="text-teal-600 mt-3 underline hover:text-teal-800"
                  onClick={() => toggleExpand(post._id)}
                >
                  ▲ Show Less
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-2">{post.excerpt}</p>
                <button
                  className="text-teal-600 font-semibold hover:text-teal-800"
                  onClick={() => toggleExpand(post._id)}
                >
                  ▸ Read More
                </button>
              </>
            )}
          </div>
        ))}

        <div className="text-center mt-8">
          <button
            className="bg-teal-600 text-white px-6 py-3 rounded shadow hover:bg-teal-700"
            onClick={() => navigate("/blog")}
          >
            View All Blog Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
