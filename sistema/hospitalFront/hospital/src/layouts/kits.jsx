export default function Kits({
  kits,
  carregando,
  erro,
  searchTerm,
  setSearchTerm,
  kitName,
  setKitName,
  kitQuantidade,
  setkitQuantidade,
  CreateKit,
  excluirKit,
  kitsFiltrados, 
  totalKits


}) {

return (
<div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="w-full rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
            <h1 className="text-2xl font-semibold text-slate-800">Kits</h1>
            <p className="mt-2 text-sm text-slate-500">Consulta dos kits cadastrados no sistema.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="kit" className="mb-1 block text-sm font-medium text-slate-700">
                  Nome do kit
                </label>
                <input
                  id="kitName"
                  type="text"
                  value={kitName} 
                  onChange={(e) => setKitName(e.target.value)}
                  placeholder="Nome do Kit"
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label htmlFor="quantidade" className="mb-1 block text-sm font-medium text-slate-700">
                  Quantidade disponível
                </label>
                <input
                  id="kitQuantidade"
                  type="number"
                  value={kitQuantidade} 
                  onChange={(e) => setkitQuantidade(e.target.value)}
                  placeholder="Quantidade disponível do kit"
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
                onClick={() => CreateKit()}>
                Criar Kit
              </button>
            </div>
          </section>

          <section className="w-full rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-semibold text-slate-800">Kits Cadastrados</h2>

            <div className="mt-4 flex justify-center">
              <input
                type="text"
                placeholder="Pesquisar Kits"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
              />
            </div>

            {carregando ? (
              <div className="py-12 text-center">
                <p className="text-lg text-slate-600 animate-pulse">Carregando kits...</p>
              </div>
            ) : erro ? (
              <div className="py-12 text-center">
                <p className="text-lg font-semibold text-red-600">{erro}</p>
              </div>
            ) : kitsFiltrados.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {kitsFiltrados.map((kit) => (
                  <div
                    key={kit.id || kit._id || kit.nome}
                    className="rounded-lg border border-slate-400 bg-slate-50 p-5 shadow-sm transition hover:shadow-md"
                  >
                    <h3 className="text-xl font-semibold capitalize text-slate-800">{kit.nome}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        Quantidade: {kit.quantidade}

                        <button 
                        type="button" 
                        className=" bg-botao-excluir text-white px-2 py-1 rounded ml-4 hover:bg-red-700 transition"
                        onClick={() => excluirKit(kit.id)}>
                          Excluir
                        </button>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl bg-white/50 py-12 text-center">
                <p className="text-lg text-slate-600">Nenhum kit encontrado no banco de dados.</p>
              </div>
            )}

            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              <p>Total: {totalKits} registro(s)</p>
            </div>
          </section>
        </div>
  )
}