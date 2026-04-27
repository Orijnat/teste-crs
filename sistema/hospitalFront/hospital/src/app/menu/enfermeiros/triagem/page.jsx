import NavBar from "../../../../layouts/NavBar";

export default function TriagemPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-200 px-4 text-slate-900">
            <NavBar
              itensMenu={[
                { href: "/menu/enfermeiros", label: "Home", ativo: true },
                { href: "/menu/enfermeiros/procedimentos", label: "Procedimentos", ativo: false},
                { href: "/menu/enfermeiros/kits", label: "Kits", ativo: false}
              ]}
            />
            
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
                <h1 className="text-2xl font-semibold">Triagem</h1>
                
              <form className="mt-6 space-y-4"></form>
                    <div>
                        <label htmlFor="nome" className="mb-1 block text-sm font-medium"> </label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Nome do paciente"
                            autoComplete="name"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor="idade" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="idade"
                            type="text"
                            placeholder="Idade do paciente"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor= "altura" className= "mb-1 block text-sm font-medium mt-4"></label>
                        <input
                            id="altura"
                            type="text"
                            placeholder="Altura do paciente em Cm"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor= "peso" className= "mb-1 block text-sm font-medium mt-4"></label>
                        <input
                            id="peso"
                            type="text"
                            placeholder="Peso do paciente em Kg"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor="sintomas" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="sintomas"
                            type="text"
                            placeholder="Sintomas apresentados"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                        
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700 mt-6"
                        >
                            Finalizar Triagem
                        </button>


                    </div>
            </div>
        </main>
    ); 


  }