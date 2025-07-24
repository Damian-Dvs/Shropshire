import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

const Results = () => {
  const [raceResults, setRaceResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const query = `*[_type == "raceResult"] | order(date desc){
        _id,
        date,
        track,
        position
      }`;
      const data = await client.fetch(query);
      setRaceResults(data);
    };

    fetchResults();
  }, []);

  return (
    <section id="results" className="bg-gray-100 py-16 px-6 md:px-20 text-black">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Race Results</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4">Position</th>
              </tr>
            </thead>
            <tbody>
              {raceResults.map((race) => (
                <tr key={race._id} className="bg-white border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{new Date(race.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{race.track}</td>
                  <td className="py-3 px-4 font-bold">{race.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Results;
