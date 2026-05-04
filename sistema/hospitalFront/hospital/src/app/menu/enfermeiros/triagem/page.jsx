'use client';
import NavBar from "../../../../layouts/NavBar";
import { useState } from "react";
import api from "@/utils/api";

export default function TriagemPage() {

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");
    const [sintomas, setSintomas] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idEnfermeiro, setIdEnfermeiro] = useState("");

    const criarPaciente = async () => {
        const respostaPaciente = await api.post('/pacientes/create', {
            nome,
            idade: Number(idade),
            altura: Number(altura),
            peso: Number(peso),
            email,
            passwordHash: password, // Bate com a coluna "passwordHash" da tabela "Paciente"
        });

        const pacienteId = respostaPaciente.data?.data?.id ?? respostaPaciente.data?.id;

        if (!pacienteId) {
            throw new Error("A API não retornou o id do paciente recém-criado.");
        }

        return pacienteId;
    };

    const criarDoenca = async () => {
        const respostaDoenca = await api.post("/doenca/create", {
            descricao: sintomas, // Bate com a coluna "descricao" da tabela "doencas"
        });

        const doencaId = respostaDoenca.data?.data?.id ?? respostaDoenca.data?.id;

        if (!doencaId) {
            throw new Error("A API não retornou o id da doença recém-criada.");
        }

        return doencaId;
    };

    const vincularPacienteDoenca = async (pacienteId, doencaId) => {
        await api.post("/pacienteDoenca/create", {
            idPaciente: pacienteId,
            idDoenca: doencaId,
        });
    };

    const criarTriagem = async (pacienteId, doencaId) => {
        if (!idEnfermeiro) {
            throw new Error("Informe o ID do enfermeiro para criar a triagem.");
        }

        await api.post("/triagem/create", {
            paciente_id: pacienteId,
            doenca_id: doencaId,
            idPaciente: pacienteId,
            idDoenca: doencaId,
            idEnfermeiro: Number(idEnfermeiro),
            data: new Date().toISOString(),
        });
    };

    const limparCampos = () => {
        setNome("");
        setIdade("");
        setAltura("");
        setPeso("");
        setSintomas("");
        setEmail("");
        setPassword("");
    };

    const finalizarTriagem = async (event) => {
        event.preventDefault();

        // Validação básica para evitar requisições nulas no banco
        if (!nome || !email || !sintomas || !idade || !altura || !peso) {
            alert("Por favor, preencha todos os campos obrigatórios da triagem.");
            return;
        }

        try {
            const pacienteId = await criarPaciente();
            const doencaId = await criarDoenca();

            await vincularPacienteDoenca(pacienteId, doencaId);
            await criarTriagem(pacienteId, doencaId);

            limparCampos();

            alert("Triagem finalizada e integrada ao banco com sucesso!");
            console.log("Processo finalizado:", { pacienteId, doencaId });
            
        } catch (error) {
            console.error("Erro ao finalizar triagem:", error?.response?.data || error);
            alert(error?.response?.data?.message || error.message || "Erro ao processar triagem. Verifique o console para mais detalhes.");
        }
    };


    return (
        <main className="flex min-h-screen items-center justify-center bg-fundo-das-paginas px-4 text-slate-900">
            <NavBar
            ativo= {true}
                itensMenu={[
                { href: "/menu/enfermeiros", label: "Home", ativo: true },
                { href: "/menu/enfermeiros/procedimentos", label: "Procedimentos", ativo: false},
                { href: "/menu/enfermeiros/kits", label: "Kits", ativo: false},
                { href: "/menu/enfermeiros/medicamentos", label: "Medicamentos", ativo: false}
                ]}
            />
            
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
                <h1 className="text-2xl font-semibold">Triagem</h1>
                
                <form className="mt-6 space-y-4" onSubmit={finalizarTriagem}>
                    <div>
                        <label htmlFor="nome" className="mb-1 block text-sm font-medium"> </label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome do paciente"
                            autoComplete="name"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor="idade" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="idade"
                            type="number"
                            value={idade}
                            onChange={(e) => setIdade(e.target.value)}
                            placeholder="Idade do paciente"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor= "altura" className= "mb-1 block text-sm font-medium mt-4"></label>
                        <input
                            id="altura"
                            type="number"
                            step="0.01" // Permite decimais como 1.75 para dar match com o 'double precision' do DB
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                            placeholder="Altura (ex: 1.75)"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor= "peso" className= "mb-1 block text-sm font-medium mt-4"></label>
                        <input
                            id="peso"
                            type="number"
                            step="0.01" // Permite decimais para dar match com o 'double precision' do DB
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            placeholder="Peso em Kg"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor="sintomas" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="sintomas"
                            type="text"
                            value={sintomas}
                            onChange={(e) => setSintomas(e.target.value)}
                            placeholder="Sintomas apresentados"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                        <label htmlFor="email" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email do paciente"
                            autoComplete="email"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                        <label htmlFor="password" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha do paciente"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />

                        <label htmlFor="idEnfermeiro" className="mb-1 block text-sm font-medium mt-4"> </label>
                        <input
                            id="idEnfermeiro"
                            type="number"
                            value={idEnfermeiro}
                            onChange={(e) => setIdEnfermeiro(e.target.value)}
                            placeholder="ID do enfermeiro"
                            autoComplete="off"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                        />
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700 mt-6"
                        >
                            Finalizar Triagem
                        </button>
                    </div>
            </form>
            </div>
            
        </main>
    ); 
}