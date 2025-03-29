import React, { useState } from 'react';
import Standings from '../components/Standings';
import TeamStandings from '../components/TeamStandings';

function StandingsPage({ standings }) {
    const [isPilotsStandings, setIsPilotsStandings] = useState(true);
    return (
        <div className='content flex-1 pt-10'>
            <div className='max-w-screen-xl h-full mx-auto'>
                <h3 className="float-left text-black text-2xl mb-8">{isPilotsStandings ? "Mundial de pilotos 2025" : "Mundial de equipas 2025"}</h3>
                <div className="buttons-container float-right">
                    <div className={isPilotsStandings ? "btn-f1 inline-block mx-1 active" : "btn-f1 inline-block mx-1"} onClick={() => setIsPilotsStandings(true)}>Pilotos</div>
                    <div className={!isPilotsStandings ? "btn-f1 inline-block mx-1 active" : "btn-f1 inline-block mx-1"} onClick={() => setIsPilotsStandings(false)}>Equipas</div>
                </div>
                {isPilotsStandings && <Standings standings={ standings } />}
                {!isPilotsStandings && <TeamStandings standings={ standings } />}
            </div>
        </div>
    );
}

export default StandingsPage;