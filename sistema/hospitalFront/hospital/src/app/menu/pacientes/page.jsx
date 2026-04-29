import CardOperacao from "@/layouts/CardOperacao";
import Footer from "../../../layouts/Footer";
import NavBar from "@/layouts/NavBar";

export default function MenuPage() {
  const operacoes = [
    {
      title: "Ver Laudos",
      desc: "Acesse seus laudos médicos",
      color: "border-blue-500",
      href: "/menu/pacientes/laudos",
    },
    {
      title: "Ver Procedimentos",
      desc: "Confira os procedimentos realizados",
      color: "border-emerald-500",
      href: "/menu/pacientes/procedimentos",
    },
    {
      title: "Ver Consultas",
      desc: "Veja o histórico de consultas",
      color: "border-amber-500",
      href: "/menu/pacientes/consultas",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-fundo-das-paginas text-slate-900">
      <main className="relative flex flex-col flex-1 items-center justify-center overflow-hidden px-4 py-8">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-white/20 z-0" />
        <NavBar/>

        {/* Content container */}
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 mt-10">Meu Perfil</h1>
            <p className="text-slate-600">Acesse seus dados e documentos médicos</p>
          </div>

          <div className="flex-1">
            <CardOperacao
            operacoes={operacoes} />
          </div>
        </div>
      </main>

      {/* Footer - ocupará largura total */}
      <Footer />
    </div>
  );
}