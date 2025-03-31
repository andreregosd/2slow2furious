import React, { useState } from 'react';
import RaceResults from '../components/RaceResults';
import LapResults from '../components/LapResults';
import Standings from '../components/Standings';

function RacesPage({ allResults }) {
    const [activeTab, setActiveTab] = useState('race');
    const [activeGP, setActiveGP] = useState(0);
    return (
        <div className='content flex-1 pt-10'>
            <div className='xl:max-w-screen-xl max-w-screen-lg h-full mx-auto px-6'>
                <h3 className="float-left lg:w-auto w-full pl-2 text-black text-2xl mb-8">{allResults[activeGP].gp}</h3>
                <div className="buttons-container float-left lg:float-right text-xs lg:text-base">
                    <div className={activeTab === 'race' ? "lg:btn-f1 sm-btn-f1 inline-block mx-1 active" : "lg:btn-f1 sm-btn-f1 inline-block mx-1"} onClick={() => setActiveTab('race')}>Corrida</div>
                    <div className={activeTab === 'lap' ? "lg:btn-f1 sm-btn-f1 inline-block mx-1 active" : "lg:btn-f1 sm-btn-f1 inline-block mx-1"} onClick={() => setActiveTab('lap')}>Melhor volta</div>
                    <div className={activeTab === 'total' ? "lg:btn-f1 sm-btn-f1 inline-block mx-1 active" : "lg:btn-f1 sm-btn-f1 inline-block mx-1"} onClick={() => setActiveTab('total')}>Total</div>
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