import NavBar from "../../../layouts/NavBar";

export default function MenuPage() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overf
    w-hidden bg-slate-200 px-4 text-slate-900"
    >
      <div className="absolute inset-0 bg-white/20 z-0" />

      <div className="z-10 w-full max-w-7xl">
        <NavBar
          itensMenu={[
            { label: "Home", href: "/menu/medicos", ativo: true },
            {
              label: "Ver Laudos",
              href: "/menu/pacientes/laudos",
              ativo: false,
            },
            {
              label: "Ver Procedimentos",
              href: "/menu/pacientes/procedimentos",
              ativo: false,
            },
            {
              label: "Ver consultas",
              href: "/menu/pacientes/consultas",
              ativo: false,
            },
          ]}
        />

        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold">
            Bem-vindo selecione no menu a operacao que deseja realizar
          </h1>
        </div>
      </div>
    </main>
  );
}
