import NavBar from "../../../../layouts/NavBar";

const salas = [
	{
		id: "SALA-001",
		numero: "101",
		tipo: "Consultório",
		paciente: {
			id: "PAC-1024",
			nome: "Ana Beatriz Souza",
			idade: 45,
			motivo: "Consulta de Cardiologia",
		},
	},
	{
		id: "SALA-002",
		numero: "102",
		tipo: "Consultório",
		paciente: {
			id: "PAC-1025",
			nome: "Carlos Silva",
			idade: 38,
			motivo: "Consulta de Clínica Geral",
		},
	},
	{
		id: "SALA-003",
		numero: "201",
		tipo: "Procedimento",
		paciente: {
			id: "PAC-1026",
			nome: "Maria oliveira",
			idade: 52,
			motivo: "Procedimento de Endoscopia",
		},
	},
	{
		id: "SALA-004",
		numero: "102-B",
		tipo: "Consultório",
		paciente: null,
	},
	{
		id: "SALA-005",
		numero: "202",
		tipo: "Procedimento",
		paciente: null,
	},
];

export default function SalasPage() {
	return (
		<main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
			<NavBar
				ativo={true}
				itensMenu={[
					{ href: "/menu/medicos", label: "Home", ativo: false },
					{ href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
					{ href: "/menu/medicos/laudos", label: "Laudos", ativo: false },
					{ href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
					{ href: "/menu/medicos/kits", label: "Kits", ativo: false },
					{ href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
				]}
			/>
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
				<h1 className="text-3xl font-bold text-slate-800 mb-2 mt-10">Salas de Atendimento</h1>
				<p className="text-slate-600 mb-6">Visualize as salas de atendimento e os pacientes que as estão ocupando</p>

				{/* Grid de salas */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{salas.map((sala) => (
						<div
							key={sala.id}
							className={`rounded-lg shadow-md p-6 ${
								sala.paciente
									? "bg-white border-l-4 border-green-500"
									: "bg-gray-50 border-l-4 border-gray-300"
							}`}
						>
							<div className="flex items-start justify-between mb-4">
								<div>
									<p className="text-sm text-slate-500 font-semibold">Sala {sala.numero}</p>
									<h2 className="text-lg font-bold text-slate-800">{sala.tipo}</h2>
								</div>
								<span
									className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
										sala.paciente
											? "bg-green-100 text-green-700"
											: "bg-gray-200 text-gray-600"
									}`}
								>
									{sala.paciente ? "Ocupada" : "Disponível"}
								</span>
							</div>

							{sala.paciente ? (
								<div className="space-y-2 border-t border-gray-200 pt-4">
									<div>
										<p className="text-xs text-slate-500">Paciente</p>
										<p className="text-slate-800 font-semibold">{sala.paciente.nome}</p>
									</div>
									<div className="grid grid-cols-2 gap-2">
										<div>
											<p className="text-xs text-slate-500">ID</p>
											<p className="text-sm text-slate-700">{sala.paciente.id}</p>
										</div>
										<div>
											<p className="text-xs text-slate-500">Idade</p>
											<p className="text-sm text-slate-700">{sala.paciente.idade} anos</p>
										</div>
									</div>
									<div>
										<p className="text-xs text-slate-500">Motivo</p>
										<p className="text-sm text-slate-700">{sala.paciente.motivo}</p>
									</div>
								</div>
							) : (
								<div className="border-t border-gray-200 pt-4">
									<p className="text-sm text-gray-600 italic">Nenhum paciente nesta sala no momento</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</main>
	);
}