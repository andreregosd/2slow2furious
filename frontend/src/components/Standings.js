function Standings({ standings }) {
    return (
        <table className="w-full text-black text-xs sm:text-base mb-10">
            <thead className="border border-grey-20 border-t-0 border-l-0 border-r-0">
                <tr>
                    <th className="sm:p-5 p-2 text-left">Pos</th>
                    <th className="sm:p-5 p-2 text-left">Nome</th>
                    <th className="sm:p-5 p-2 text-left">Equipa</th>
                    <th className="sm:p-5 p-2 text-left">Pts</th>
                </tr>
            </thead>
            <tbody>
                {standings.map((pilot, index) => (
                    <tr key={index} className={index % 2 == 0 ? "bg-white" : "bg-grey"}>
                        <td className="sm:p-5 p-2">{pilot.rank}</td>
                        <td className="sm:p-5 p-2">{pilot.name}</td>
                        <td className="sm:p-5 p-2">{pilot.team}</td>
                        <td className="sm:p-5 p-2">{pilot.pts}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Standings;