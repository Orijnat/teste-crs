export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-200 px-4 text-slate-900">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
                <h1 className="text-2xl font-semibold">Entrar</h1>
                <p className="mt-1 text-sm text-slate-500">Acesse o sistema com seu e-mail e senha.</p>

                <form className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="voce@hospital.com"
                            autoComplete="email"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Sua senha"
                            autoComplete="current-password"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </main>
    );
}