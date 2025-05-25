import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import StandingsPage from './pages/StandingsPage';
import RacesPage from './pages/RacesPage';

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [opened, setOpened] = useState(false);

    const [allResults, setAllResults] = useState([]);
    const [standings, setStandings] = useState([]);

    useEffect(() => {
      setStandings([
        { rank : 1, name : "André", team: "Red Bull", teamColor: "redbull", pts : 23 },
        { rank : 2, name : "Ribeiro", team: "McLaren", teamColor: "mclaren", pts : 23 },
        { rank : 3, name : "Alex", team: "Ferrari", teamColor: "ferrari", pts : 20 },
        { rank : 4, name : "Bruno", team: "Red Bull", teamColor: "redbull", pts : 19 },
        { rank : 5, name : "Ruben", team: "McLaren", teamColor: "mclaren", pts : 16 },
        { rank : 6, name : "Dany", team: "Ferrari", teamColor: "ferrari", pts : 11 },
      ]);
    }, []);

    useEffect(() => {
      setAllResults([
        {
          gp : "GP Famalicão",
          season : "2025",
          date : "24 Maio",
          raceResults : [
            { rank : 1, name : "Alex", team: "Ferrari", teamColor: "ferrari", avg : 29.857, laps: 40 },
            { rank : 2, name : "Ribeiro", team: "McLaren", teamColor: "mclaren", avg : 30.104, laps: 39 },
            { rank : 3, name : "Bruno", team: "Red Bull", teamColor: "redbull", avg : 31.003, laps: 39 },
            { rank : 4, name : "Ruben", team: "McLaren", teamColor: "mclaren", avg : 31.390, laps: 39 },
            { rank : 5, name : "Dany", team: "Ferrari", teamColor: "ferrari", avg : 31.406, laps: 39 },
            { rank : 6, name : "André", team: "Red Bull", teamColor: "redbull", avg : 31.655, laps: 39 },
          ],
          lapResults : [
            { rank : 1, name : "Bruno", team: "Red Bull", teamColor: "redbull", time : 26.590 },
            { rank : 2, name : "Ribeiro", team: "McLaren", teamColor: "mclaren", time : 26.815 },
            { rank : 3, name : "André", team: "Red Bull", teamColor: "redbull", time : 27.094 },
            { rank : 4, name : "Ruben", team: "McLaren", teamColor: "mclaren", time : 27.147 },
            { rank : 5, name : "Alex", team: "Ferrari", teamColor: "ferrari", time : 27.175 },
            { rank : 6, name : "Dany", team: "Ferrari", teamColor: "ferrari", time : 27.436 },
          ],
          totalResults : [
            { rank : 1, name : "Bruno", team: "Red Bull", teamColor: "redbull", pts : 13 },
            { rank : 2, name : "Ribeiro", team: "McLaren", teamColor: "mclaren", pts : 12 },
            { rank : 3, name : "Alex", team: "Ferrari", teamColor: "ferrari", pts : 11 },
            { rank : 4, name : "Ruben", team: "McLaren", teamColor: "mclaren", pts : 8 },
            { rank : 5, name : "André", team: "Red Bull", teamColor: "redbull", pts : 7 },
            { rank : 6, name : "Dany", team: "Ferrari", teamColor: "ferrari", pts : 5 }
          ]
        },
        {
          gp : "GP Fafe Indoor",
          season : "2025",
          date : "23 Março",
          raceResults : [
            { rank : 1, name : "André", team: "Red Bull", teamColor: "redbull", avg : 30.354, laps: 39 },
            { rank : 2, name : "Ruben", team: "McLaren", teamColor: "mclaren", avg : 31.061, laps: 38 },
            { rank : 3, name : "Ribeiro", team: "McLaren", teamColor: "mclaren", avg : 31.797, laps: 37 },
            { rank : 4, name : "Alex", team: "Ferrari", teamColor: "ferrari", avg : 32.033, laps: 37 },
            { rank : 5, name : "Bruno", team: "Red Bull", teamColor: "redbull", avg : 33.425, laps: 35 },
            { rank : 6, name : "Dany", team: "Ferrari", teamColor: "ferrari", avg : 33.445, laps: 35 },
          ],
          lapResults : [
            { rank : 1, name : "André", team: "Red Bull", teamColor: "redbull", time : 26.590 },
            { rank : 2, name : "Ribeiro", team: "McLaren", teamColor: "mclaren", time : 26.815 },
            { rank : 3, name : "Alex", team: "Ferrari", teamColor: "ferrari", time : 27.094 },
            { rank : 4, name : "Dany", team: "Ferrari", teamColor: "ferrari", time : 27.147 },
            { rank : 5, name : "Bruno", team: "Red Bull", teamColor: "redbull", time : 27.175 },
            { rank : 6, name : "Ruben", team: "McLaren", teamColor: "mclaren", time : 27.436 },
          ],
          totalResults : [
            { rank : 1, name : "André", team: "Red Bull", teamColor: "redbull", pts : 16 },
            { rank : 2, name : "Ribeiro", team: "McLaren", teamColor: "mclaren", pts : 11 },
            { rank : 3, name : "Alex", team: "Ferrari", teamColor: "ferrari", pts : 9 },
            { rank : 4, name : "Ruben", team: "McLaren", teamColor: "mclaren", pts : 8 },
            { rank : 5, name : "Bruno", team: "Red Bull", teamColor: "redbull", pts : 6 },
            { rank : 6, name : "Dany", team: "Ferrari", teamColor: "ferrari", pts : 6 }
          ]
        }
      ]);
    }, []);

    return (
        <div className="text-white h-screen flex flex-col font-f1">
            <nav className="bg-red sm:h-20 h-14">
              <div className="xl:max-w-screen-xl max-w-screen-lg flex flex-wrap items-center justify-between mx-auto sm:p-6 p-4">
                <a onClick={() => setActiveSection('home')} className="cursor-pointer flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="sm:h-8 h-6" alt="Logo" />
                    <span className="hidden self-center text-2xl font-semibold whitespace-nowrap">Lentos e calmos</span>
                </a>
                <button type="button md:hidden" onClick={() => setOpened(!opened)}>
                    <svg className="md:hidden w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                  <ul className="flex flex-col font-medium mt-4 md:space-x-20 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li>
                      <a onClick={() => {setOpened(false); setActiveSection('standings')}} className="cursor-pointer block text-lg py-2 px-3 md:p-0" aria-current="page">Classificação</a>
                    </li>
                    <li>
                      <a onClick={() => {setOpened(false); setActiveSection('races')}} className="cursor-pointer block text-lg py-2 px-3 md:p-0">Corridas</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>  
            <div className={opened ? "mobile-menu md:hidden w-full bg-red pb-2" : "mobile-menu hidden w-full bg-red pb-2"}>
              <ul className="">
                <li className="px-6 py-2">
                  <a onClick={() => {setOpened(false); setActiveSection('standings')}} className="cursor-pointer block text-lg px-1 py-1">Classificação</a>
                </li>
                <li className="px-6 py-2">
                  <a onClick={() => {setOpened(false); setActiveSection('races')}} className="cursor-pointer block text-lg px-1 py-1">Corridas</a>
                </li>
              </ul>
            </div>          
            {activeSection === 'home' && allResults.length > 0 && <HomePage allResults={allResults[0]} setActiveSection={setActiveSection} />}
            {activeSection === 'standings' && <StandingsPage standings={standings} />}
            {activeSection === 'races' && <RacesPage allResults={allResults} />}
        </div>
    );
}

export default App;