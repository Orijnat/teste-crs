'use client'
import { useEffect, useMemo, useState } from "react";
import TableComponent from "../../components/TableComponent";
import NavBar from "../../layouts/navBar";
import api from "@/utils/axios";
import{ toast } from "react-toastify";

export default function TestePage() {
    const [estaAberto, setEstaAberto] = useState(false);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("incompleta");
    const [tarefaEditando, setTarefaEditando] = useState(null);
    const [listaTarefas, setListaTarefas] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [pagina, setPagina] = useState(1);
    const itensPagina = 5;
    

    const criarIdTarefa = () => {
        return crypto.randomUUID();
    };


    async function getTarefas() {
        try {
        const dados = await api.get('/tarefa/get-all');
        console.log(dados)  
        setListaTarefas(dados.data);
        } catch (error) {
        console.log(error.message)
        }
    }

    useEffect(() => {
        getTarefas()
    }, []);
    



    const colunas = [
        { id: "id", label: "Id", visivel: true },
        { id: "descricao", label: "Descricao", visivel: true },
        { id: "created_at", label: "data de criacao", visivel: true },
        
    ];

    const fecharModal = () => {
        setEstaAberto(false);
        setTarefaEditando(null);
        setNome("");
        setDescricao("");
        setStatus("incompleta");
    };
    

    async function salvarTarefa() {
        try {
            if (tarefaEditando) {
              const dados= await api.patch(`/tarefa/update/${tarefaEditando.id}`, {
                descricao,
              }).map;
            }else{
              const dados = await api.post('/tarefa/create', {
                        descricao,
                        status
                    });
                    setListaTarefas([...listaTarefas, dados.data]);
                    toast.success("Tarefa criada com sucesso!");
            }
            fecharModal();
        } catch (error) {
            console.log(error.message)
            toast.error("Erro ao criar tarefa!");
        }
      }

    async function deletarTarefa(tarefaParaDeletar) {
      try{
        const dados= await api.delete(`/tarefa/deletar/${tarefaParaDeletar.id}`);
        setListaTarefas(listaTarefas.filter(t => t.id !== tarefaParaDeletar.id));
      
      
      } catch (error) {
        console.log(error.message)
      }
    }

    const abrirEdicao = (tarefa) => {
        setTarefaEditando(tarefa);
        setNome(tarefa.nome);
        setDescricao(tarefa.descricao);
        setStatus(tarefa.status);
        setEstaAberto(true);
    };

    const acoes = [
        {
            id: "editar",
            label: "Editar",
            visivel: true,
            onClick: abrirEdicao,
            className: "rounded bg-botao-editar px-4 py-2 text-white transition-colors hover:bg-[#BD4B4B]",
        },
        {
            id: "excluir",
            label: "Excluir",
            visivel: true,
            onClick: deletarTarefa,
            className: "rounded bg-botao-excluir px-4 py-2 text-white transition-colors hover:bg-[#BD4B4B]",
        },
    ];

    const tarefasFiltradas = useMemo(() => {
        const termo = termoBusca.trim().toLowerCase();

        if (!termo) return listaTarefas;

        return listaTarefas.filter((row) =>
            Object.values(row).some((value) => {
                if (value === null || value === undefined) return false;

                if (typeof value === "string") {
                    return value.toLowerCase().includes(termo);
                }

                if (
                    typeof value === "number" ||
                    typeof value === "boolean" ||
                    value instanceof Date
                ) {
                    return String(value).toLowerCase().includes(termo);
                }

                return false;
            })
        );
    }, [listaTarefas, termoBusca]);

    const totalPaginas = Math.max(1, Math.ceil(tarefasFiltradas.length / itensPagina));
    const paginaExibida = Math.min(pagina, totalPaginas);
    const fimPagina = paginaExibida * itensPagina;
    const inicioPagina = fimPagina - itensPagina;
    const tarefasExibidas = tarefasFiltradas.slice(inicioPagina, fimPagina);

    return (
        <main className="min-h-screen w-full bg-fundo-pagina">
            <NavBar
                itensMenu={[
                    { href: "/", label: "Home", ativo: true },
                ]}
            />

            <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
                <TableComponent
                    colunas={colunas}
                    acoes={acoes}
                    dados={tarefasExibidas}
                    termoBusca={termoBusca}
                    setTermoBusca={setTermoBusca}
                    setEstaAberto={setEstaAberto}
                    abrirEdicao={abrirEdicao}
                    deletarTarefa={deletarTarefa}
                    pagina={paginaExibida}
                    setPagina={setPagina}
                    totalPaginas={totalPaginas}
                />
            </div>

            {estaAberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={fecharModal}
                    />

                    <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-modal-fundo p-6 text-black shadow-2xl transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-black">
                                {tarefaEditando ? "Editar Tarefa" : "Nova Tarefa"}
                            </h3>
                            <button
                                type="button"
                                onClick={fecharModal}
                                className="rounded-full p-1 text-gray-700 hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-2 text-black">
                            <p>Digite o nome da sua tarefa</p>
                            <input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                type="text"
                                className="w-full border p-2 mt-2 rounded"
                                placeholder="Nome da tarefa"
                            />
                        </div>

                        <div className="mt-2 text-black">
                            <p>Descricao</p>
                            <input
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                type="text"
                                className="w-full border p-2 mt-2 rounded"
                                placeholder="Descricao da tarefa"
                            />
                        </div>

                        <div className="flex p-1 mx-3 rounded-xl w-fit bg-fundo-pagina mt-4">
                            <div className="mt-4">
                                <p className="text-sm font-medium text-black mb-3">Status da Tarefa:</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <label className="relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-azul-aco border-gray-900 has-checked:border-red-600 has-checked:bg-modal-fundo group">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="incompleta"
                                            checked={status === "incompleta"}
                                            onChange={() => setStatus("incompleta")}
                                            className="sr-only"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-5 h-5 rounded-full border-2 border-black group-has-checked:border-red-600 group-has-checked:bg-red-600 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-black shadow-sm" />
                                            </div>
                                            <span className="text-sm font-semibold text-black group-has-checked:text-red-700">Incompleta</span>
                                        </div>
                                    </label>

                                    <label className="relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-azul-aco border-gray-900 has-checked:border-green-600 has-checked:bg-modal-fundo group">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="concluida"
                                            checked={status === "concluida"}
                                            onChange={() => setStatus("concluida")}
                                            className="sr-only"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-5 h-5 rounded-full border-2 border-black group-has-checked:border-green-600 group-has-checked:bg-green-600 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-black shadow-sm" />
                                            </div>
                                            <span className="text-sm font-semibold text-black group-has-checked:text-green-700">Concluída</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={salvarTarefa}
                                className="px-3 py-1.5 text-xs font-medium text-black bg-botao-confirmar rounded-md shadow-md w-fit"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
