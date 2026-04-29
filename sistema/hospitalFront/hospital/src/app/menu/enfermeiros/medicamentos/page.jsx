"use client";

import NavBar from "../../../../layouts/NavBar";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function MedicamentosMedicosPage() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [descricaoExpandida, setDescricaoExpandida] = useState({});
  

  useEffect(() => {
    api
      .get('/medicamento/get-all')
      .then((response) => {
        setMedicamentos(response.data?.data || []);
        setErro("");
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        setErro(error.message || "Falha ao carregar medicamentos.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  const totalMedicamentos = medicamentos.length;
  
  const medicamentosFiltrados = medicamentos.filter(med =>
    med.medicamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const alternarDescricao = (id) => {
    setDescricaoExpandida((anterior) => ({
      ...anterior,
      [id]: !anterior[id],
    }));
  };


  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-fundo-das-paginas px-4 text-slate-900">
      <div className="absolute inset-0 bg-white/20 z-0" />

      <div className="z-10 w-full max-w-7xl pt-10">
        <NavBar
          ativo={true}
          itensMenu={[
            { href: "/menu/enfermeiros", label: "Home", ativo: false },
            { href: "/menu/enfermeiros/consultas", label: "Consultas", ativo: false },
            { href: "/menu/enfermeiros/laudos", label: "Laudos", ativo: false },
            { href: "/menu/enfermeiros/procedimentos", label: "Procedimentos", ativo: false },
            { href: "/menu/enfermeiros/kits", label: "Kits", ativo: false },
            { href: "/menu/enfermeiros/medicamentos", label: "Medicamentos", ativo: true },
          ]}
        />

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-center mb-8">Medicamentos do Banco de Dados</h1>

          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Pesquisar Medicamentos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} //
            />
          </div>

          {carregando ? (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600 animate-pulse">Carregando medicamentos...</p>
            </div>
          ) : erro ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-600 font-semibold">{erro}</p>
            </div>
          ) : (
            <>
              {medicamentos.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {medicamentosFiltrados.map((med) => (
                    <div
                      key={med.id || med._id || med.medicamento}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-slate-100"
                    >
                      <h3 className="text-xl font-semibold text-slate-800 mb-2 capitalize">
                        {med.medicamento}
                      </h3>

                      <div className="mb-4 text-sm leading-6 text-slate-600">
                        <p className="whitespace-pre-line">
                          {descricaoExpandida[med.id || med._id || med.medicamento]
                            ? med.descricao
                            : `${med.descricao?.slice(0, 180) || ""}${
                                med.descricao && med.descricao.length > 180 ? "..." : ""
                              }`}
                        </p>

                        {med.descricao && med.descricao.length > 180 && (
                          <button
                            type="button"
                            onClick={() => alternarDescricao(med.id || med._id || med.medicamento)}
                            className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                          >
                            {descricaoExpandida[med.id || med._id || med.medicamento]
                              ? "Mostrar menos"
                              : "Ver mais"}
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          Quantidade: {med.quantidade}
                        </span>

                        <span
                          className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                            med.controlado
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {med.controlado ? "Controlado" : "Não controlado"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/50 rounded-xl">
                  <p className="text-lg text-slate-600">
                    Nenhum medicamento encontrado no banco de dados.
                  </p>
                </div>
              )}

              <div className="mt-8 text-center text-sm text-slate-500 font-medium">
                <p>Total: {totalMedicamentos} registro(s)</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}