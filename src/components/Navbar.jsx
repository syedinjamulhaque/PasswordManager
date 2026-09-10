const Navbar = () => {
    return (
        <nav className="bg-slate-900/90 text-white min-h-14 font-playpen sticky top-0 z-50 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="text-xl sm:text-2xl font-bold tracking-wide transition-all hover:scale-105 cursor-pointer flex items-center gap-1 shrink-0">
                        <span>Vaultix</span>
                        <span>🔐</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a 
                            href="https://www.linkedin.com/in/syedinjamulhaque/" 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            <button className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 cursor-pointer">
                                <span className="hidden sm:inline">LinkedIn</span> 
                                <img 
                                    src="/wired-lineal-2549-logo-linkedin-morph-square.webp" 
                                    alt="LinkedIn" 
                                    className="h-5 w-5 sm:h-6 sm:w-6" 
                                />
                            </button>
                        </a>

                        <a 
                            href="https://github.com/syedinjamulhaque" 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            <button className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 cursor-pointer">
                                <span className="hidden sm:inline">GitHub</span>
                                <img 
                                    src="/wired-lineal-2572-logo-github-hover-pinch.webp" 
                                    alt="GitHub" 
                                    className="h-5 w-5 sm:h-6 sm:w-6" 
                                />
                            </button>
                        </a>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;