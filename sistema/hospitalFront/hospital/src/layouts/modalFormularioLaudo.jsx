'use client';

export default function ModalFormularioLaudo({
  consultas = [],
  criarLaudo,
  tipoLaudo,
  setTipoLaudo,
  descricao,
  setDescricao,
  idConsulta,
  setIdConsulta,
  idMedico,
  setIdMedico,
  dataLaudo,
  setDataLaudo,
  idPaciente,
  mensagem,
  isOpen,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  const consultaSelecionada = consultas.find(
    (consulta) => String(consulta.id) === String(idConsulta)
  );

  const idTriagem = String(consultaSelecionada?.triagem?.id ?? consultaSelecionada?.idTriagem ?? "");
  const idPacienteModal = String(consultaSelecionada?.paciente?.id ?? consultaSelecionada?.idPaciente ?? "");

  const fieldClass =
    "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900";

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

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Laudo</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Cadastre um laudo com consulta, triagem e paciente vinculados.
        </p>

        <form className="mt-8 space-y-4" onSubmit={criarLaudo}>
          <div>
            <label htmlFor="tipoLaudo" className="mb-1 block text-sm font-medium">
              Tipo de laudo
            </label>
            <input
              id="tipoLaudo"
              type="text"
              value={tipoLaudo}
              onChange={(event) => setTipoLaudo(event.target.value)}
              placeholder="Ex: Radiografia, Ultrassom, Análise clínica"
              autoComplete="off"
              className={fieldClass}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="idConsulta" className="mb-1 block text-sm font-medium">
                Consulta
              </label>
              <select
                id="idConsulta"
                value={idConsulta}
                onChange={(event) => setIdConsulta(event.target.value)}
                className={fieldClass}
              >
                <option value="">Selecione a consulta</option>
                {consultas.map((consulta) => (
                  <option key={consulta.id} value={consulta.id}>
                    Consulta #{consulta.id}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="idTriagem" className="mb-1 block text-sm font-medium">
                Triagem vinculada
              </label>
              <input
                id="idTriagem"
                type="text"
                value={idTriagem}
                readOnly
                placeholder="Selecionada automaticamente pela consulta"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="descricao" className="mb-1 block text-sm font-medium">
              Descrição do laudo
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              placeholder="Descreva os achados e conclusões do laudo"
              autoComplete="off"
              rows="4"
              className={`${fieldClass} resize-none`}
            />
          </div>

          <div>
            <label htmlFor="idMedico" className="mb-1 block text-sm font-medium">
              ID do médico responsável
            </label>
            <input
              id="idMedico"
              type="text"
              value={idMedico}
              onChange={(event) => setIdMedico(event.target.value)}
              placeholder="Id do médico responsável"
              autoComplete="off"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="dataLaudo" className="mb-1 block text-sm font-medium">
              Data do laudo
            </label>
            <input
              id="dataLaudo"
              type="date"
              value={dataLaudo}
              onChange={(event) => setDataLaudo(event.target.value)}
              autoComplete="off"
              className={fieldClass}
            />
          </div>

          {mensagem ? (
            <p className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">{mensagem}</p>
          ) : null}

          <p className="text-sm text-slate-500">ID do paciente: {idPacienteModal || "preenchido automaticamente"}</p>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            Criar laudo
          </button>
        </form>
      </div>
    </section>
  );
}
