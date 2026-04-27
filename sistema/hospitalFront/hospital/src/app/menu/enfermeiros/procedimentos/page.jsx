'use client';

import { useState } from 'react';
import NavBar from "../../../../layouts/NavBar";

export default function ProcedimentosPage() {
    const [procedimentos, setProcedimentos] = useState([
        {
            id: 1,
            nome: "Injeção intravenosa",
            kits: "Kit IV",
            paciente: "Paciente 001",
            medico: "Dr. Silva",
            sala: "Sala 101",
            feito: false
        },
        {
            id: 2,
            nome: "Curativo de ferida",
            kits: "Kit Curativos",
            paciente: "Paciente 002",
            medico: "Dra. Santos",
            sala: "Sala 102",
            feito: false
        },
        {
            id: 3,
            nome: "Verificação de pressão",
            kits: "Esfigmomanômetro",
            paciente: "Paciente 003",
            medico: "Dr. Costa",
            sala: "Sala 103",
            feito: false
        }
    ]);

    const marcarComoFeito = (id) => {
        setProcedimentos(procedimentos.map(proc =>
            proc.id === id ? { ...proc, feito: !proc.feito } : proc
        ));
    };

    return (
        <main className="flex min-h-screen bg-slate-200 px-4 py-6 text-slate-900">
            <NavBar
              itensMenu={[
                { href: "/menu/enfermeiros", label: "Home", ativo: true },
                { href: "/menu/enfermeiros/triagem", label: "Triagem", ativo: false },
                { href: "/menu/enfermeiros/kits", label: "Kits", ativo: false}
              ]}
            />
            
            <div className="w-full max-w-4xl mx-auto rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
                <h1 className="text-2xl font-semibold mb-6">Procedimentos</h1>
                
                <div className="space-y-4">
                    {procedimentos.map((procedimento) => (
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
                                        <p><strong>Kits:</strong> {procedimento.kits}</p>
                                        <p><strong>Paciente:</strong> {procedimento.paciente}</p>
                                        <p><strong>Médico:</strong> {procedimento.medico}</p>
                                        <p><strong>Sala:</strong> {procedimento.sala}</p>
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
                </div>

                {procedimentos.length === 0 && (
                    <p className="text-center text-slate-500 py-8">
                        Nenhum procedimento disponível
                    </p>
                )}
            </div>
        </main>
    );
}