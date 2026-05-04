'use client';

import { useEffect, useState } from "react";
import NavBar from "../../../../layouts/NavBar";
import api from "../../../../utils/api";

const fieldClass = "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900";

export default function LaudosPage() {
    const [tipoLaudo, setTipoLaudo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [idTriagem, setIdTriagem] = useState("");
    const [idConsulta, setIdConsulta] = useState("");
    const [idMedico, setIdMedico] = useState("");
    const [dataLaudo, setDataLaudo] = useState("");
    const [triagens, setTriagens] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [laudos, setLaudos] = useState([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [triagensResponse, consultasResponse] = await Promise.all([
                    api.get("/triagem/get-all"),
                    api.get("/consulta/get-all"),
                ]);

                setTriagens(triagensResponse.data?.data ?? []);
                setConsultas(consultasResponse.data?.data ?? []);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        carregarDados();
    }, []);

    const triagemSelecionada = triagens.find((triagem) => String(triagem.id) === String(idTriagem));
    const idPaciente = triagemSelecionada?.paciente?.id ? String(triagemSelecionada.paciente.id) : "";

    const criarLaudo = async (event) => {
        event.preventDefault();

        if (!tipoLaudo || !descricao || !idTriagem || !idConsulta || !idPaciente || !idMedico || !dataLaudo) {
            setMensagem("Preencha todos os campos para cadastrar o laudo.");
            return;
        }

        try {
            const dados = {
                tipoLaudo,
                descricao,
                idTriagem: Number(idTriagem),
                idConsulta: Number(idConsulta),
                idPaciente: Number(idPaciente),
                idMedico: Number(idMedico),
                dataLaudo,
            };

            await api.post("/laudos/create", dados);

            setLaudos((currentLaudos) => [
                { id: crypto.randomUUID(), ...dados },
                ...currentLaudos,
            ]);

            setTipoLaudo("");
            setDescricao("");
            setIdTriagem("");
            setIdConsulta("");
            setIdMedico("");
            setDataLaudo("");
            setMensagem("Laudo cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar laudo", error);
            setMensagem(error?.response?.data?.message || "Erro ao criar laudo. Tente novamente.");
        }
    };

    return (
        <main className="min-h-screen bg-fundo-das-paginas px-4 py-8 text-slate-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <NavBar
                    ativo={true}
                    itensMenu={[
                        { href: "/menu/medicos", label: "Home", ativo: false },
                        { href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
                        { href: "/menu/medicos/procedimentos", label: "Procedimentos", ativo: false },
                        { href: "/menu/medicos/kits", label: "Kits", ativo: false },
                        { href: "/menu/medicos/medicamentos", label: "Medicamentos", ativo: false },
                        { href: "/menu/medicos/salas", label: "Salas", ativo: false },
                    ]}
                />

                <section className="flex justify-center">
                    <div className="mt-10 w-full max-w-2xl rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Laudo</h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-600">
                            Cadastre um laudo com triagem, consulta e paciente vinculados.
                        </p>

                        <form className="mt-8 space-y-4" onSubmit={criarLaudo}>
                            <div>
                                <label htmlFor="tipoLaudo" className="mb-1 block text-sm font-medium">
                                    Tipo de laudo
                                </label>
                                <input
                                    id="tipoLaudo"
                                    type="text"
                                    value={tipoLaudo}
                                    onChange={(event) => setTipoLaudo(event.target.value)}
                                    placeholder="Ex: Radiografia, Ultrassom, Análise clínica"
                                    autoComplete="off"
                                    className={fieldClass}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="idTriagem" className="mb-1 block text-sm font-medium">
                                        Triagem
                                    </label>
                                    <select
                                        id="idTriagem"
                                        value={idTriagem}
                                        onChange={(event) => setIdTriagem(event.target.value)}
                                        className={fieldClass}
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
                                    <label htmlFor="idConsulta" className="mb-1 block text-sm font-medium">
                                        Consulta
                                    </label>
                                    <select
                                        id="idConsulta"
                                        value={idConsulta}
                                        onChange={(event) => setIdConsulta(event.target.value)}
                                        className={fieldClass}
                                    >
                                        <option value="">Selecione a consulta</option>
                                        {consultas.map((consulta) => (
                                            <option key={consulta.id} value={consulta.id}>
                                                Consulta #{consulta.id}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="descricao" className="mb-1 block text-sm font-medium">
                                    Descrição do laudo
                                </label>
                                <textarea
                                    id="descricao"
                                    value={descricao}
                                    onChange={(event) => setDescricao(event.target.value)}
                                    placeholder="Descreva os achados e conclusões do laudo"
                                    autoComplete="off"
                                    rows="4"
                                    className={`${fieldClass} resize-none`}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">

                                <div>
                                    <label htmlFor="idMedico" className="mb-1 block text-sm font-medium">
                                        ID do médico responsável
                                    </label>
                                    <input
                                        id="idMedico"
                                        type="text"
                                        value={idMedico}
                                        onChange={(event) => setIdMedico(event.target.value)}
                                        placeholder="Id do médico responsável"
                                        autoComplete="off"
                                        className={fieldClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="dataLaudo" className="mb-1 block text-sm font-medium">
                                    Data do laudo
                                </label>
                                <input
                                    id="dataLaudo"
                                    type="date"
                                    value={dataLaudo}
                                    onChange={(event) => setDataLaudo(event.target.value)}
                                    autoComplete="off"
                                    className={fieldClass}
                                />
                            </div>

                            {mensagem ? (
                                <p className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">{mensagem}</p>
                            ) : null}

                            <p className="text-sm text-slate-500">Laudos cadastrados nesta sessão: {laudos.length}</p>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700"
                            >
                                Criar laudo
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}