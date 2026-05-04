'use client';

import { useEffect, useState } from 'react';
import NavBar from "../../../../layouts/NavBar";
import api from "../../../../utils/api";

export default function ProcedimentosPage() {
    const [procedimentos, setProcedimentos] = useState([]);

    const procedimentosOrdenados = [...procedimentos].sort((a, b) => {
        const prioridadeA = Number(a?.prioridade ?? Number.POSITIVE_INFINITY);
        const prioridadeB = Number(b?.prioridade ?? Number.POSITIVE_INFINITY);

        return prioridadeA - prioridadeB;
    });


    const buscarProcedimentos= async () => {
        try {
            const response = await api.get("/procedimentos/get-all");
        setProcedimentos(response.data?.data);
            console.log("Procedimentos recebidos:", response.data);
        }catch (error) {
            console.error("Erro ao buscar procedimentos:", error);
        }
    }

    useEffect(() => {
        buscarProcedimentos();
    }, []);


    const marcarComoFeito = (id) => {
        setProcedimentos(procedimentos.map(proc =>
            proc.id === id ? { ...proc, feito: !proc.feito } : proc
        ));
    };

    return (
        <main className="flex min-h-screen bg-fundo-das-paginas px-4 py-6 text-slate-900">
            <NavBar
            ativo= {true}
                itensMenu={[
                { href: "/menu/enfermeiros", label: "Home", ativo: true },
                { href: "/menu/enfermeiros/triagem", label: "Triagem", ativo: false },
                { href: "/menu/enfermeiros/kits", label: "Kits", ativo: false}, 
                { href: "/menu/enfermeiros/medicamentos", label: "Medicamentos", ativo: false}
                ]}
            />
            
            <div className="w-full max-w-4xl mx-auto rounded-2xl mt-15 bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
                <h1 className="text-2xl font-semibold mb-6">Procedimentos</h1>
                
                <div className="space-y-4">
                    {procedimentosOrdenados?.map((procedimento) => (
                        <div
                            key={procedimento.id}
                            className={`border-2 rounded-lg p-4 transition ${
                                procedimento.feito
                                    ? 'border-green-400 bg-green-50'
                                    : 'border-slate-300 bg-slate-50'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h2 className={`text-lg font-semibold ${
                                        procedimento.feito ? 'line-through text-slate-500' : ''
                                    }`}>
                                        {procedimento.nome}
                                    </h2>
                                    <div className="mt-2 space-y-1 text-sm text-slate-600">
                                        <p><strong>Kits:</strong> {procedimento.kit?.nome}</p>
                                        <p><strong>Paciente:</strong> {procedimento.paciente?.nome}</p>
                                        <p><strong>Médico:</strong> {procedimento.medico?.nome}</p>
                                        <p><strong>Sala:</strong> {procedimento.sala?.numero}</p>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => marcarComoFeito(procedimento.id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                                        procedimento.feito
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : 'bg-slate-900 text-white hover:bg-slate-700'
                                    }`}
                                >
                                    {procedimento.feito ? '✓ Feito' : 'Marcar como feito'}
                                </button>
                            </div>
                        </div>
                    ))}

                    {procedimentos?.length === 0 && (
                    <p className="text-center text-slate-500 py-8">
                        Nenhum procedimento disponível
                    </p>
                )}
                </div>

                
            </div>
        </main>
    );
}