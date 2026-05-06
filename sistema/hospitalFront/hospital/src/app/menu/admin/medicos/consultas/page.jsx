"use client";

import { useEffect, useState } from "react";
import NavBar from "../../../../layouts/NavBar";
import api from "@/utils/api";
import ModalFormularioMedico from "../../../../layouts/modalFormularioMedico";

export default function MenuPage() {
  const [relatoPaciente, setRelatoPaciente] = useState("");
  const [idTriagem, setIdTriagem] = useState("");
  const [idMedico, setIdMedico] = useState("");
  const [idSala, setSala] = useState("");
  const [triagens, setTriagens] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  const obterOrdemCriacao = (triagem) => {
    const valorCriacao = triagem?.createdAt ?? triagem?.created_at ?? triagem?.data ?? "";
    const dataCriacao = new Date(valorCriacao);

    if (!Number.isNaN(dataCriacao.getTime())) {
      return dataCriacao.getTime();
    }

    const idNumerico = Number(triagem?.id);
    return Number.isNaN(idNumerico) ? 0 : idNumerico;
  };

  useEffect(() => {
    const buscarTriagens = async () => {
      try {
        const response = await api.get("/triagem/get-sem-consulta");
        const triagensCarregadas = response.data?.data ?? [];
        setTriagens(
          [...triagensCarregadas].sort(
            (triagemA, triagemB) => obterOrdemCriacao(triagemB) - obterOrdemCriacao(triagemA)
          )
        );
      } catch (error) {
        console.error("Erro ao buscar triagens:", error);
      }
    };

    buscarTriagens();
  }, []);

  const triagemSelecionada = triagens.find(
    (triagem) => String(triagem.id) === String(idTriagem)
  );

  const idPaciente = triagemSelecionada?.paciente?.id
    ? String(triagemSelecionada.paciente.id)
    : "";

  const marcarComoFeito = (id) => {
    setTriagens(
      triagens.map((triagem) =>
        triagem.id === id ? { ...triagem, feito: !triagem.feito } : triagem
      )
    );
  };

  const abrirModalConsulta = (triagem) => {
    setIdTriagem(String(triagem.id));
    setModalAberto(true);
  };

  const fecharModalConsulta = () => {
    setModalAberto(false);
  };

  const marcarTriagemComoConcluida = (triagemId) => {
    setTriagens((triagensAtuais) =>
      triagensAtuais.map((triagem) =>
        String(triagem.id) === String(triagemId)
          ? { ...triagem, feito: true }
          : triagem
      )
    );
  };

  const criarConsulta = async (e) => {
    e.preventDefault();

    try {
      const dados = {
        relatoPaciente,
        idTriagem: Number(idTriagem),
        idMedico: Number(idMedico),
        idSala: Number(idSala),
        idPaciente: Number(idPaciente),
      };

      if (!relatoPaciente || !idTriagem || !idMedico || !idSala || !idPaciente) {
        alert("Preencha todos os campos para cadastrar a consulta.");
        return;
      }

      await api.post("/consulta/create", dados);

      marcarTriagemComoConcluida(idTriagem);
      fecharModalConsulta();

      setRelatoPaciente("");
      setIdTriagem("");
      setIdMedico("");
      setSala("");

      alert("Consulta cadastrada com sucesso!");
      console.log("Consulta criada:", dados);
    } catch (error) {
      console.error("Erro ao criar consulta:", error);
      alert(error?.response?.data?.message || "Erro ao cadastrar consulta.");
    }
  };

  return (
    <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <NavBar
          ativo={true}
          itensMenu={[
            { href: "/menu/medicos", label: "Home"},
            { href: "/menu/medicos/laudos", label: "Laudos"},
            { href: "/menu/medicos/procedimentos", label: "Procedimentos"},
            { href: "/menu/medicos/kits", label: "Kits"},
            { href: "/menu/medicos/medicamentos", label: "Medicamentos"},
            { href: "/menu/medicos/salas", label: "Salas"},
          ]}
        />

        <section className="flex items-center justify-center rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Consultas
          </h1>
        </section>

        <div>
          <button
            type="button"
            onClick={() => (window.location.href = "/menu/medicos/consultas/verconsultas")}
            className="ml-4 whitespace-nowrap rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
          >
            Ver Consultas Realizadas
          </button>
        </div>

        <div className="space-y-4">
          {triagens?.map((triagem) => (
            <div
              key={triagem.id}
              className={`rounded-lg border-2 p-4 transition ${
                triagem.feito ? "border-green-400 bg-green-50" : "border-slate-300 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2
                    className={`text-lg font-semibold ${triagem.feito ? "line-through text-slate-500" : ""}`}
                  >
                    {triagem.nome}
                  </h2>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    <p><strong>Id da Triagem:</strong> {triagem.id}</p>
                    <p><strong>Paciente:</strong> {triagem.paciente?.nome}</p>
                    <p><strong>Id do Enfermeiro:</strong> {triagem.enfermeiro?.id}</p>
                  </div>
                </div>

                <button
                  onClick={() => marcarComoFeito(triagem.id)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 font-medium transition ${
                    triagem.feito
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                >
                  {triagem.feito ? "✓ Feito" : "Marcar como feito"}
                </button>

                {!triagem.feito && (
                  <button
                    type="button"
                    onClick={() => abrirModalConsulta(triagem)}
                    className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                  >
                    Realizar consulta
                  </button>
                )}
              </div>
            </div>
          ))}

          {triagens?.length === 0 && (
            <p className="py-8 text-center text-slate-500">Nenhuma triagem disponível</p>
          )}
        </div>

          <ModalFormularioMedico
            triagens={triagens}
            relatoPaciente={relatoPaciente}
            setRelatoPaciente={setRelatoPaciente}
            idTriagem={idTriagem}
            setIdTriagem={setIdTriagem}
            idMedico={idMedico}
            setIdMedico={setIdMedico}
            idSala={idSala}
            setSala={setSala}
            criarConsulta={criarConsulta}
            idPaciente={idPaciente}
            isOpen={modalAberto}
            onClose={fecharModalConsulta}
        />
      </div>
    </main>
  );
}
