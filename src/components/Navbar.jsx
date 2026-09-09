import { FaGithub, FaLinkedin } from "react-icons/fa";
const Navbar = () => {
    return (
        <nav class="bg-slate-900/90 text-white min-h-14 font-playpen">
            <ul class="flex justify-between items-center px-6 py-3">
                <li className="text-2xl font-bold transition-all hover:scale-110 tracking-wide  hover:cursor-pointer">Vaultix 🔐</li>
                <li className="font-semibold">
                    <div className="flex gap-3">
                        <a href="https://www.linkedin.com/in/syedinjamulhaque/" target="_blank">
                            <button class="text-black inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-2 transition-all hover:cursor-pointer hover:scale-105">Linkedin <img src="/wired-lineal-2549-logo-linkedin-morph-square.webp" alt="Linkedin" className="h-6 w-6" />
                            </button>
                        </a>
                        <a href="https://github.com/syedinjamulhaque" target="_blank">
                        <button class="text-black inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-2 transition-all hover:cursor-pointer hover:scale-105">Github <img src="/wired-lineal-2572-logo-github-hover-pinch.webp" alt="Github" className="h-6 w-6" />
                        </button>
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar