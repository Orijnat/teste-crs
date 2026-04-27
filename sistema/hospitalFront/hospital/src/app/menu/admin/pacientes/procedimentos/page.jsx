import NavBar from "../../../../layouts/NavBar";

const paciente = {
  id: "PAC-1024",
  nome: "Ana Beatriz Souza",
};

const procedimentos = [
  {
    id: "PRO-551",
    data: "22/04/2026",
    tipo: "Curativo",
    local: "Sala 3",
    profissional: "Enf. Marina Alves",
    status: "Concluido",
  },
  {
    id: "PRO-560",
    data: "30/04/2026",
    tipo: "Coleta de sangue",
    local: "Laboratorio",
    profissional: "Enf. Rafael Lima",
    status: "Agendado",
  },
];

export default function ProcedimentosPacientePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-200 px-4 text-slate-900">
      <div className="absolute inset-0 z-0 bg-white/20" />

      <div className="z-10 w-full max-w-7xl">
        <NavBar
          itensMenu={[
            { label: "Home", href: "/menu/pacientes", ativo: false },
            {
              label: "Ver Laudos",
              href: "/menu/pacientes/laudos",
              ativo: false,
            },
            {
              label: "Ver Procedimentos",
              href: "/menu/pacientes/procedimentos",
              ativo: true,
            },
            {
              label: "Ver Consultas",
              href: "/menu/pacientes/consultas",
              ativo: false,
            },
          ]}
        />

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold">Procedimentos do Paciente</h1>
          <p className="mt-2 text-slate-600">
            Paciente: {paciente.nome} ({paciente.id})
          </p>

          <div className="mt-6 space-y-4">
            {procedimentos.map((procedimento) => (
              <article
                key={procedimento.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-sm text-slate-500">{procedimento.id}</p>
                <h2 className="text-lg font-semibold">{procedimento.tipo}</h2>
                <p className="text-sm text-slate-600">
                  Data: {procedimento.data}
                </p>
                <p className="text-sm text-slate-600">
                  Local: {procedimento.local}
                </p>
                <p className="text-sm text-slate-600">
                  Profissional: {procedimento.profissional}
                </p>
                <p className="mt-2 font-medium text-slate-800">
                  Status: {procedimento.status}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
