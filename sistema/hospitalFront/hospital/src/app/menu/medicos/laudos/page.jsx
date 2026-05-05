'use client';

import { useEffect, useState } from "react";
import NavBar from "../../../../layouts/NavBar";
import api from "../../../../utils/api";
import ModalFormularioLaudo from "../../../../layouts/modalFormularioLaudo";

export default function LaudosPage() {
  const [tipoLaudo, setTipoLaudo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [idConsulta, setIdConsulta] = useState("");
  const [idMedico, setIdMedico] = useState("");
  const [dataLaudo, setDataLaudo] = useState("");
  const [consultas, setConsultas] = useState([]);
  const [laudos, setLaudos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  

  useEffect(() => {
    const buscarConsultas = async () => {
      try {
        const response = await api.get("/consulta/get-sem-laudo");
        setConsultas(response.data?.data ?? []);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    };
  

    buscarConsultas();
  }, []);

  const consultaSelecionada = consultas.find(
    (consulta) => String(consulta.id) === String(idConsulta)
  );

  const idTriagemSelecionada = String(
    consultaSelecionada?.triagem?.id ?? consultaSelecionada?.idTriagem ?? ""
  );
  const idPacienteSelecionado = String(
    consultaSelecionada?.paciente?.id ?? consultaSelecionada?.idPaciente ?? ""
  );

  const marcarConsultaComoConcluida = (consultaId) => {
    setConsultas((consultasAtuais) =>
      consultasAtuais.map((consulta) =>
        String(consulta.id) === String(consultaId)
          ? { ...consulta, feito: true }
          : consulta
      )
    );
  };

  const abrirModalLaudo = (consulta) => {
    setIdConsulta(String(consulta.id));
    setMensagem("");
    setModalAberto(true);
  };

  const fecharModalLaudo = () => {
    setModalAberto(false);
  };

  const criarLaudo = async (event) => {
    event.preventDefault();

    if (
      !tipoLaudo ||
      !descricao ||
      !idTriagemSelecionada ||
      !idConsulta ||
      !idPacienteSelecionado ||
      !idMedico ||
      !dataLaudo
    ) {
      setMensagem("Preencha todos os campos para cadastrar o laudo.");
      return;
    }

    try {
      const dados = {
        tipoLaudo,
        descricao,
        idTriagem: Number(idTriagemSelecionada),
        idConsulta: Number(idConsulta),
        idPaciente: Number(idPacienteSelecionado),
        idMedico: Number(idMedico),
        dataLaudo,
      };

      await api.post("/laudos/create", dados);

      marcarConsultaComoConcluida(idConsulta);

      setLaudos((currentLaudos) => [
        { id: crypto.randomUUID(), ...dados },
        ...currentLaudos,
      ]);

      setTipoLaudo("");
      setDescricao("");
      setIdConsulta("");
      setIdMedico("");
      setDataLaudo("");
      setMensagem("");
      setModalAberto(false);

      alert("Laudo cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar laudo", error);
      setMensagem(error?.response?.data?.message || "Erro ao criar laudo. Tente novamente.");
    }
  };

  return (
    <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <NavBar
          ativo={true}
          itensMenu={[
            { href: "/menu/medicos", label: "Home", ativo: false },
            { href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
            { href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
            { href: "/menu/medicos/kits", label: "Kits", ativo: false },
            { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
            { href: "/menu/medicos/salas", label: "Salas", ativo: false },
          ]}
        />

        <section className="flex items-center justify-center rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Laudos</h1>
        </section>

        <div className="space-y-4">
          {consultas?.map((consulta) => {
            const consultaFeita = Boolean(consulta.feito);

            return (
              <div
                key={consulta.id}
                className={`rounded-lg border-2 p-4 transition ${
                  consultaFeita ? "border-green-400 bg-green-50" : "border-slate-300 bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2
                      className={`text-lg font-semibold ${consultaFeita ? "line-through text-slate-500" : ""}`}
                    >
                      {consulta.nome ?? `Consulta #${consulta.id}`}
                    </h2>
                    <div className="mt-2 space-y-1 text-sm text-slate-600">
                      <p><strong>Id da Consulta:</strong> {consulta.id}</p>
                      <p><strong>Paciente:</strong> {consulta.paciente?.nome ?? consulta.paciente?.id ?? "sem paciente"}</p>
                      <p><strong>Triagem:</strong> {consulta?.triagem?.id ?? consulta?.idTriagem ?? "sem triagem"}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => marcarConsultaComoConcluida(consulta.id)}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 font-medium transition ${
                      consultaFeita
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-slate-900 text-white hover:bg-slate-700"
                    }`}
                  >
                    {consultaFeita ? "✓ Feito" : "Marcar como feito"}
                  </button>

                  {!consultaFeita && (
                    <button
                      type="button"
                      onClick={() => abrirModalLaudo(consulta)}
                      className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                    >
                      Realizar laudo
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {consultas?.length === 0 && (
            <p className="py-8 text-center text-slate-500">Nenhuma consulta disponível</p>
          )}
        </div>

        <ModalFormularioLaudo
          consultas={consultas}
          criarLaudo={criarLaudo}
          tipoLaudo={tipoLaudo}
          setTipoLaudo={setTipoLaudo}
          descricao={descricao}
          setDescricao={setDescricao}
          idConsulta={idConsulta}
          setIdConsulta={setIdConsulta}
          idMedico={idMedico}
          setIdMedico={setIdMedico}
          dataLaudo={dataLaudo}
          setDataLaudo={setDataLaudo}
          idPaciente={idPacienteSelecionado}
          mensagem={mensagem}
          isOpen={modalAberto}
          onClose={fecharModalLaudo}
        />
      </div>
    </main>
  );
}
