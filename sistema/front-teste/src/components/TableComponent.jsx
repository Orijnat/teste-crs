import { useState } from "react";


export default function TableComponent({

    
    dados,
    termoBusca,
    setTermoBusca,
    abrirEdicao,
    setEstaAberto,
    deletarTarefa,
    pagina,
    setPagina,
    totalPaginas,
    titulo
})


{   

    return(

            <main className="w-screen h-screen bg-[#F2EBBF] flex flex-col items-center justify-center">  
            <div className="max-w-4xl mx-auto px-6 py-8 bg-[#F3B562]  rounded-3xl overflow-hidden mt-8">
        
            <h1 className="text-center text-2xl font-bold py-2 text-black">Tabela de dados</h1>
            
            <div className="flex flex-col items-center justify-center p-4">
                <button
                onClick={() => setEstaAberto(true)}
                className="border-solid mb-10 bg-[#F06060] hover:bg-[#BD4B4B] text-black px-4 py-2 overflow-hidden rounded-3xl border border-gray-300 shadow-xl"
                >Criar Nova Tarefa
                </button>
                <form className="mb-5 bg-gray-300 w-full rounded">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border p-2 rounded text-black"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
                </form>
            </div>

            <table className="w-full border-collapse border-spacing-0 rounded-3xl overflow-hidden shadow-lg">
                <thead className="bg-[#5C4B51] text-black">
                    <tr>
                        <th className="w-1/6 px-4 py-3 text-left">Tarefa</th>
                        <th className="w-2/6 px-4 py-3 text-left">Descrição</th>
                        <th className="w-1/6 px-4 py-3 text-left">Estado Atual</th>
                        <th className="w-2/6 px-4 py-3 text-left">Ações</th>
                    </tr>
                </thead>

                <tbody className="bg-[#F2EBBF] text-black">
                    {dados.map((tarefa, index) => (
                        <tr key={index} className=" ">
                            <td className="w-1/6 px-4 py-3 text-center">{tarefa.nome}</td>
                            <td className="w-2/6 px-4 py-3">{tarefa.descricao}</td>
                            <td className="w-1/6 px-4 py-3 capitalize">{tarefa.status}</td>
                            <td className="w-2/6 px-4 py-3 flex gap-2">

                                <button onClick={() => abrirEdicao(tarefa)} className="bg-[#F06060] hover:bg-[#BD4B4B] text-black px-4 py-2 rounded">
                                    Editar
                                </button>
                                <button onClick={() => deletarTarefa(tarefa)} className="bg-[#F06060] hover:bg-[#BD4B4B] text-black px-4 py-2 rounded ms-4">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col items-center justify-center p-4">
                <div className="overflow-hidden rounded-2xl">
                        <div className= "flex items-center justify-between mt-4 w-full px-2">
                            {pagina > 1 && (
                            <button type='button' 
                                onClick={ () => setPagina(prev => Math.max(prev-1, 1))}
                                disabled={pagina === 1}
                                className="bg-[#8CBEB2] hover:bg-blue-200 text-black font-bold py-2 px-4 rounded mt-6 me-4">
                                Pagina Anterior
                            </button>
                            )}

                            <span className="text-sm text-black">
                                Página {pagina} de {totalPaginas || 1}
                            </span>
                            
                            {pagina < totalPaginas && (
                            <button type='button' 
                                onClick={ () => setPagina(prev => Math.min(prev+1, totalPaginas))}
                                disabled={pagina === totalPaginas || totalPaginas === 0}
                                className="bg-[#8CBEB2] hover:bg-blue-200 text-black font-bold py-2 px-4 rounded mt-6 ms-4">
                                Proxima Pagina
                            </button>
                            )}
                        </div>
                    </div>
                    </div>
            </div>    
    </main>
    
)
}