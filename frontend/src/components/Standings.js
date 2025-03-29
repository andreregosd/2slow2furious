function Standings({ standings }) {
    return (
        <table className="w-full text-black">
            <thead className="border border-grey-20 border-t-0 border-l-0 border-r-0">
                <tr>
                    <th className="p-normal text-left">Pos</th>
                    <th className="p-normal text-left">Nome</th>
                    <th className="p-normal text-left">Equipa</th>
                    <th className="p-normal text-left">Pts</th>
                </tr>
            </thead>
            <tbody>
                {standings.map((pilot, index) => (
                    <tr key={index} className={index % 2 == 0 ? "bg-white" : "bg-grey"}>
                        <td className="p-normal">{pilot.rank}</td>
                        <td className="p-normal">{pilot.name}</td>
                        <td className="p-normal">{pilot.team}</td>
                        <td className="p-normal">{pilot.pts}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Standings;