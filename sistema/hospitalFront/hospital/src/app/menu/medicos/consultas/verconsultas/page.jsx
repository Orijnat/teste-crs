"use client";

import { useEffect, useState } from "react";
import NavBar from "../../../../../layouts/NavBar";
import api from "../../../../../utils/api";

export default function VerConsultasPage() {
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const obterOrdemCriacao = (consulta) => {
    const valorCriacao = consulta?.createdAt ?? consulta?.created_at ?? consulta?.date ?? consulta?.data ?? "";
    const dataCriacao = new Date(valorCriacao);

    if (!Number.isNaN(dataCriacao.getTime())) {
      return dataCriacao.getTime();
    }

    const idNumerico = Number(consulta?.id);
    return Number.isNaN(idNumerico) ? 0 : idNumerico;
  };

    const formatarValor = (valor) => valor ?? "-";

  useEffect(() => {
    const carregaConsultas = async () => {
      try {
        setCarregando(true);
        setErro("");

        const response = await api.get("/consulta/get-all");
        const consultasCarregadas = response.data?.data ?? response.data ?? [];
        setConsultas(
          [...consultasCarregadas].sort((consultaA, consultaB) => obterOrdemCriacao(consultaB) - obterOrdemCriacao(consultaA))
        );
      } catch (error) {
        console.error("Erro ao carregar consultas:", error);
        setErro(error?.response?.data?.message || "Não foi possível carregar as consultas.");
      } finally {
        setCarregando(false);
      }
    };

    carregaConsultas();
  }, []);

  return (
    <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <NavBar
          ativo={true}
          itensMenu={[
            { href: "/menu/medicos", label: "Home", ativo: false },
            { href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
            { href: "/menu/medicos/laudos", label: "Laudos", ativo: false },
            { href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
            { href: "/menu/medicos/kits", label: "Kits", ativo: false },
            { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
            { href: "/menu/medicos/salas", label: "Salas", ativo: false },
          ]}
        />

        <section className="flex items-center mt-5 justify-center rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="text-center">

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Consultas realizadas</h1>
            <p className="mt-2 text-sm text-slate-600">
              Veja abaixo os dados de cada consulta cadastrada.
            </p>
          </div>
        </section>

        <section className="rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          {carregando ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Carregando consultas...
            </p>
          ) : erro ? (
            <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </p>
          ) : consultas.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Nenhuma consulta encontrada.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {consultas.map((consulta) => (
                <article
                  key={consulta.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Consulta #{consulta.id ?? "-"}</p>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {consulta.tipoConsulta ?? consulta.tipo ?? "Consulta médica"}
                      </h2>
                    </div>
                    <p className="text-sm font-medium text-slate-500">
                      Data: {consulta.date ?? consulta.createdAt ?? consulta.data ?? "não informada"}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                    <p><strong>Triagem:</strong> {formatarValor(consulta?.triagem?.id ?? consulta?.idTriagem)}</p>
                    <p><strong>Paciente:</strong> {formatarValor(consulta?.paciente?.nome ?? consulta?.idPaciente)}</p>
                    <p><strong>Médico:</strong> {formatarValor(consulta?.medico?.nome ?? consulta?.idMedico)}</p>
                    </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {consulta.relato_paciente ?? consulta.resumo ?? "Sem descrição disponível."}
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
