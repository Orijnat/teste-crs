"use client";
import Footer from "@/layouts/Footer";
import NavBar from "@/layouts/NavBar";
import FiltroData from "@/layouts/filtroData";
import api from "@/utils/api";
import { useState } from "react";

export default function TriagemRelatorioPage() {
  const [dataI, setDataI] = useState("");
  const [dataF, setDataF] = useState("");
  const [triagens, setTriagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscou, setBuscou] = useState(false); 
  const handleDateChange = ({ dataI, dataF }) => {
    setDataI(dataI);
    setDataF(dataF);
  };

  const pegarTriagens = async () => {
    if (!dataI || !dataF) {
      alert("Por favor, selecione as datas de início e fim.");
      return;
    }

    setLoading(true);
    setBuscou(true);
    try {
      const resposta = await api.get("/triagem/get-por-data", {
        params: { dataI, dataF },
      });

      const dados = Array.isArray(resposta.data.data) ? resposta.data.data : [];
      setTriagens(dados);
    } catch (error) {
      console.error("Erro na API:", error.response?.data);
      setTriagens([]);
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
              Relatório de Triagens
            </h1>
            <p className="text-slate-600">Acompanhe as triagens registradas no sistema</p>
          </div>

          <div className="mx-auto mb-6 flex items-center justify-center rounded-lg bg-white/90 p-4 shadow-md">
            <FiltroData value={{ dataI, dataF }} onDataChange={handleDateChange} />

            <button
              onClick={pegarTriagens}
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
              ) : triagens.length > 0 ? (
                <ul className="space-y-4 text-left">
                  {triagens.map((triagem) => (
                    <li
                      key={triagem?.id}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                            Triagem #{triagem?.id}
                          </p>
                          <p className="text-base font-medium text-slate-800">
                            Paciente: {triagem?.paciente?.nome || "Não informado"}
                          </p>
                          <p className="text-sm text-slate-500">
                            Data: {triagem?.data
                              ? new Date(triagem.data).toLocaleString("pt-BR", { dateStyle: 'short' })
                              : "Data não disponível"}
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
                          Atendido por: <span className="font-medium">{triagem?.enfermeiro?.nome || "N/A"}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500">
                  {buscou ? "Nenhum resultado encontrado para este período." : "Selecione as datas para gerar o relatório."}
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