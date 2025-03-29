function RaceResults({ raceResults }) {
    return (
        <table className="w-full text-black">
            <thead className="border border-grey-20 border-t-0 border-l-0 border-r-0">
                <tr>
                    <th className="p-normal text-left">Pos</th>
                    <th className="p-normal text-left">Nome</th>
                    <th className="p-normal text-left">Equipa</th>
                    <th className="p-normal text-left">Tempo médio</th>
                    <th className="p-normal text-left">Nº de voltas</th>
                </tr>
            </thead>
            <tbody>
                {raceResults.map((pilot, index) => (
                    <tr key={index} className={index % 2 == 0 ? "bg-white" : "bg-grey"}>
                        <td className="p-normal">{pilot.rank}</td>
                        <td className="p-normal">{pilot.name}</td>
                        <td className="p-normal">{pilot.team}</td>
                        <td className="p-normal">{pilot.avg}</td>
                        <td className="p-normal">{pilot.laps}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default RaceResults;