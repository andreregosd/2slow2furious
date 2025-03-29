import React, { useState } from 'react';
import RaceResults from '../components/RaceResults';
import LapResults from '../components/LapResults';
import Standings from '../components/Standings';

function RacesPage({ allResults }) {
    const [activeTab, setActiveTab] = useState('race');
    const [activeGP, setActiveGP] = useState(0);
    return (
        <div className='content flex-1 pt-10'>
            <div className='max-w-screen-xl h-full mx-auto'>
                <h3 className="float-left text-black text-2xl mb-8">{allResults[activeGP].gp}</h3>
                <div className="buttons-container float-right">
                    <div className={activeTab == 'race' ? "btn-f1 inline-block mx-1 active" : "btn-f1 inline-block mx-1"} onClick={() => setActiveTab('race')}>Corrida</div>
                    <div className={activeTab == 'lap' ? "btn-f1 inline-block mx-1 active" : "btn-f1 inline-block mx-1"} onClick={() => setActiveTab('lap')}>Melhor volta</div>
                    <div className={activeTab == 'total' ? "btn-f1 inline-block mx-1 active" : "btn-f1 inline-block mx-1"} onClick={() => setActiveTab('total')}>Total</div>
                </div>
                {activeTab === 'race' && <RaceResults raceResults={allResults[activeGP].raceResults} />}
                {activeTab === 'lap' && <LapResults lapResults={allResults[activeGP].lapResults} />}
                {activeTab === 'total' && <Standings standings={allResults[activeGP].totalResults} />}
                <div className="buttons-container w-full mt-4">
                    {activeGP > 0 && <div className="btn-f1 inline-block mx-1 float-left" onClick={() => setActiveGP(activeGP - 1)}>Próximo GP</div>}
                    {activeGP + 1 < allResults.length && <div className="btn-f1 inline-block mx-1 float-right" onClick={() => setActiveGP(activeGP + 1)}>GP anterior</div>}
                </div>
            </div>
        </div>
    );
}

export default RacesPage;