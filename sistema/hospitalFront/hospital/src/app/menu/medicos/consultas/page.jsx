"use client";

import { useEffect, useState } from "react";
import NavBar from "../../../../layouts/NavBar";
import api from "@/utils/api";

export default function MenuPage() {
    const [relatoPaciente, setRelatoPaciente] = useState("");
    const [idTriagem, setIdTriagem] = useState("");
    const [idMedico, setIdMedico] = useState("");
    const [idSala, setSala] = useState("");
    const [data, setData] = useState("");
    const [triagens, setTriagens] = useState([]);

    useEffect(() => {
        const buscarTriagens = async () => {
            try {
                const response = await api.get("/triagem/get-all");
                setTriagens(response.data?.data ?? []);
            } catch (error) {
                console.error("Erro ao buscar triagens:", error);
            }
        };

        buscarTriagens();
    }, []);

    const triagemSelecionada = triagens.find(
        (triagem) => String(triagem.id) === String(idTriagem)
    );

    const idPaciente = triagemSelecionada?.paciente?.id ? String(triagemSelecionada.paciente.id) : "";

    const criarConsulta = async (e) => {
        e.preventDefault();

        try {
            const dados = {
                relatoPaciente,
                idTriagem: Number(idTriagem),
                idMedico: Number(idMedico),
                idSala: Number(idSala),
                data,
                idPaciente: Number(idPaciente),
            };

            if (!relatoPaciente || !idTriagem || !idMedico || !idSala || !data || !idPaciente) {
                alert("Preencha todos os campos para cadastrar a consulta.");
                return;
            }

            await api.post("/consulta/create", dados);

            setRelatoPaciente("");
            setIdTriagem("");
            setIdMedico("");
            setSala("");
            setData("");

            alert("Consulta cadastrada com sucesso!");
            console.log("Consulta criada:", dados);
        } catch (error) {
            console.error("Erro ao criar consulta:", error);
            alert(error?.response?.data?.message || "Erro ao cadastrar consulta.");
        }
    };

    return (
        <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <NavBar
                    ativo={true}
                    itensMenu={[
                        { href: "/menu/medicos", label: "Home", ativo: false },
                        { href: "/menu/medicos/laudos", label: "Laudos", ativo: false },
                        { href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
                        { href: "/menu/medicos/kits", label: "Kits", ativo: false },
                        { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
                        { href: "/menu/medicos/salas", label: "Salas", ativo: false },
                    ]}
                />

                <section className="flex justify-center">
                    <div className="mt-10 w-full max-w-2xl rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Consulta</h1>

                        <form className="mt-8 space-y-4" onSubmit={criarConsulta}>
                            <div>
                                <label htmlFor="relatoPaciente" className="mb-1 block text-sm font-medium">
                                    Relato do paciente
                                </label>
                                <input
                                    id="relatoPaciente"
                                    name="relatoPaciente"
                                    type="text"
                                    value={relatoPaciente}
                                    onChange={(e) => setRelatoPaciente(e.target.value)}
                                    placeholder="Relato do paciente"
                                    autoComplete="off"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="idTriagem" className="mb-1 block text-sm font-medium">
                                        ID da Triagem
                                    </label>
                                    <select
                                        id="idTriagem"
                                        name="idTriagem"
                                        value={idTriagem}
                                        onChange={(e) => setIdTriagem(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    >
                                        <option value="">Selecione a triagem</option>
                                        {triagens.map((triagem) => (
                                            <option key={triagem.id} value={triagem.id}>
                                                Triagem #{triagem.id} - Paciente {triagem.paciente?.nome ?? triagem.paciente?.id ?? "sem paciente"}
                                            </option>
                                        ))}
                                    </select>
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
                                    onChange={(e) => setSala(e.target.value)}
                                    placeholder="ID da sala onde a consulta está sendo realizada"
                                    autoComplete="off"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                />
                            </div>

                            <div>
                                <label htmlFor="dataConsulta" className="mb-1 block text-sm font-medium">
                                    Data da Consulta
                                </label>
                                <input
                                    id="dataConsulta"
                                    name="dataConsulta"
                                    type="date"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    autoComplete="off"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700"
                            >
                                Finalizar Consulta
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}