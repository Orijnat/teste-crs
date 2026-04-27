import NavBar from "../../../../layouts/NavBar";

const paciente = {
	id: "PAC-1024",
	nome: "Ana Beatriz Souza",
};

const laudos = [
	{
		id: "LAU-9001",
		data: "24/04/2026",
		especialidade: "Cardiologia",
		resumo: "Eletrocardiograma sem alteracoes agudas.",
	},
	{
		id: "LAU-9002",
		data: "26/04/2026",
		especialidade: "Clinica Geral",
		resumo: "Exames laboratoriais dentro da normalidade.",
	},
];

export default function LaudosPacientePage() {
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-200 px-4 text-slate-900">
			<div className="absolute inset-0 z-0 bg-white/20" />

			<div className="z-10 w-full max-w-7xl">
				<NavBar
					itensMenu={[
						{ label: "Home", href: "/menu/pacientes", ativo: false },
						{ label: "Ver Laudos", href: "/menu/pacientes/laudos", ativo: true },
						{
							label: "Ver Procedimentos",
							href: "/menu/pacientes/procedimentos",
							ativo: false,
						},
						{ label: "Ver Consultas", href: "/menu/pacientes/consultas", ativo: false },
					]}
				/>

				<section className="mt-10 rounded-2xl bg-white p-6 shadow-md">
					<h1 className="text-3xl font-bold">Laudos do Paciente</h1>
					<p className="mt-2 text-slate-600">
						Paciente: {paciente.nome} ({paciente.id})
					</p>

					<div className="mt-6 space-y-4">
						{laudos.map((laudo) => (
							<article key={laudo.id} className="rounded-xl border border-slate-200 p-4">
								<p className="text-sm text-slate-500">{laudo.id}</p>
								<h2 className="text-lg font-semibold">{laudo.especialidade}</h2>
								<p className="text-sm text-slate-600">Data: {laudo.data}</p>
								<p className="mt-2 text-slate-700">{laudo.resumo}</p>
							</article>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
