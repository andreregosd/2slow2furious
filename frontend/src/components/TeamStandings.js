function TeamStandings({ standings }) {
    let teamStandings = [];
    let teams = {};
    for(let i = 0; i < standings.length; i++){
        if (!teams[standings[i].team]) {
            teams[standings[i].team] = { name: standings[i].team, pts: 0 };
        }
        teams[standings[i].team].pts += standings[i].pts;
    }
    teamStandings = Object.values(teams);
    teamStandings.sort((a, b) => b.pts - a.pts);

    return (
        <table className="w-full text-black">
            <thead className="border border-grey-20 border-t-0 border-l-0 border-r-0">
                <tr>
                    <th className="p-normal text-left">Pos</th>
                    <th className="p-normal text-left">Equipa</th>
                    <th className="p-normal text-left">Pts</th>
                </tr>
            </thead>
            <tbody>
                {teamStandings.map((team, index) => (
                    <tr key={index} className={index % 2 == 0 ? "bg-white" : "bg-grey"}>
                        <td className="p-normal">{index + 1}</td>
                        <td className="p-normal">{team.name}</td>
                        <td className="p-normal">{team.team}</td>
                        <td className="p-normal">{team.pts}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TeamStandings;