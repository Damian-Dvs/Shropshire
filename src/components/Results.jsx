const raceResults = [
    { date: '2025-07-14', track: 'placeholder', position: 'P2' },
    { date: '2025-06-27', track: 'placeholder', position: 'P1 🏆' },
    { date: '2025-06-10', track: 'placeholder', position: 'P3' },
  ];
  
  function Results() {
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
                {raceResults.map((race, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-gray-100`}>
                    <td className="py-3 px-4">{race.date}</td>
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
  }
  
  export default Results;
  