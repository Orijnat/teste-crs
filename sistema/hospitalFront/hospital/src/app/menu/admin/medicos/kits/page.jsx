'use client';

import NavBar from "../../../../layouts/NavBar";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Kits from "../../../../layouts/kits";

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

        <Kits 
                kits={kitsFiltrados}
                totalKits={totalKits}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                kitName={kitName}
                setKitName={setKitName}
                kitQuantidade={kitQuantidade}
                setkitQuantidade={setkitQuantidade}
                CreateKit={CreateKit}
                excluirKit={excluirKit}
                kitsCarregados={kits}
                kitsFiltrados={kitsFiltrados} 
        
                />
      </div>
    </main>
  );
}
