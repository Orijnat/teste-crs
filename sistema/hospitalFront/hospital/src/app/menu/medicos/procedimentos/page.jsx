'use client';

import { useState } from "react";
import NavBar from "../../../../layouts/NavBar";

const initialForm = {
    procedimento: "",
    kits: "",
    idPaciente: "",
    idMedico: "",
    sala: "",
};

export default function ProcedimentosPage() {
    const [form, setForm] = useState(initialForm);
    const [procedimentos, setProcedimentos] = useState([]);
    const [mensagem, setMensagem] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const camposObrigatorios = Object.values(form).some((valor) => !valor.trim());

        if (camposObrigatorios) {
            setMensagem("Preencha todos os campos para criar o procedimento.");
            return;
        }

        setProcedimentos((currentProcedimentos) => [
            {
                id: crypto.randomUUID(),
                ...form,
            },
            ...currentProcedimentos,
        ]);

        setForm(initialForm);
        setMensagem("Procedimento criado com sucesso.");
    }

    return (
        <main className="min-h-screen bg-[linear-gradient(135deg,#e2e8f0_0%,#f8fafc_46%,#dbeafe_100%)] px-4 py-8 text-slate-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <NavBar
                    itensMenu={[
                        { href: "/menu/medicos", label: "Home", ativo: false },
                        { href: "/menu/medicos/consultas", label: "Consultas", ativo: false },
                        { href: "/menu/medicos/kits", label: "Kits", ativo: false },
                    ]}
                />

                <section className="flex justify-center">
                    <div className="w-full max-w-2xl rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur mt-10">
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Criar procedimento</h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-600">
                            Registre o procedimento, os kits necessários e os dados de atendimento para manter o fluxo da unidade organizado.
                        </p>

                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="procedimento" className="mb-1 block text-sm font-medium">
                                    Procedimento
                                </label>
                                <input
                                    id="procedimento"
                                    name="procedimento"
                                    type="text"
                                    value={form.procedimento}
                                    onChange={handleChange}
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
                                    value={form.kits}
                                    onChange={handleChange}
                                    placeholder="Kits necessários"
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
                                        value={form.idPaciente}
                                        onChange={handleChange}
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
                                        value={form.idMedico}
                                        onChange={handleChange}
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
                                    value={form.sala}
                                    onChange={handleChange}
                                    placeholder="Sala onde o procedimento será realizado"
                                    autoComplete="off"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                />
                            </div>

                            {mensagem ? (
                                <p className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">{mensagem}</p>
                            ) : null}

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