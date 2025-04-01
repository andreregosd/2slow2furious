function LapResults({ lapResults }) {
    return (
        <table className="w-full text-black text-xs sm:text-base">
            <thead className="border border-grey-20 border-t-0 border-l-0 border-r-0">
                <tr>
                    <th className="sm:p-5 p-2 text-left">Pos</th>
                    <th className="sm:p-5 p-2 text-left">Nome</th>
                    <th className="sm:p-5 p-2 text-left">Equipa</th>
                    <th className="sm:p-5 p-2 text-left">Melhor tempo</th>
                </tr>
            </thead>
            <tbody>
                {lapResults.map((pilot, index) => (
                    <tr key={index} className={index % 2 == 0 ? "bg-white" : "bg-grey"}>
                        <td className="sm:p-5 p-2">{pilot.rank}</td>
                        <td className="sm:p-5 p-2">{pilot.name}</td>
                        <td className="sm:p-5 p-2">{pilot.team}</td>
                        <td className="sm:p-5 p-2">{pilot.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LapResults;