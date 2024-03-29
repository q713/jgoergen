import { NavLink } from "react-router-dom";
import twnetyfourthyeight from "../images/2048.png";
import simbricks from "../images/simbricks-logo.png";
import snail from "../images/snail-example.png"
import columbo from "../images/columbo.png"
import { ProjectCard } from "./ProjectCard";
import { Skills } from "./Skills";

export const Home = () => {
    function redirect(url: string) {
        window.location.href = url;
    }

    return (
        <div className="max-w-4xl mx-auto px-10 flex flex-col divide-y">
            <div className="flex py-10 flex-col pb-20 text-left gap-4">
                <h1 className="text-4xl text-bold text-stone-900 mt-20 mb-4">About Me</h1>
                <p>Hello I'm Jakob. Im a german computer science and working student.</p>
                <p>Currently I'm working on my Masters-Thesis at the <a className="font-bold" href="https://www.uni-saarland.de/start.html">Universität des Saarlandes</a> were
                I'm advised by <a className="font-bold" href="https://people.mpi-sws.org/~antoinek/index.html">Antoine Kaufmann</a> as part of 
                the MPI-SWS <a className="font-bold" href="https://os.mpi-sws.org/">Operating Systems Group</a>. My Thesis revolves 
                around <a className="font-bold" href="https://simbricks.github.io/projects/columbo.html">Columbo</a> that aims to add library support 
                to <a href="https://simbricks.github.io/">SimBricks</a> for creating Low-Level End-to-End System-Traces.</p>
                <p>I'm generally interested in Operating-, Database- and Distributed-Systems. I am particularly interested 
                in understanding the behaviour of the latter at run time across boundaries of the involved components using techniques 
                like Distributed-Tracing.</p>
                <p>In addition to my studies am I a working student at <a className="font-bold" href="https://www.consistec.de/">Consistec Gmbh</a> in the software development department.</p>
                <p>Below you can see some of my projects.</p>
                <p>You can find me on <a className="font-bold" href="https://github.com/q713">GitHub</a> or <a className="font-bold" href="https://www.linkedin.com/in/jakob-görgen-69340b2ab">LinkedIn</a>.</p>
            </div>

            <div className="flex py-10 pb-20 flex-col items-start space-y-10">
                <h1 className="text-4xl text-bold text-stone-900 pt-10 pb-10">Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                    <div onClick={() => redirect("https://simbricks.github.io/projects/columbo.html")} className=" bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                      <h2 className="text-xl font-semibold mb-4">Columbo</h2>
                      <p className="text-gray-700 mb-4">Columbo (my Masters-Thesis) is a library allowing to create Low-Level End-to-End System-Traces through SimBricks Simulations.</p>
                      <div className="flex flex-col justify-center items-center mb-4">
                        <img className="object-cover w-32 h-42 rounded-t-lg md:rounded-none md:rounded-l-lg"
                            src={columbo} alt="" />
                      </div>
                    </div>
                    <div onClick={() => redirect("https://simbricks.github.io/")} className=" bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                      <h2 className="text-xl font-semibold mb-4">SimBricks</h2>
                      <p className="text-gray-700 mb-10">SimBricks is a modular full-system end-to-end simulation framework.</p>
                      <div className="flex flex-col justify-center items-center">
                        <img className="object-cover w-40 h-40 rounded-t-lg md:rounded-none md:rounded-l-lg"
                            src={simbricks} alt="" />
                      </div>
                    </div>
                    <div onClick={() => redirect("https://github.com/q713/snail")} className=" bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                      <h2 className="text-xl font-semibold mb-4">Snail</h2>
                      <p className="text-gray-700 mb-11">A little snake like game written in Go that can be run in the Terminal.</p>
                      <div className="flex flex-col justify-center items-center">
                        <img className="object-cover w-40 h-40 rounded-t-lg md:rounded-none md:rounded-l-lg"
                            src={snail} alt="" />
                      </div>
                    </div>
                    <NavLink to="2048" state={{ humanPlayer: true }} className=" bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                      <h2 className="text-xl font-semibold mb-4">2048</h2>
                      <p className="text-gray-700 mb-4">Here you will find my own implementation of 2048. 
                            You can either play yourself or watch an AI playing. (Not optimized for mobile devices)</p>
                      <div className="flex flex-col justify-center items-center">
                        <img className="object-cover w-44 h-44 rounded-t-lg md:rounded-none md:rounded-l-lg"
                            src={twnetyfourthyeight} alt="" />
                      </div>
                    </NavLink>
                </div>
            </div>

            <Skills />
        </div>
    )
}