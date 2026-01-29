import React, { useState } from 'react';

function RulesPage({ allResults }) {
    const [activeTab, setActiveTab] = useState('race');
    const [activeGP, setActiveGP] = useState(0);
    return (
        <div className='content flex-1 pt-10 pb-10 rulesPage'>
            <div className='xl:max-w-screen-xl max-w-screen-lg h-full mx-auto px-6 text-black'>
                <h3 className="float-left w-full pl-2 text-black text-2xl mb-4">Regulamento</h3>
                <p className="pl-2">
                    O presente regulamento define as regras gerais, o formato e o sistema de pontuação do Campeonato de Karting.
                </p>
                <p className="pl-2">
                    Não havendo uma entidade reguladora, o cumprimento deste regulamento conta com a boa vontade e o fair-play dos participantes.
                </p>
                <h4 className="float-left w-full pl-2 text-xl mb-4 mt-6">Formato</h4>
                <ul>
                    <li>Cada prova será realizada num kartódromo previamente acordado entre os pilotos.</li>
                    <li>A grelha de partida será sorteada para a primeira corrida do campeonato. Nas corridas seguintes, a grelha roda uma posição para a frente.</li>
                </ul>
                <h4 className="float-left w-full pl-2 text-xl mb-4 mt-6">Regras de condução</h4>
                <ul>
                    <li>É proibido bater propositadamente noutros pilotos.</li>
                    <li>É proibído ultrapassar quando a corrida está interrompida (quando a potência dos karts foi remotamente limitada pelo staff do kartodromo). Os karts envolvidos em acidente podem e devem ser ultrapassados.</li>
                    <li>As regras impostas pelo kartodromo devem ser cumpridas e a violação das mesmas deve ser punida.</li>
                    <li>Todas as violação são punidas com 5 segundos no tempo final. <i>(EM ANÁLISE)</i></li>
                </ul>
                <h4 className="float-left w-full pl-2 text-xl mb-4 mt-6">Sistema de pontuação</h4>
                <ul>
                    <li>O sistema de pontuação aplica-se tanto ao resultado final das corridas como às melhores voltas registadas em cada prova.</li>
                    <li>Caso dois pilotos façam tempos iguais na melhor volta, ambos recebem os pontos da posição partilhada e a posição seguinte fica vazia.</li>
                    <li>
                        Para o resultado final da corrida, a primeira e a última volta serão ignoradas e a posição de cada piloto será calculada através do tempo médio das voltas intermédias.<br/>
                        <div className="farction-container w-full text-center">
                            <div className="fraction">
                                <span className="top">soma do tempo das voltas intermédias</span>
                                <span className="bottom">nº de voltas do vencedor</span>
                            </div>
                        </div>
                        <i>(EM ANÁLISE)</i>
                    </li>
                    <li>
                        Tabela de pontuação:
                        <table>
                            <thead>
                                <tr>
                                    <th>Posição</th>
                                    <th>Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>1º</td><td>8</td></tr>
                                <tr><td>2º</td><td>6</td></tr>
                                <tr><td>3º</td><td>5</td></tr>
                                <tr><td>4º</td><td>4</td></tr>
                                <tr><td>5º</td><td>3</td></tr>
                                <tr><td>6º</td><td>2</td></tr>
                                <tr><td>7º</td><td>1</td></tr>
                                <tr><td>8º</td><td>0</td></tr>
                            </tbody>
                        </table>
                    </li>
                </ul>
                <h4 className="float-left w-full pl-2 text-xl mb-4 mt-6">Critérios de desempate</h4>
                <p className="pl-2 pb-2">Se dois pilotos terminarem o campeonato com os mesmos pontos, aplica-se a seguinte ordem de critérios:</p>
                <ul className="numeric">
                    <li>Número de vitórias</li>
                    <li>Número de vitórias em corrida</li>
                    <li>Número de pódios</li>
                    <li>Número de pódios em corrida</li>
                    <li>Melhor média de tempo da melhor volta</li>
                </ul>
            </div>
        </div>
    );
}

export default RulesPage;