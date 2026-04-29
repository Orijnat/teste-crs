import NavBar from "../../../layouts/NavBar";
import CardOperacao from "../../../layouts/CardOperacao";
import Footer from "../../../layouts/Footer";
import Link from "next/link";

export default function MenuPage() {

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
    <div className="flex flex-col min-h-screen bg-fundo-das-paginas text-slate-900">
      <main className="relative flex flex-col flex-1 items-center justify-center overflow-hidden px-4 py-8">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-white/20 z-0" />
        <NavBar ativo={false} />

        {/* Content container */}
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 mt-10">Painel de Enfermagem</h1>
            <p className="text-slate-600">Selecione uma operação para iniciar o atendimento</p>
          </div>

          <div className="flex-1">
            <CardOperacao operacoes={operacoes} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}