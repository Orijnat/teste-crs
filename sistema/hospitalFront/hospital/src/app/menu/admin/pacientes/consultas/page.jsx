import NavBar from "../../../../layouts/NavBar";

const paciente = {
  id: "PAC-1024",
  nome: "Ana Beatriz Souza",
};

const consultas = [
  {
    id: "CON-781",
    data: "20/04/2026",
    horario: "09:30",
    medico: "Dr. Carlos Mendes",
    especialidade: "Cardiologia",
    status: "Realizada",
  },
  {
    id: "CON-798",
    data: "29/04/2026",
    horario: "14:00",
    medico: "Dra. Julia Rocha",
    especialidade: "Clinica Geral",
    status: "Agendada",
  },
];

export default function ConsultasPacientePage() {
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
              ativo: false,
            },
            {
              label: "Ver Consultas",
              href: "/menu/pacientes/consultas",
              ativo: true,
            },
          ]}
        />

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold">Consultas do Paciente</h1>
          <p className="mt-2 text-slate-600">
            Paciente: {paciente.nome} ({paciente.id})
          </p>

          <div className="mt-6 space-y-4">
            {consultas.map((consulta) => (
              <article
                key={consulta.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-sm text-slate-500">{consulta.id}</p>
                <h2 className="text-lg font-semibold">
                  {consulta.especialidade}
                </h2>
                <p className="text-sm text-slate-600">Data: {consulta.data}</p>
                <p className="text-sm text-slate-600">
                  Horario: {consulta.horario}
                </p>
                <p className="text-sm text-slate-600">
                  Medico: {consulta.medico}
                </p>
                <p className="mt-2 font-medium text-slate-800">
                  Status: {consulta.status}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
