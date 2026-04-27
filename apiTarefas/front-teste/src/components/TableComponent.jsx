export default function TableComponent({
    titulo = "Tabela de dados",
    dados,
    colunas,
    acoes,
    termoBusca,
    setTermoBusca,
    abrirEdicao,
    setEstaAberto,
    deletarTarefa,
    pagina,
    setPagina,
    totalPaginas,
}) {
    const acoesVisiveis = acoes?.filter((acao) => acao.visivel !== false) ?? [];

    const acoesPadrao = [
        {
            id: "editar",
            label: "Editar",
            onClick: abrirEdicao,
            className: "rounded bg-botao-editar px-4 py-2 text-white transition-colors hover:bg-[#BD4B4B]",
            type: "button",
        },
        {
            id: "excluir",
            label: "Excluir",
            onClick: (dados) => deletarTarefa(dados),
            className: "rounded bg-botao-excluir px-4 py-2 text-white transition-colors hover:bg-[#BD4B4B]",
            type: "button",
        },
    ].filter((acao) => typeof acao.onClick === "function");

    const acoesRenderizadas = acoesVisiveis.length > 0 ? acoesVisiveis : acoesPadrao;

    return (
        <section className="w-full shadow-lg shadow-black/10">
            <div className="mx-auto w-full max-w-6xl rounded-3xl bg-fundo-pagina px-4 py-5 shadow-xl sm:px-6 sm:py-6 lg:px-8">
                <h1 className="text-center text-2xl font-bold text-textos">{titulo}</h1>

                <div className="mt-5 flex flex-col items-center gap-4">
                    <button
                        onClick={() => setEstaAberto(true)}
                        className="rounded-3xl border border-gray-300 bg-botao-criar px-4 py-2 text-white shadow transition-colors hover:bg-[#BD4B4B]"
                    >
                        Adicionar Tarefa
                    </button>

                    <form className="w-full rounded bg-[#f3f0db] border-[#F3B562]">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded border p-2 text-textos"
                            value={termoBusca}
                            onChange={(e) => {
                                setTermoBusca(e.target.value);
                                setPagina(1);
                            }}
                        />
                    </form>
                </div>

                <div className="mt-4 w-full overflow-x-auto rounded-2xl bg-fundo-tabela shadow-lg">
                    <table className="min-w-full w-full border-collapse border-spacing-0">
                        <thead className="bg-azul-unochapeco text-white">
                            <tr>
                                {colunas.map((col) => (
                                    <th key={col.id} className="px-4 py-3 text-left text-sm font-semibold sm:px-6">
                                        {col.label}
                                    </th>
                                ))}
                                {acoesRenderizadas.length > 0 && (
                                    <th className="px-4 py-3 text-left text-sm font-semibold sm:px-6">Opções</th>
                                )}
                            </tr>
                        </thead>

                        <tbody className="bg-fundo-tabela text-black">
                            {dados.map((tarefa, index) => (
                                <tr key={tarefa.id ?? tarefa._id ?? index} className="border-t border-black/10">
                                    {colunas.map((col) => (
                                        <td key={col.id} className="px-4 py-3 align-top sm:px-6">
                                            {tarefa[col.id]}
                                        </td>
                                    ))}

                                    {acoesRenderizadas.length > 0 && (
                                        <td className="px-4 py-3 sm:px-6">
                                            <div className="flex flex-wrap gap-2">
                                                {acoesRenderizadas.map((acao) => (
                                                    <button
                                                        key={acao.id}
                                                        type={acao.type ?? "button"}
                                                        onClick={() => acao.onClick(tarefa)}
                                                        className={acao.className ?? "rounded px-4 py-2 text-white transition-colors"}
                                                    >
                                                        {acao.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5 flex justify-center">
                    <div className="w-full max-w-2xl rounded-2xl bg-white/20 px-3 py-3">
                        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
                                disabled={pagina === 1}
                                className="rounded bg-botao-setas px-4 py-2 font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Pagina Anterior
                            </button>

                            <span className="text-sm text-escrita-input">
                                Pagina {pagina} de {totalPaginas || 1}
                            </span>

                            <button
                                type="button"
                                onClick={() => setPagina((prev) => Math.min(prev + 1, totalPaginas))}
                                disabled={pagina === totalPaginas || totalPaginas === 0}
                                className="rounded bg-botao-setas px-4 py-2 font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Proxima Pagina
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
