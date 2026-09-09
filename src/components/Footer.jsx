const Footer = () => {
  return (
    <footer className="bg-slate-900/90 text-white flex justify-between items-center px-6  min-h-14 text-sm font-grotesk">
        <p>Made with ❤️ using React & Tailwind CSS.</p>
        <p className="text-gray-400">
          © {new Date().getFullYear()} Vaultix 🔐 — Secure Local Storage Vault
        </p>
    </footer>
  );
};

export default Footer;