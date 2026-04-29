    import NavBar from "../../../../layouts/NavBar";

    export default function ProcedimentosPage() {
        return (
            <main className="flex min-h-screen items-center justify-center bg-fundo-das-paginas px-4 text-slate-900">
                <NavBar
                ativo= {true}
                itensMenu={[
                    { href: "/menu/medicos", label: "Home", ativo: true },
                    { href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
                    { href: "/menu/medicos/laudos", label: "Laudos", ativo: false },
                    { href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
                    { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
                    { href: "/menu/medicos/salas", label: "Salas", ativo: false },
                    ]}
                />
                
                <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
                    <h1 className="text-2xl font-semibold">Kits</h1>
                    
                <form className="mt-6 space-y-4"></form>
                        <div>
                        <label htmlFor="kit" className="mb-1 block text-sm font-medium"> </label>
                        <input
                            id="kit"
                            type="text"
                            placeholder="Nome do Kit"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                            <label htmlFor="quantidade" className="mb-1 block text-sm font-medium mt-4"> </label>
                            <input
                                id="quantidade"
                                type="text"
                                placeholder="Quantidade disponível do kit"
                                autoComplete="off"
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                            />
                        
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700 mt-6"
                            >
                                Criar Kit
                            </button>


                        </div>
                </div>
            </main>
        ); 


    }