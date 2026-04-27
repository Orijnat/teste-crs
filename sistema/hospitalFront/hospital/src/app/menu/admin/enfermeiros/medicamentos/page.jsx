"use client";

import NavBar from "../../../../layouts/NavBar";
import { useState } from "react";

export default function MedicamentosEnfermeirosPage() {
  const [medicamentos] = useState([
    { id: 1, nome: "Dipirona", dosagem: "500mg", disponivel: true },
    { id: 2, nome: "Amoxicilina", dosagem: "500mg", disponivel: true },
    { id: 3, nome: "Omeprazol", dosagem: "20mg", disponivel: true },
    { id: 4, nome: "Losartana", dosagem: "50mg", disponivel: true },
    { id: 5, nome: "Atorvastatina", dosagem: "20mg", disponivel: true },
    { id: 6, nome: "Metformina", dosagem: "500mg", disponivel: true },
  ]);

  const medicamentosDisponiveis = medicamentos.filter((med) => med.disponivel);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-200 px-4 text-slate-900">
      <div className="absolute inset-0 bg-white/20 z-0" />

      <div className="z-10 w-full max-w-7xl">
        <NavBar
          itensMenu={[
            { label: "Home", href: "/menu/enfermeiros", ativo: false },
            {
              label: "Triagem",
              href: "/menu/enfermeiros/triagem",
              ativo: false,
            },
            {
              label: "Procedimentos",
              href: "/menu/enfermeiros/procedimentos",
              ativo: false,
            },
            { label: "Kits", href: "/menu/enfermeiros/kits", ativo: false },
            {
              label: "Medicamentos",
              href: "/menu/enfermeiros/medicamentos",
              ativo: true,
            },
          ]}
        />

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-center mb-8">
            Medicamentos Disponíveis
          </h1>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {medicamentosDisponiveis.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {med.nome}
                </h3>
                <p className="text-slate-600 mb-4">Dosagem: {med.dosagem}</p>
                <div className="flex items-center">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Disponível
                  </span>
                </div>
              </div>
            ))}
          </div>

          {medicamentosDisponiveis.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600">
                Nenhum medicamento disponível no momento
              </p>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-slate-600">
            <p>
              Total de medicamentos disponíveis:{" "}
              {medicamentosDisponiveis.length}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
