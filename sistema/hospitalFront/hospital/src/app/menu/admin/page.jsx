import CardOperacao from "@/layouts/CardOperacao";
import Footer from "../../../layouts/Footer";
import NavBar from "../../../layouts/NavBar";

export default function MenuPage() {
  const operacoes = [
    {
      title: "Painel Medico",
      desc: "Ir para o Painel Medico",
      color: "border-blue-500",
      href: "/menu/admin/medicos",
    },
    {
      title: "Painel de Enfermeiros",
      desc: "Ir para o Painel de Enfermagem",
      color: "border-emerald-500",
      href: "/menu/admin/enfermeiros",
    },
    {
      title: "Painel de Pacientes",
      desc: "Ir para o Painel de Pacientes",
      color: "border-amber-500",
      href: "/menu/admin/pacientes",
    },
    {
      title: "Relatorios",
      desc: "Gerar e visualizar relatórios de atividades",
      color: "border-rose-500",
      href: "/menu/admin/relatorios",

    }
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
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 ">Painel Admin</h1>
            <p className="text-slate-600">Selecione qual painel deseja acessar</p>
          </div>

          <div className="w-full">
            <CardOperacao operacoes={operacoes} />
          </div>
        </div>
      </main>

      
      <Footer />
    </div>
  );
}