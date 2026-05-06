export default function TriagemForm({ 
    nome, 
    setNome,
    idade,
    setIdade,
    altura, 
    setAltura,
    peso, 
    setPeso,
    sintomas, 
    setSintomas,
    email, 
    setEmail,
    password, 
    setPassword,
    idEnfermeiro, 
    setIdEnfermeiro,
    finalizarTriagem
    
}) {
    return (


<form className="mt-6 space-y-4" onSubmit={finalizarTriagem}>
                    <div>
                        <label htmlFor="nome" className="mb-1 block text-sm font-medium"> </label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome do paciente"
                            autoComplete="name"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor="idade" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="idade"
                            type="number"
                            value={idade}
                            onChange={(e) => setIdade(e.target.value)}
                            placeholder="Idade do paciente"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor= "altura" className= "mb-1 block text-sm font-medium mt-4"></label>
                        <input
                            id="altura"
                            type="number"
                            step="0.01" // Permite decimais como 1.75 para dar match com o 'double precision' do DB
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                            placeholder="Altura (ex: 1.75)"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor= "peso" className= "mb-1 block text-sm font-medium mt-4"></label>
                        <input
                            id="peso"
                            type="number"
                            step="0.01" // Permite decimais para dar match com o 'double precision' do DB
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            placeholder="Peso em Kg"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor="sintomas" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="sintomas"
                            type="text"
                            value={sintomas}
                            onChange={(e) => setSintomas(e.target.value)}
                            placeholder="Sintomas apresentados"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                        <label htmlFor="email" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email do paciente"
                            autoComplete="email"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                        <label htmlFor="password" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha do paciente"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor="idEnfermeiro" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="idEnfermeiro"
                            type="number"
                            value={idEnfermeiro}
                            onChange={(e) => setIdEnfermeiro(e.target.value)}
                            placeholder="ID do enfermeiro"
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
            </form>
    )
}