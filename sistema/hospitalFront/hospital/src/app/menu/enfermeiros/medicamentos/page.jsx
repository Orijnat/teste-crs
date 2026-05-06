"use client";

import NavBar from "../../../../layouts/NavBar";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Medicamentos from "../../../../layouts/medicamentos";

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

        <Medicamentos 
                  medicamentos={medicamentosFiltrados}
                  totalMedicamentos={totalMedicamentos}
                  medicamentosFiltrados={medicamentosFiltrados}
                  setSearchTerm={setSearchTerm}
                  searchTerm={searchTerm}
                  alternarDescricao={alternarDescricao}
                  descricaoExpandida={descricaoExpandida}
                  carregando={carregando}
                  erro={erro}
                />
                
              </div>
    </main>
  );
}
    