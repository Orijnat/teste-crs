
export default function Footer({ itensMenu = [] }) {


    return (
  <footer className="w-full border-t bg-white/50 backdrop-blur-md px-4 py-6 text-slate-400 text-xs">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
      <div className="flex gap-4 flex-wrap justify-center md:justify-start">
        <p>© 2026 Hospital System</p>
        <span className="text-slate-300">|</span>
        <p>Unidade Central</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <p className="text-slate-500 font-medium">Servidor: Online</p>
      </div>
    </div>
  </footer>
);
}



