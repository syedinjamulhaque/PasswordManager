const Footer = () => {
    return (
        <footer className="bg-slate-900/90 text-white font-grotesk border-t border-slate-800">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs sm:text-sm">
                <p className="flex items-center gap-1 text-gray-200">
                    Made with <span className="text-red-500 animate-pulse">❤️</span> using React & Tailwind CSS
                </p>
                <p className="text-gray-400">
                    © {new Date().getFullYear()} Vaultix 🔐 — Secure Local Storage Vault
                </p>
            </div>
        </footer>
    );
};

export default Footer;