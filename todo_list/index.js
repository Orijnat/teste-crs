document.addEventListener('DOMContentLoaded', () =>{
    const tabela= document.getElementById('tabela')
    const form= document.getElementById('formulario')
    const teste= document.getElementById('TESTE')
    const dados = [];


    function addTarefa(taskName, taskDesc, prioridade, data, i){

    const tr= document.createElement('tr')
    tr.innerHTML= `
    <td>${taskName}</td>
    <td>${taskDesc} </td>
    <td>${prioridade}</td>
    <td>${data}</td>
    <td>
        <button id="concluido" type="button" class="btn btn-success" onclick= "" >Marcar como concluido </button>
        <button id="excluir" type="button" class="btn btn-danger" onclick= "" data-index="${i}"> Excluir </button>
    </td>
    `;
    tabela.appendChild(tr);
    
    }




        function criarRegistro(taskName, taskDesc,prioridade, data) {
            const novoRegistro = { taskName: taskName, taskDesc: taskDesc, prioridade: prioridade, data: data};
                dados.push(novoRegistro)
            atualizar()
        }




    form.addEventListener("submit", (evento) =>{
        evento.preventDefault();

        const taskName= document.getElementById('taskName').value.trim();
        const taskDesc= document.getElementById('taskDesc').value.trim();
        const prioridade= document.getElementById('Prioridade').value.trim();
        const data= document.getElementById('data').value.trim();
        alert("dados enviados com sucesso");


        criarRegistro(taskName, taskDesc, prioridade, data);
})


        


    function atualizar() {
        form.reset()
        tabela.innerHTML= `
            <th>
                Nome da tarefa
            </th>

            <th>
                Descricao da Tarefa
            </th>
            
            <th>
                Prioridade
            </th>
            
            <th>
                Data de Criaçao
            </th>

            <th>
                Ações
            </th>      
        `
        dados.forEach((a, i) => {
            addTarefa(a.taskName, a.taskDesc, a.prioridade, a.data)
        })

        function deletar(i) {
        dados.splice(i, 1);
        atualizar();
    }
    }
})

