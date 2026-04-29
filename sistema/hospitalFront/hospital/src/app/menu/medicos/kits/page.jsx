'use client';

import NavBar from "../../../../layouts/NavBar";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function KitsPage() {
  const [kits, setKits] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [kitQuantidade, setkitQuantidade] = useState("")
  const [kitName, setKitName] = useState("")


  const carregaKits = () => {
    api
      .get('/kits/get-all')
      .then((response) => {
        setKits(response.data?.data || []);
        setErro("");
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        setErro(error.message || "Falha ao carregar kits.");
      })
      .finally(() => {
        setCarregando(false);
      });
  };


  const CreateKit = () => {
        if (!kitName || !kitQuantidade) {
          alert("Por favor, preencha o nome e a quantidade.");
          return;
        }

        api.post('/kits/create', {
          nome: kitName,
          quantidade: Number(kitQuantidade),
        })
          .then((response) => {
            console.log("Kit criado com sucesso:", response.data);
            setKitName(""); 
            setkitQuantidade(""); 
            carregaKits(); 
          })
          .catch((error) => {
            console.error("Erro ao criar kit:", error);
          });

          
      };

      const excluirKit = (id) => {

        api.delete(`/kits/delete/${id}`)
          .then((response) => {
            console.log("Kit excluído com sucesso:", response.data);
            carregaKits(); 
          })
          .catch((error) => {
            console.error("Erro ao excluir kit:", error);
          });
      };


  useEffect(() => {
    carregaKits();

  }, []);

  const totalKits = kits.length;
  const kitsFiltrados = kits.filter((kit) =>
    (kit.nome || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-fundo-das-paginas px-4 text-slate-900">
      <div className="absolute inset-0 bg-white/20 z-0" />

      <div className="z-10 w-full max-w-7xl pt-10">
        <NavBar
          ativo={true}
          itensMenu={[
            { href: "/menu/medicos", label: "Home", ativo: false },
            { href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
            { href: "/menu/medicos/laudos", label: "Laudos", ativo: false },
            { href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
            { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
            { href: "/menu/medicos/salas", label: "Salas", ativo: false },
          ]}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="w-full rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
            <h1 className="text-2xl font-semibold text-slate-800">Kits</h1>
            <p className="mt-2 text-sm text-slate-500">Consulta dos kits cadastrados no sistema.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="kit" className="mb-1 block text-sm font-medium text-slate-700">
                  Nome do kit
                </label>
                <input
                  id="kitName"
                  type="text"
                  value={kitName} 
                  onChange={(e) => setKitName(e.target.value)}
                  placeholder="Nome do Kit"
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label htmlFor="quantidade" className="mb-1 block text-sm font-medium text-slate-700">
                  Quantidade disponível
                </label>
                <input
                  id="kitQuantidade"
                  type="number"
                  value={kitQuantidade} 
                  onChange={(e) => setkitQuantidade(e.target.value)}
                  placeholder="Quantidade disponível do kit"
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
                onClick={() => CreateKit()}>
                Criar Kit
              </button>
            </div>
          </section>

          <section className="w-full rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-semibold text-slate-800">Kits Cadastrados</h2>

            <div className="mt-4 flex justify-center">
              <input
                type="text"
                placeholder="Pesquisar Kits"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
              />
            </div>

            {carregando ? (
              <div className="py-12 text-center">
                <p className="text-lg text-slate-600 animate-pulse">Carregando kits...</p>
              </div>
            ) : erro ? (
              <div className="py-12 text-center">
                <p className="text-lg font-semibold text-red-600">{erro}</p>
              </div>
            ) : kitsFiltrados.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {kitsFiltrados.map((kit) => (
                  <div
                    key={kit.id || kit._id || kit.nome}
                    className="rounded-lg border border-slate-400 bg-slate-50 p-5 shadow-sm transition hover:shadow-md"
                  >
                    <h3 className="text-xl font-semibold capitalize text-slate-800">{kit.nome}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        Quantidade: {kit.quantidade}

                        <button 
                        type="button" 
                        className=" bg-botao-excluir text-white px-2 py-1 rounded ml-4 hover:bg-red-700 transition"
                        onClick={() => excluirKit(kit.id)}>
                          Excluir
                        </button>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl bg-white/50 py-12 text-center">
                <p className="text-lg text-slate-600">Nenhum kit encontrado no banco de dados.</p>
              </div>
            )}

            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              <p>Total: {totalKits} registro(s)</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
