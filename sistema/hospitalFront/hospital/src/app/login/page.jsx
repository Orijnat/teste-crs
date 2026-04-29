'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setMessageType('');

        if (!email.trim() || !password.trim()) {
            setMessage('Informe e-mail e senha para continuar.');
            setMessageType('error');
            return;
        }

        try {
            setLoading(true);
            const response = await api.post('/usuario/login', {
                email,
                password,
            });

            const token = response.data?.data;

            if (!token) {
                throw new Error('A API não retornou um token válido.');
            }

            localStorage.setItem('hospital-token', token);
            setMessage('Login realizado com sucesso.');
            setMessageType('success');
            router.push('/menu/pacientes');
        } catch (error) {
            const apiMessage = error?.response?.data?.message;
            setMessage(apiMessage || error.message || 'Não foi possível acessar a API.');
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
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Entrar</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Acesse o sistema com seu e-mail e senha para falar com a API do backend.</p>
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

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Sua senha"
                            autoComplete="current-password"
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

                    <p className="text-sm text-slate-500">
                        Esqueceu sua senha?{' '}
                        <a href="/login/cadastro" className="font-medium text-slate-900 underline hover:text-slate-700">
                            Clique aqui
                        </a>
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </main>
    );
}