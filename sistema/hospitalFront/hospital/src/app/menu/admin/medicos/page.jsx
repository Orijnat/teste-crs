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
              label: "Consultas",
              href: "/menu/medicos/consultas",
              ativo: false,
            },
            { label: "Laudos", href: "/menu/medicos/laudos", ativo: false },
            {
              label: "Procedimentos",
              href: "/menu/medicos/procedimentos",
              ativo: false,
            },
            { label: "Kits", href: "/menu/medicos/kits", ativo: false },
            {
              label: "Medicamentos",
              href: "/menu/medicos/medicamentos",
              ativo: false,
            },
            { label: "Salas", href: "/menu/medicos/salas", ativo: false },
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
