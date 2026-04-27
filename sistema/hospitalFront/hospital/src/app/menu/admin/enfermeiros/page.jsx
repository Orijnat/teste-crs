import NavBar from "../../../layouts/NavBar";
import Link from "next/link";

export default function MenuPage() {
  // Lista de operações mapeada para facilitar a manutenção
  const operacoes = [
    {
      title: "Triagem",
      desc: "Classificação de risco e sinais vitais",
      color: "border-blue-500",
      href: "/menu/enfermeiros/triagem",
    },
    {
      title: "Procedimentos",
      desc: "Administração de cuidados e exames",
      color: "border-emerald-500",
      href: "/menu/enfermeiros/procedimentos",
    },
    {
      title: "Kits",
      desc: "Gestão de insumos e materiais",
      color: "border-amber-500",
      href: "/menu/enfermeiros/kits",
    },
    {
      title: "Medicamentos",
      desc: "Controle de estoque e dispensação",
      color: "border-rose-500",
      href: "/menu/enfermeiros/medicamentos",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* NavBar com os itens dinâmicos */}
      <NavBar
        itensMenu={operacoes.map((op) => ({
          label: op.title,
          href: op.href,
          ativo: false,
        }))}
      />

      <div className="z-10 w-full max-w-7xl mx-auto p-8 grow mt-12">
        {/* Cabeçalho de Boas-vindas */}
        <header className="mb-12">
          <div className="flex items-center gap-4">
            <div className="h-12 w-2 bg-blue-600 rounded-full" />
            <div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                Painel de Enfermagem
              </h1>
              <p className="text-slate-500 text-lg mt-1">
                Olá! Selecione uma operação para iniciar o atendimento.
              </p>
            </div>
          </div>
        </header>

        {/* Cards de Operações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {operacoes.map((item, index) => (
            <Link key={index} href={item.href} className="group">
              <div
                className={`h-full p-6 bg-white rounded-2xl shadow-sm border-b-4 ${item.color} 
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl active:scale-95`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center text-blue-600 font-semibold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Acessar agora →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="mt-auto border-t bg-white/50 backdrop-blur-md px-8 py-6 text-slate-400 text-xs flex justify-between items-center">
        <div className="flex gap-4">
          <p>© 2026 Hospital System</p>
          <span className="text-slate-300">|</span>
          <p>Unidade Central</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <p className="text-slate-500 font-medium">Servidor: Online</p>
        </div>
      </footer>
    </main>
  );
}
