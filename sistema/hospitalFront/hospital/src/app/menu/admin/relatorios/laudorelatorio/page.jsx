"use client";
import Footer from "@/layouts/Footer";
import NavBar from "@/layouts/NavBar";
import FiltroData from "@/layouts/filtroData";
import api from "@/utils/api";
import { useState } from "react";

export default function LaudoRelatorioPage() {
  const [dataI, setDataI] = useState("");
  const [dataF, setDataF] = useState("");
  const [laudos, setLaudos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscou, setBuscou] = useState(false);

  const handleDateChange = ({ dataI, dataF }) => {
    setDataI(dataI);
    setDataF(dataF);
  };

  const normalizarData = (valorData) => {
    if (!valorData) {
      return null;
    }

    const dataNormalizada = new Date(valorData);
    return Number.isNaN(dataNormalizada.getTime()) ? null : dataNormalizada;
  };

  const obterDataLaudo = (laudo) =>
    normalizarData(laudo?.dataLaudo ?? laudo?.createdAt ?? laudo?.created_at ?? laudo?.data);

  const pegarLaudos = async () => {
    if (!dataI || !dataF) {
      alert("Por favor, selecione as datas de início e fim.");
      return;
    }

    setLoading(true);
    setBuscou(true);

    try {
      const resposta = await api.get("/laudos/get-all");
      const todosLaudos = Array.isArray(resposta.data?.data) ? resposta.data.data : Array.isArray(resposta.data) ? resposta.data : [];

      const inicio = new Date(`${dataI}T00:00:00`);
      const fim = new Date(`${dataF}T23:59:59`);

      const filtrados = todosLaudos.filter((laudo) => {
        const dataLaudo = obterDataLaudo(laudo);
        return dataLaudo && dataLaudo >= inicio && dataLaudo <= fim;
      });

      setLaudos(filtrados);
    } catch (error) {
      console.error("Erro na API:", error.response?.data);
      setLaudos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-fundo-das-paginas text-slate-900">
      <main className="relative flex flex-1 flex-col items-center overflow-hidden px-4 py-8">
        <div className="absolute inset-0 z-0 bg-white/20" />

        <NavBar
          ativo={true}
          itensMenu={[
            { label: "Home", href: "/menu/admin", ativo: false },
            { label: "Relatorios", href: "/menu/admin/relatorios", ativo: true },
          ]}
        />

        <div className="z-10 mt-10 flex w-full max-w-7xl flex-1 flex-col">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">
              Relatório de Laudos
            </h1>
            <p className="text-slate-600">Acompanhe os laudos registrados no sistema</p>
          </div>

          <div className="mx-auto mb-6 flex items-center justify-center rounded-lg bg-white/90 p-4 shadow-md">
            <FiltroData value={{ dataI, dataF }} onDataChange={handleDateChange} />

            <button
              onClick={pegarLaudos}
              disabled={loading}
              className="ml-4 rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {loading ? "Carregando..." : "Filtrar"}
            </button>
          </div>

          <section className="rounded-[28px] bg-white/90 p-6 shadow-lg">
            <div className="min-h-[300px] rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              {loading ? (
                <p className="text-slate-500">Buscando dados...</p>
              ) : laudos.length > 0 ? (
                <ul className="space-y-4 text-left">
                  {laudos.map((laudo) => (
                    <li
                      key={laudo?.id}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                            Laudo #{laudo?.id ?? "-"}
                          </p>
                          <p className="text-base font-medium text-slate-800">
                            Tipo: {laudo?.tipoLaudo || laudo?.tipo || "Laudo médico"}
                          </p>
                          <p className="text-sm text-slate-500">
                            Data: {laudo?.dataLaudo ?? laudo?.createdAt ?? laudo?.data ?? "Data não disponível"}
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
                          Médico: <span className="font-medium">{laudo?.medico?.nome || "N/A"}</span>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm text-slate-600">
                        <p>
                          <strong>Consulta:</strong> {laudo?.consulta?.id || "N/A"}
                        </p>
                        <p>
                          <strong>Paciente:</strong> {laudo?.paciente?.nome || "Não informado"}
                        </p>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-slate-700">
                        {laudo?.descricao || laudo?.resumo || "Sem descrição disponível."}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500">
                  {buscou
                    ? "Nenhum resultado encontrado para este período."
                    : "Selecione as datas para gerar o relatório."}
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}