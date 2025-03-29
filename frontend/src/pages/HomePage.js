function HomePage({ totalResults, setActiveSection }) {
    return (
        <div className='content flex-1 bg-black pt-10'>
            <div className='max-w-screen-xl h-full mx-auto'>
                <h2 className="featured-title font-bold text-4xl uppercase pb-10">GP Fafe Indoor</h2>
                <div className="featured-content w-full pb-10 flex flex-row items-top">
                    <div className="w-2/5 inline-block">
                        <img src="https://cdn.visitportugal.com/sites/default/files/styles/destinos_galeria/public/mediateca/Speedkart%20Indoor%20Fafe_1.jpg?itok=Yz1GAXbw" alt="news"></img>
                    </div>
                    <div className="race-resume w-3/5 inline-block px-10">
                        <h3 className="text-xl font-bold mb-2">André faz a dobradinha na estreia do campeonato do mundo</h3>
                        <p>Após um início difícil, André faz uma corrida de recuperação e arrecada a primeira vitória da época. Aos 8 pontos da corrida, junta ainda os 8 pontos da volta mais rápida. Início perfeito para o piloto da [Team1].</p> 
                        <p>Ribeiro sai em lágrimas.</p>
                        <div className="race-results mt-10 flex flex-row items-center">
                            <div className="results mx-auto">
                                {totalResults.slice(0,3).map((pilot, index) => (
                                    <div key={index} className="bg-white text-black mx-1 rounded-sm w-54 px-2 inline-block">
                                        <div className={`w-5 inline-block text-sm font-black team-${pilot.team}`}>{pilot.rank}</div>
                                        <div className="w-20 inline-block text-sm font-bold">{pilot.name}</div>
                                        <div className="w-15 inline-block text-sm">{pilot.pts} pts</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="see-results-container mt-4 w-full text-center">
                            <div onClick={() => setActiveSection('races')} className="bg-red cursor-pointer inline-block py-2 px-8">
                                Ver resultados
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;