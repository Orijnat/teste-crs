"use client";

import { useEffect, useState } from "react";
import NavBar from "../../../../layouts/NavBar";
import api from "../../../../utils/api";

export default function SalasPage() {
  const [salas, setSalas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarSalas = async () => {
      try {
        setCarregando(true);
        setErro("");

        const response = await api.get("/sala/get-all");
        const salasCarregadas = response.data?.data ?? response.data ?? [];
        setSalas(Array.isArray(salasCarregadas) ? salasCarregadas : []);
      } catch (error) {
        console.error("Erro ao carregar salas:", error);
        setErro(error?.response?.data?.message || "Não foi possível carregar as salas.");
        setSalas([]);
      } finally {
        setCarregando(false);
      }
    };

    carregarSalas();
  }, []);

  const formatarValor = (valor) => valor ?? "-";

  const obterStatusSala = (sala) => {
    if (typeof sala?.ocupada === "boolean") {
      return sala.ocupada ? "Ocupada" : "Disponível";
    }

    if (typeof sala?.status === "string") {
      return sala.status;
    }

    if (sala?.paciente) {
      return "Ocupada";
    }

    return "Disponível";
  };

  const salaOcupada = (sala) => {
    if (typeof sala?.ocupada === "boolean") {
      return sala.ocupada;
    }

    if (typeof sala?.status === "string") {
      return sala.status.toLowerCase().includes("ocup");
    }

    return Boolean(sala?.paciente);
  };

  return (
    <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
      <NavBar
        ativo={true}
        itensMenu={[
          { href: "/menu/medicos", label: "Home", ativo: false },
          { href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
          { href: "/menu/medicos/laudos", label: "Laudos", ativo: false },
          { href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
          { href: "/menu/medicos/kits", label: "Kits", ativo: false },
          { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
        ]}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="mt-10 rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="text-center">
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Salas de Atendimento</h1>
            <p className="mt-2 text-sm text-slate-600">
              Visualize as salas registradas no sistema.
            </p>
          </div>
        </section>

        <section className="rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          {carregando ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Carregando salas...
            </p>
          ) : erro ? (
            <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </p>
          ) : salas.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Nenhuma sala encontrada.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {salas.map((sala) => (
                <article
                  key={sala?.id}
                  className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                    salaOcupada(sala)
                      ? "border-green-200 bg-green-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500 font-semibold">
                        Sala {formatarValor(sala?.numero ?? sala?.nome ?? sala?.codigo)}
                      </p>
                      <h2 className="text-lg font-bold text-slate-800">
                        {formatarValor(sala?.tipo ?? sala?.descricao ?? "Sala de atendimento")}
                      </h2>
                    </div>

                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        salaOcupada(sala)
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {obterStatusSala(sala)}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm text-slate-700">
                    <p>
                      <strong>ID:</strong> {formatarValor(sala?.id)}
                    </p>
                    <p>
                      <strong>Nome:</strong> {formatarValor(sala?.nome)}
                    </p>
                    <p>
                      <strong>Descrição:</strong> {formatarValor(sala?.descricao)}
                    </p>

                    {sala?.paciente ? (
                      <div className="rounded-xl bg-white px-3 py-3 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Paciente vinculado</p>
                        <p className="font-medium text-slate-800">
                          {formatarValor(sala?.paciente?.nome ?? sala?.paciente?.id)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">Nenhum paciente vinculado no momento.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}