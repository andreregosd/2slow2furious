function HomePage({ allResults, post, setActiveSection }) {
    return (
        <div className='content flex-1 bg-black grid content-center'>
            <div className='featured-content-container xl:max-w-screen-xl max-w-screen-md h-full mx-auto px-5'>
                <h2 className="featured-title font-bold text-4xl uppercase pb-10">{ post.title }</h2>
                <div className="featured-content w-full pb-10 xl:flex xl:flex-row xl:items-top">
                    <div className="race-resume xl:w-3/5 pr-5">
                        <h3 className="text-xl font-bold mb-2">{ post.subtitle }</h3>
                        { post.text }
                    </div>
                    { allResults.raceResults !== undefined && 
                        <div className="all-results xl:w-2/5 xl:text-left text-center xl:pl-10 mt-8 xl:mt-0">
                            <div className="race-results mx-auto mb-2 inline-block xl:block">
                                <h4 className="color-grey text-sm text-left pl-1">- corrida -</h4>
                                {allResults.raceResults.slice(0,3).map((pilot, index) => (
                                    <div key={index} className="bg-white text-black text-xs xl:mx-1 mx-2 mb-1 rounded-sm px-2 py-1 xl:inline w-36">
                                        <div className={`w-4 inline-block font-black text-left team-${pilot.teamColor}`}>{pilot.rank}</div>
                                        <div className="w-16 pl-1 inline-block font-bold text-left">{pilot.name}</div>
                                        <div className="w-12 inline-block text-right">{pilot.avg.toString().substring(0,5)}s</div>
                                    </div>
                                ))}
                            </div>
                            <div className="lap-results mx-auto mb-2 inline-block xl:block">
                                <h4 className="color-grey text-sm text-left pl-1">- melhor volta -</h4>
                                {allResults.lapResults.slice(0,3).map((pilot, index) => (
                                    <div key={index} className="bg-white text-black text-xs xl:mx-1 mx-2 mb-1 rounded-sm px-2 py-1 xl:inline w-36">
                                        <div className={`w-4 inline-block font-black text-left team-${pilot.teamColor}`}>{pilot.rank}</div>
                                        <div className="w-16 pl-1 inline-block font-bold text-left">{pilot.name}</div>
                                        <div className="w-12 inline-block text-right">{pilot.time.toString().substring(0,5)}s</div>
                                    </div>
                                ))}
                            </div>
                            <div className="total-results mx-auto inline-block xl:block">
                                <h4 className="color-grey text-sm text-left pl-1">- total -</h4>
                                {allResults.totalResults.slice(0,3).map((pilot, index) => (
                                    <div key={index} className="bg-white text-black text-xs xl:mx-1 mx-2 mb-1 rounded-sm px-2 py-1 xl:inline w-36">
                                        <div className={`w-4 inline-block font-black text-left team-${pilot.teamColor}`}>{pilot.rank}</div>
                                        <div className="w-16 pl-1 inline-block font-bold text-left">{pilot.name}</div>
                                        <div className="w-12 inline-block text-right">{pilot.pts} pts</div>
                                    </div>
                                ))}
                            </div>
                            <div className="see-results-container mt-6 w-full text-center">
                                <div onClick={() => setActiveSection('races')} className="bg-red cursor-pointer inline-block py-2 px-8">
                                    Ver resultados
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;