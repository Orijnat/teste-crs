
export default function Medicamentos({ 
  medicamentos,
  totalMedicamentos,
  searchTerm,
  setSearchTerm,
  alternarDescricao,
  descricaoExpandida,
  carregando,
  erro,
  medicamentosFiltrados

  
}) {

return(
 <div className="mt-10">
          <h1 className="text-3xl font-bold text-center mb-8">Medicamentos do Banco de Dados</h1>

          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Pesquisar Medicamentos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} //
            />
          </div>

          {carregando ? (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600 animate-pulse">Carregando medicamentos...</p>
            </div>
          ) : erro ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-600 font-semibold">{erro}</p>
            </div>
          ) : (
            <>
              {medicamentos.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {medicamentosFiltrados.map((med) => (
                    <div
                      key={med.id || med._id || med.medicamento}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-slate-100"
                    >
                      <h3 className="text-xl font-semibold text-slate-800 mb-2 capitalize">
                        {med.medicamento}
                      </h3>

                      <div className="mb-4 text-sm leading-6 text-slate-600">
                        <p className="whitespace-pre-line">
                          {descricaoExpandida[med.id || med._id || med.medicamento]
                            ? med.descricao
                            : `${med.descricao?.slice(0, 180) || ""}${
                                med.descricao && med.descricao.length > 180 ? "..." : ""
                              }`}
                        </p>

                        {med.descricao && med.descricao.length > 180 && (
                          <button
                            type="button"
                            onClick={() => alternarDescricao(med.id || med._id || med.medicamento)}
                            className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                          >
                            {descricaoExpandida[med.id || med._id || med.medicamento]
                              ? "Mostrar menos"
                              : "Ver mais"}
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          Quantidade: {med.quantidade}
                        </span>

                        <span
                          className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                            med.controlado
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {med.controlado ? "Controlado" : "Não controlado"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/50 rounded-xl">
                  <p className="text-lg text-slate-600">
                    Nenhum medicamento encontrado no banco de dados.
                  </p>
                </div>
              )}

              <div className="mt-8 text-center text-sm text-slate-500 font-medium">
                <p>Total: {totalMedicamentos} registro(s)</p>
              </div>
            </>
          )}
        </div>
      )
    }