import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import StandingsPage from './pages/StandingsPage';
import RacesPage from './pages/RacesPage';

function App() {
    const [activeSection, setActiveSection] = useState('home');

    const [allResults, setAllResults] = useState([]);
    const [standings, setStandings] = useState([]);

    useEffect(() => {
      setStandings([
        { rank : 1, name : "André", team: "Red Bull", pts : 16 },
        { rank : 2, name : "Ribeiro", team: "McLaren", pts : 11 },
        { rank : 3, name : "Alex", team: "Ferrari", pts : 9 },
        { rank : 4, name : "Ruben", team: "McLaren", pts : 8 },
        { rank : 5, name : "Bruno", team: "Red Bull", pts : 6 },
        { rank : 6, name : "Dany", team: "Ferrari", pts : 6 },
      ]);
    }, []);

    useEffect(() => {
      setAllResults([
        {
          gp : "GP Fafe Indoor",
          season : "2025",
          date : "23 Março",
          raceResults : [
            { rank : 1, name : "André", team: "Red Bull", avg : 30.354, laps: 39 },
            { rank : 2, name : "Ruben", team: "McLaren", avg : 31.061, laps: 38 },
            { rank : 3, name : "Ribeiro", team: "McLaren", avg : 31.797, laps: 37 },
            { rank : 4, name : "Alex", team: "Ferrari", avg : 32.033, laps: 37 },
            { rank : 5, name : "Bruno", team: "Red Bull", avg : 33.425, laps: 35 },
            { rank : 6, name : "Dany", team: "Ferrari", avg : 33.445, laps: 35 },
          ],
          lapResults : [
            { rank : 1, name : "André", team: "Red Bull", time : 26.590 },
            { rank : 2, name : "Ribeiro", team: "McLaren", time : 26.815 },
            { rank : 3, name : "Alex", team: "Ferrari", time : 27.094 },
            { rank : 4, name : "Dany", team: "Ferrari", time : 27.147 },
            { rank : 5, name : "Bruno", team: "Red Bull", time : 27.175 },
            { rank : 6, name : "Ruben", team: "McLaren", time : 27.436 },
          ],
          totalResults : [
            { rank : 1, name : "André", team: "Red Bull", pts : 16 },
            { rank : 2, name : "Ribeiro", team: "McLaren", pts : 11 },
            { rank : 3, name : "Alex", team: "Ferrari", pts : 9 },
            { rank : 4, name : "Ruben", team: "McLaren", pts : 8 },
            { rank : 5, name : "Bruno", team: "Red Bull", pts : 6 },
            { rank : 6, name : "Dany", team: "Ferrari", pts : 6 }
          ]
        }
      ]);
    }, []);

    return (
        <div className="text-white h-screen flex flex-col font-f1">
            <nav class="border-gray-200 bg-red h-20">
              <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
                <a href="#" onClick={() => setActiveSection('home')} class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} class="h-8" alt="Logo" />
                    <span class="hidden self-center text-2xl font-semibold whitespace-nowrap">Lentos e calmos</span>
                </a>
                <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                  <ul class="flex flex-col font-medium mt-4 md:space-x-20 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li>
                      <a href="#" onClick={() => setActiveSection('standings')} class="block text-lg py-2 px-3 md:p-0" aria-current="page">Classificação</a>
                    </li>
                    <li>
                      <a href="#" onClick={() => setActiveSection('races')} class="block text-lg py-2 px-3 md:p-0">Corridas</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>            
            {activeSection === 'home' && allResults.length > 0 && <HomePage totalResults={allResults[0].totalResults} setActiveSection={setActiveSection} />}
            {activeSection === 'standings' && <StandingsPage standings={standings} />}
            {activeSection === 'races' && <RacesPage allResults={allResults} />}
        </div>
    );
}

export default App;