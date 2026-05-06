"use client";

import { useEffect, useState } from "react";
import NavBar from "../../../../../layouts/NavBar";
import api from "@/utils/api";
import { GiDoubleNecklace } from "react-icons/gi";

export default function VerTriagensPage() {
  const [triagens, setTriagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const obterOrdemCriacao = (triagem) => {
    const valorCriacao = triagem?.createdAt ?? triagem?.created_at ?? triagem?.data ?? "";
    const dataCriacao = new Date(valorCriacao);

    if (!Number.isNaN(dataCriacao.getTime())) {
      return dataCriacao.getTime();
    }

    const idNumerico = Number(triagem?.id);
    return Number.isNaN(idNumerico) ? 0 : idNumerico;
  };

  const formatarValor = (valor) => valor ?? "-";

  useEffect(() => {
    const carregarTriagens = async () => {
      try {
        setCarregando(true);
        setErro("");

        const response = await api.get("/triagem/get-all");
        const triagensCarregadas = response.data?.data ?? response.data ?? [];

        setTriagens(
          [...triagensCarregadas].sort(
            (triagemA, triagemB) => obterOrdemCriacao(triagemB) - obterOrdemCriacao(triagemA)
          )
        );
      } catch (error) {
        console.error("Erro ao carregar triagens:", error);
        setErro(error?.response?.data?.message || "Não foi possível carregar as triagens.");
      } finally {
        setCarregando(false);
      }
    };

    carregarTriagens();
  }, []);

  return (
    <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <NavBar
          ativo={true}
          itensMenu={[
            { href: "/menu/enfermeiros", label: "Home", ativo: false },
            { href: "/menu/enfermeiros/procedimentos", label: "Procedimentos", ativo: false },
            { href: "/menu/enfermeiros/kits", label: "Kits", ativo: false },
            { href: "/menu/enfermeiros/medicamentos", label: "Medicamentos", ativo: false },
            { href: "/menu/enfermeiros/triagem", label: "Triagem", ativo: false },
          ]}
        />

        <section className="flex items-center justify-center rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="text-center">
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Triagens realizadas</h1>
            <p className="mt-2 text-sm text-slate-600">
              Veja abaixo os dados de cada triagem cadastrada.
            </p>
          </div>
        </section>

        <section className="rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          {carregando ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Carregando triagens...
            </p>
          ) : erro ? (
            <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </p>
          ) : triagens.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Nenhuma triagem encontrada.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {triagens.map((triagem) => (
                <article
                  key={triagem.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Triagem #{triagem.id ?? "-"}</p>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {triagem.nome ?? triagem.tipoTriagem ?? "Triagem"}
                      </h2>
                    </div>
                    <p className="text-sm font-medium text-slate-500">
                      Data: {triagem.data ?? triagem.createdAt ?? triagem.created_at ?? "não informada"}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                    <p><strong>Paciente:</strong> {formatarValor(triagem?.paciente?.nome ?? triagem?.idPaciente)}</p>
                    <p><strong>Enfermeiro:</strong> {formatarValor(triagem?.enfermeiro?.id ?? triagem?.idEnfermeiro)}</p>
                    <p><strong>Doença:</strong> {formatarValor(triagem?.idDoenca ?? triagem?.doenca?.id)}</p>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {triagem.descricao ?? triagem.relato ?? "Sem descrição disponível."}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}