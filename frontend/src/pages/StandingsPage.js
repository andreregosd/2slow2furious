import React, { useState } from 'react';
import Standings from '../components/Standings';
import TeamStandings from '../components/TeamStandings';

function StandingsPage({ standings }) {
    const [isPilotsStandings, setIsPilotsStandings] = useState(true);
    return (
        <div className='content flex-1 pt-10'>
            <div className='xl:max-w-screen-xl max-w-screen-lg h-full mx-auto px-6'>
                <h3 className="float-left lg:w-auto w-full pl-2 text-black text-2xl mb-8">{isPilotsStandings ? "Mundial de pilotos 2025" : "Mundial de equipas 2025"}</h3>
                <div className="buttons-container float-left lg:float-right text-xs lg:text-base">
                    <div className={isPilotsStandings ? "lg:btn-f1 sm-btn-f1 inline-block mx-1 active" : "lg:btn-f1 sm-btn-f1 inline-block mx-1"} onClick={() => setIsPilotsStandings(true)}>Pilotos</div>
                    <div className={!isPilotsStandings ? "lg:btn-f1 sm-btn-f1 inline-block mx-1 active" : "lg:btn-f1 sm-btn-f1 inline-block mx-1"} onClick={() => setIsPilotsStandings(false)}>Equipas</div>
                </div>
                {isPilotsStandings && <Standings standings={ standings } />}
                {!isPilotsStandings && <TeamStandings standings={ standings } />}
            </div>
        </div>
    );
}

export default StandingsPage;