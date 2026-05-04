'use client';

import { useState } from "react";
import NavBar from "../../../../layouts/NavBar";
import api from "../../../../utils/api"

export default function ProcedimentosPage() {
    const [nome, setNome] = useState("");
    const [idKit, setIdKit] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [idMedico, setIdMedico] = useState("");
    const [idEnfermeiro, setIdEnfermeiro] = useState("");
    const [idSala, setIdSala] = useState("");
    const [prioridade, setPrioridade] = useState("");



 const criarProcedimento = async (e) => {

    e.preventDefault();
    try {

        const dados = {
            nome,
            idKit,
            idPaciente,
            idMedico,
            idEnfermeiro,
            idSala,
            prioridade
        };

        const response = await api.post("/procedimentos/create", dados);
        
        console.log("Procedimento criado:", response.data);

        setNome("");
        setIdKit("");
        setIdPaciente("");
        setIdMedico("");
        setIdEnfermeiro("");
        setIdSala("");
        setPrioridade("");
        alert("Procedimento criado com sucesso!")


    } catch (error) {
        console.error("Erro ao criar procedimento:", error);
    }

    };

    return (
        <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <NavBar
                ativo= {true}
                    itensMenu={[
                        { href: "/menu/medicos", label: "Home", ativo: false },
                        { href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
                        { href: "/menu/medicos/laudos", label: "Laudos", ativo: false },
                        { href: "/menu/medicos/kits", label: "Kits", ativo: false },
                        { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
                        { href: "/menu/medicos/salas", label: "Salas", ativo: false },
                    ]}
                />

                <section className="flex justify-center">
                    <div className="w-full max-w-2xl rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur mt-10">
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Criar procedimento</h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-600">
                            Registre o procedimento, os kits necessários e os dados de atendimento para manter o fluxo da unidade organizado.
                        </p>

                        <form className="mt-8 space-y-4" onSubmit={criarProcedimento}>
                                <div>
                                    <label htmlFor="procedimento" className="mb-1 block text-sm font-medium">
                                    Procedimento
                                </label>
                                <input
                                    id="procedimento"
                                    name="procedimento"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Procedimento a ser realizado"
                                    autoComplete="off"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                />
                            </div>

                            <div>
                                <label htmlFor="kits" className="mb-1 block text-sm font-medium">
                                    Kits necessários
                                </label>
                                <input
                                    id="kits"
                                    name="kits"
                                    type="text"
                                    value={idKit}
                                    onChange={(e) => setIdKit(e.target.value)}
                                    placeholder="Informe o ID do kit necessário"
                                    autoComplete="off"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="idPaciente" className="mb-1 block text-sm font-medium">
                                        ID do paciente
                                    </label>
                                    <input
                                        id="idPaciente"
                                        name="idPaciente"
                                        type="text"
                                        value={idPaciente}
                                        onChange={(e) => setIdPaciente(e.target.value)}
                                        placeholder="Id do paciente"
                                        autoComplete="off"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="idMedico" className="mb-1 block text-sm font-medium">
                                        ID do médico
                                    </label>
                                    <input
                                        id="idMedico"
                                        name="idMedico"
                                        type="text"
                                        value={idMedico}
                                        onChange={(e) => setIdMedico(e.target.value)}
                                        placeholder="Id do médico responsável"
                                        autoComplete="off"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="idEnfermeiro" className="mb-1 block text-sm font-medium">
                                        ID do enfermeiro
                                    </label>
                                    <input
                                        id="idEnfermeiro"
                                        name="idEnfermeiro"
                                        type="text"
                                        value={idEnfermeiro}
                                        onChange={(e) => setIdEnfermeiro(e.target.value)}
                                        placeholder="Id do enfermeiro responsável"
                                        autoComplete="off"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="prioridade" className="mb-1 block text-sm font-medium">
                                        Prioridade
                                    </label>
                                    <input
                                        id="prioridade"
                                        name="prioridade"
                                        type="text"
                                        value={prioridade}
                                        onChange={(e) => setPrioridade(e.target.value)}
                                        placeholder="Prioridade (ex: 1, 2, 3)"
                                        autoComplete="off"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    />

                                </div>

                            </div>

                            <div>
                                <label htmlFor="sala" className="mb-1 block text-sm font-medium">
                                    Sala
                                </label>
                                <input
                                    id="sala"
                                    name="sala"
                                    type="text"
                                    value={idSala}
                                    onChange={(e) => setIdSala(e.target.value)}
                                    placeholder="Id da Sala onde o procedimento será realizado"
                                    autoComplete="off"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700"
                            >
                                Criar procedimento
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}