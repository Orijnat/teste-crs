import CardOperacao from "@/layouts/CardOperacao";
import Footer from "@/layouts/Footer";
import NavBar from "@/layouts/NavBar";

export default function MenuPage() {
  const operacoes = [
    {
      title: "Relatório de consultas",
      desc: "Acompanhe consultas realizadas e pendentes",
      color: "border-blue-500",
      href: "/menu/admin/relatorios/consultarelatorio",
    },
    {
      title: "Relatório de laudos",
      desc: "Visualize laudos criados no sistema",
      color: "border-emerald-500",
      href: "/menu/admin/relatorios/laudorelatorio",
    },
    {
      title: "Relatório de triagens",
      desc: "Confira as triagens registradas",
      color: "border-amber-500",
      href: "/menu/admin/relatorios/triagemrelatorio",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-fundo-das-paginas text-slate-900">
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-8">
        <div className="absolute inset-0 z-0 bg-white/20" />

        <NavBar ativo={false}
          
        />

        <div className="z-10 flex w-full max-w-7xl flex-col flex-1 justify-center">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">
              Painel de Relatórios
            </h1>
            <p className="text-slate-600">
              Acesse os principais relatórios administrativos do sistema
            </p>
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