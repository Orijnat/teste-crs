export default function ModalFormularioMedico({
  triagens =[],
  criarConsulta,
  relatoPaciente,
  setRelatoPaciente,
  idTriagem,
  setIdTriagem,
  idMedico,
  setIdMedico,
  idSala,
  setSala,
  data,
  setData,
  idPaciente,
  isOpen,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-[28px] bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.2)] backdrop-blur">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Fechar
        </button>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Consulta</h1>

        <form className="mt-8 space-y-4" onSubmit={criarConsulta}>
          <div>
            <label htmlFor="relatoPaciente" className="mb-1 block text-sm font-medium">
              Relato do paciente
            </label>
            <input
              id="relatoPaciente"
              name="relatoPaciente"
              type="text"
              value={relatoPaciente}
              onChange={(e) => setRelatoPaciente(e.target.value)}
              placeholder="Relato do paciente"
              autoComplete="off"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="idTriagem" className="mb-1 block text-sm font-medium">
                ID da Triagem
              </label>
              <select
                id="idTriagem"
                name="idTriagem"
                value={idTriagem}
                onChange={(e) => setIdTriagem(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              >
                <option value="">Selecione a triagem</option>
                {triagens.map((triagem) => (
                  <option key={triagem.id} value={triagem.id}>
                    Triagem #{triagem.id} - Paciente {triagem.paciente?.nome ?? triagem.paciente?.id ?? "sem paciente"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="idPaciente" className="mb-1 block text-sm font-medium">
                ID do paciente
              </label>
              <input
                id="idPaciente"
                name="idPaciente"
                type="text"
                value={idPaciente}
                readOnly
                placeholder="Preenchido automaticamente pela triagem"
                autoComplete="off"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="idMedico" className="mb-1 block text-sm font-medium">
              ID do médico
            </label>
            <input
              id="idMedico"
              name="idMedico"
              type="text"
              value={idMedico}
              onChange={(e) => setIdMedico(e.target.value)}
              placeholder="Id do médico responsável"
              autoComplete="off"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
            />
          </div>

          <div>
            <label htmlFor="sala" className="mb-1 block text-sm font-medium">
              Sala
            </label>
            <input
              id="sala"
              name="sala"
              type="text"
              value={idSala}
              onChange={(e) => setSala(e.target.value)}
              placeholder="ID da sala onde a consulta está sendo realizada"
              autoComplete="off"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
            />
          </div>

          <div>
            <label htmlFor="dataConsulta" className="mb-1 block text-sm font-medium">
              Data da Consulta
            </label>
            <input
              id="dataConsulta"
              name="dataConsulta"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
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
  );
}