"use client";

import { useEffect, useState } from "react";
import NavBar from "../../../../../layouts/NavBar";
import api from "../../../../../utils/api";

export default function VerLaudosPage() {
  const [laudos, setLaudos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const obterOrdemCriacao = (laudo) => {
    const valorCriacao = laudo?.createdAt ?? laudo?.created_at ?? laudo?.dataLaudo ?? laudo?.data ?? "";
    const dataCriacao = new Date(valorCriacao);

    if (!Number.isNaN(dataCriacao.getTime())) {
      return dataCriacao.getTime();
    }

    const idNumerico = Number(laudo?.id);
    return Number.isNaN(idNumerico) ? 0 : idNumerico;
  };

  useEffect(() => {
    const carregaLaudos = async () => {
      try {
        setCarregando(true);
        setErro("");

        const response = await api.get("/laudos/get-all");
        const laudosCarregados = response.data?.data ?? response.data ?? [];
        setLaudos(
          [...laudosCarregados].sort((laudoA, laudoB) => obterOrdemCriacao(laudoB) - obterOrdemCriacao(laudoA))
        );
      } catch (error) {
        console.error("Erro ao carregar laudos:", error);
        setErro(error?.response?.data?.message || "Não foi possível carregar os laudos.");
      } finally {
        setCarregando(false);
      }
    };

    carregaLaudos();
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

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Laudos realizados</h1>
            <p className="mt-2 text-sm text-slate-600">
              Veja abaixo os dados de cada laudo cadastrado.
            </p>
          </div>
        </section>

        <section className="rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          {carregando ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Carregando laudos...
            </p>
          ) : erro ? (
            <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </p>
          ) : laudos.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Nenhum laudo encontrado.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {laudos.map((laudo) => (
                <article
                  key={laudo.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Laudo #{laudo.id ?? "-"}</p>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {laudo.tipoLaudo ?? laudo.tipo ?? "Laudo médico"}
                      </h2>
                    </div>
                    <p className="text-sm font-medium text-slate-500">
                      Data: {laudo.dataLaudo ?? laudo.createdAt ?? laudo.data ?? "não informada"}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-slate-600">
                    <p><strong>Consulta:</strong> { laudo.consulta?.id }</p>
                    <p><strong>Paciente:</strong> { laudo.paciente?.nome }</p>
                    <p><strong>Médico:</strong> { laudo.medico?.nome }</p>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {laudo.descricao ?? laudo.resumo ?? "Sem descrição disponível."}
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
