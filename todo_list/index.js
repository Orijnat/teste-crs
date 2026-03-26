document.addEventListener('DOMContentLoaded', () =>{
    const tabela= document.getElementById('tabela')
    const form= document.getElementById('formulario')
    const teste= document.getElementById('teste')
    const dados = [];


    function addTarefa(taskName, taskDesc, prioridade, data, i){
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${taskName}</td>
            <td>${taskDesc}</td>
            <td>${prioridade}</td>
            <td>${data}</td>
            <td>
                <button type="button" class="btn btn-success btn-concluido" data-index="${i}">Marcar como concluido</button>
                <button type="button" class="btn btn-danger btn-excluir" data-index="${i}">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    }

    teste.addEventListener('click', () => {
        dados.forEach((a) => {
            console.log(`Tarefa: ${a.taskName}, Descrição: ${a.taskDesc}, Prioridade: ${a.prioridade} data:${a.data}`);
        });
    })



    function criarRegistro(taskName, taskDesc, prioridade, data) {
        const novoRegistro = { taskName: taskName, taskDesc: taskDesc, prioridade: prioridade, data: data};
        dados.push(novoRegistro);
        atualizar();
    }

    function deletar(i) {
        dados.splice(i, 1);
        atualizar();
    }

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const taskName = document.getElementById('taskName').value.trim();
        const taskDesc = document.getElementById('taskDesc').value.trim();
        const prioridade = document.getElementById('Prioridade').value.trim();
        const data = document.getElementById('data').value.trim();
        alert("dados enviados com sucesso");

        criarRegistro(taskName, taskDesc, prioridade, data);
    })


    tabela.addEventListener('click', (evento) => {
        if(evento.target.classList.contains('btn-excluir')) {
            const index = evento.target.getAttribute('data-index');
            deletar(index);
        }
    })


    function atualizar() {
        form.reset();
        tabela.innerHTML = `
            <th>Nome da tarefa</th>
            <th>Descricao da Tarefa</th>
            <th>Prioridade</th>
            <th>Data de Criaçao</th>
            <th>Ações</th>
        `;
        dados.forEach((a, i) => {
            addTarefa(a.taskName, a.taskDesc, a.prioridade, a.data, i);
        });
    }
})

