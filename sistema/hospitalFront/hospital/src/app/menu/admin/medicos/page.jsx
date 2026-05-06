import CardOperacao from "@/layouts/CardOperacao";
import Footer from "../../../layouts/Footer";
import NavBar from "../../../layouts/NavBar";

export default function MenuPage() {
  const operacoes = [
    {
      title: "Consultas",
      desc: "Realização de consultas",
      color: "border-blue-500",
      href: "/menu/medicos/consultas",
    },
    {
      title: "Laudos",
      desc: "Criação e gerenciamento de laudos médicos",
      color: "border-emerald-500",
      href: "/menu/medicos/laudos",
    },
    {
      title: "Kits",
      desc: "Gestão de insumos e materiais",
      color: "border-amber-500",
      href: "/menu/medicos/kits",
    },
    {
      title: "Medicamentos",
      desc: "Controle de estoque",
      color: "border-rose-500",
      href: "/menu/medicos/medicamentos",
    },
    {
      title: "Salas",
      desc: "Gerenciamento de salas de procedimento",
      color: "border-violet-500",
      href: "/menu/medicos/salas",
    },
    {
      title: "Procedimentos",
      desc: "Criar e gerenciar procedimentos",
      color: "border-cyan-500",
      href: "/menu/medicos/procedimentos",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-fundo-das-paginas text-slate-900">
      <main className="relative flex flex-col flex-1 items-center justify-center overflow-hidden px-4 py-8">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-white/20 z-0" />
        
        <NavBar ativo={false} />



        {/* Content container */}
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 ">Painel Médico</h1>
            <p className="text-slate-600">Gerencie suas consultas, laudos e procedimentos</p>
          </div>

          <div className="w-full">
            <CardOperacao operacoes={operacoes} />
          </div>
        </div>
      </main>

      {/* Footer - ocupará largura total */}
      <Footer />
    </div>
  );
}