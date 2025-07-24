import React, { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"] | order(publishedAt desc){
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

  return (
    <section className="pt-32 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">

        {/* ✅ Visible and spaced Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-teal-600 hover:text-teal-800 text-sm font-semibold underline"
          >
            ← Back to Home
          </button>
        </div>

        <h2 className="text-4xl font-bold text-center text-black mb-12">
          Blog
        </h2>

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-50 p-6 rounded-2xl shadow-md mb-8"
          >
            <h3 className="text-2xl font-bold text-black mb-2">{post.title}</h3>
            <p className="text-gray-500 text-sm mb-4">
              {new Date(post.publishedAt).toLocaleDateString("en-GB")}
            </p>

            <div className="text-gray-800">
              {expanded === post._id ? (
                <>
                  <PortableText value={post.body} />
                  <button
                    onClick={() => setExpanded(null)}
                    className="text-teal-600 mt-4 underline hover:text-teal-800"
                  >
                    Show Less ▲
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setExpanded(post._id)}
                  className="text-teal-600 font-semibold hover:text-teal-800"
                >
                  ▸ Read More
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
