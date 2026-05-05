'use client';

import { useState } from 'react';

export default function EsqueciSenhaPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setMessageType('');

        if (!email.trim()) {
            setMessage('Informe seu e-mail para continuar.');
            setMessageType('error');
            return;
        }

        try {
            setLoading(true);

            setMessage('Se o e-mail estiver cadastrado, você receberá as instruções para redefinir a senha.');
            setMessageType('success');
            setEmail('');
        } catch (error) {
            setMessage(error?.message || 'Não foi possível processar a solicitação.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_transparent_45%),linear-gradient(180deg,_#cbd5e1_0%,_#e2e8f0_100%)] px-4 text-slate-900">
            <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.14)] backdrop-blur">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Sistema Hospitalar</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Esqueci minha senha</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Informe seu e-mail e enviaremos as instruções para redefinir sua senha.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="voce@hospital.com"
                            autoComplete="email"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    {message ? (
                        <p
                            className={`rounded-xl border px-4 py-3 text-sm ${messageType === 'success'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-rose-200 bg-rose-50 text-rose-700'
                                }`}
                        >
                            {message}
                        </p>
                    ) : null}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? 'Enviando...' : 'Enviar instruções'}
                    </button>
                </form>
            </div>
        </main>
    );
}