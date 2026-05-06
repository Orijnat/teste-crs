'use client';
import NavBar from "../../../../layouts/NavBar";
import { useState } from "react";
import api from "@/utils/api";
import TriagemForm from "../../../../layouts/triagemFrom";

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
                <div className= "mt-4">
            <button
                type="button"
                onClick={() => (window.location.href = "/menu/enfermeiros/triagem/vertriagens")}
                className="ml-4 whitespace-nowrap rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
            >
                Ver triagens Realizadas
            </button>
        </div>
                
                <TriagemForm
                    nome={nome}
                    setNome={setNome}
                    idade={idade}
                    setIdade={setIdade}
                    altura={altura}
                    setAltura={setAltura}
                    peso={peso}
                    setPeso={setPeso}
                    sintomas={sintomas}
                    setSintomas={setSintomas}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    idEnfermeiro={idEnfermeiro}
                    setIdEnfermeiro={setIdEnfermeiro}
                    finalizarTriagem={finalizarTriagem}
                />
            </div>
            
        </main>
    ); 
}