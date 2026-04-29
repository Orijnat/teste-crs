import NavBar from "../../../../layouts/NavBar";

export default function MenuPage() {
  return (
     <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                    <NavBar
                    ativo= {true}
                    itensMenu={[
                        { href: "/menu/medicos", label: "Home", ativo: false },
                        { href: "/menu/medicos/laudos", label: "Laudos", ativo: false },
                        { href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
                        { href: "/menu/medicos/kits", label: "Kits", ativo: false },
                        { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
                        { href: "/menu/medicos/salas", label: "Salas", ativo: false },
                    ]}
                    />
    
                    <section className="flex justify-center">
                        <div className="w-full max-w-2xl rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur mt-10">
                            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Consulta </h1>
    
                            <form className="mt-8 space-y-4">
    
                                <div>
                                    <label htmlFor="kits" className="mb-1 block text-sm font-medium">
                                        Queixa do paciente
                                    </label>
                                    <input
                                        id="queixa"
                                        name="queixa"
                                        type="text"
                                        placeholder="Queixa do paciente"
                                        autoComplete="off"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    />
                                </div>
    
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="idPaciente" className="mb-1 block text-sm font-medium">
                                            ID da Triagem
                                        </label>
                                        <input
                                            id="idTriagem"
                                            name="idTriagem"
                                            type="text"
                                            placeholder="Id da triagem"
                                            autoComplete="off"
                                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                        />
                                    </div>
    
                                    <div>
                                        <label htmlFor="idMedico" className="mb-1 block text-sm font-medium">
                                            ID do médico
                                        </label>
                                        <input
                                            id="idMedico"
                                            name="idMedico"
                                            type="text"
                                            placeholder="Id do médico responsável"
                                            autoComplete="off"
                                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                        />
                                    </div>
                                </div>
    
                                <div>
                                    <label htmlFor="sala" className="mb-1 block text-sm font-medium">
                                        Sala
                                    </label>
                                    <input
                                        id="sala"
                                        name="sala"
                                        type="text"
                                        placeholder="Sala onde a consulta esta sendo realizada"
                                        autoComplete="off"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="paciente" className="mb-1 block text-sm font-medium">
                                        Data da Consulta
                                    </label>
                                    <input
                                        id="dataConsulta"
                                        name="dataConsulta"
                                        type="date"
                                        placeholder="Data da consulta"
                                        autoComplete="off"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    />
                                </div>
    
                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700"
                                >
                                    Finalizar Consulta
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
  );
}  