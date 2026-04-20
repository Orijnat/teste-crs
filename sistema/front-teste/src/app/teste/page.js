'use client'
import { useState } from "react";
import TableComponent from "../../components/TableComponent";
import NavBar from "../../layouts/navBar";


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

    const fecharModal = () => {
    setEstaAberto(false);
    setTarefaEditando(null);
    setNome("");
    setDescricao("");
    setStatus("incompleta");
    };

    const salvarTarefa = () => {
        if (tarefaEditando) {

        setListaTarefas(listaTarefas.map((tarefa) => 
            tarefa.nome === tarefaEditando.nome && 
            tarefa.descricao === tarefaEditando.descricao && 
            tarefa.status === tarefaEditando.status
            ? { nome, descricao, status }
            : tarefa
        ));

        } else {
        const novaTarefa = {
            nome,
            descricao,
            status,
        };
        setListaTarefas([...listaTarefas, novaTarefa]);
        }
        fecharModal();
    };

    const abrirEdicao = (tarefa) => {
        setTarefaEditando(tarefa);
        setNome(tarefa.nome);
        setDescricao(tarefa.descricao);
        setStatus(tarefa.status);
        setEstaAberto(true);
    };

    const deletarTarefa = (tarefaParaDeletar) => {
        setListaTarefas(listaTarefas.filter((tarefa) => 
        !(tarefa.nome === tarefaParaDeletar.nome && 
            tarefa.descricao === tarefaParaDeletar.descricao && 
            tarefa.status === tarefaParaDeletar.status)
        ));
    };

    const tarefasFiltradas = listaTarefas.filter((tarefa) =>
        tarefa.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        tarefa.descricao.toLowerCase().includes(termoBusca.toLowerCase())
    );

    const fimPagina = pagina * itensPagina;
    const inicioPagina = fimPagina - itensPagina;
    const totalPaginas = Math.ceil(listaTarefas.length / itensPagina);

    const tarefasExibidas = tarefasFiltradas.slice(inicioPagina, fimPagina);

  return (
    <>
      <NavBar />

      <TableComponent 
        titulo="Tarefas"
        dados={listaTarefas}
        termoBusca={termoBusca}
        setTermoBusca={setTermoBusca}
                setEstaAberto={setEstaAberto}
        abrirEdicao={abrirEdicao}
                deletarTarefa={deletarTarefa}
                pagina={pagina}
                setPagina={setPagina}
                totalPaginas={totalPaginas}
      />

      {estaAberto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={fecharModal}
                />

                <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-[#F2EBBF] p-6 shadow-2xl transition-all text-black">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-black">
                            {tarefaEditando ? "Editar Tarefa" : "Nova Tarefa"}
                        </h3>
                        <button
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

                <div className="flex p-1 mx-3 rounded-xl w-fit bg-[#F2EBBF]">
                    <div className="mt-4">
                        <p className="text-sm font-medium text-black mb-3">Status da Tarefa:</p>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-600 border-gray-900 has-checked:border-red-600 has-checked:bg-[#F3B562] group">
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

                            <label className="relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-600 border-gray-900 has-checked:border-green-600 has-checked:bg-[#F3B562] group">
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
                        onClick={salvarTarefa}
                        className="px-3 py-1.5 text-xs font-medium text-black bg-[#F06060] hover:bg-[#BD4B4B] rounded-md shadow-md w-fit"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
      
      
      )}
    </>
  );
}