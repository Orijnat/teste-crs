document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById('tabela');
    const form = document.getElementById('formulario');
    const form1 = document.getElementById('formulario1');
    const dados = JSON.parse(localStorage.getItem('tarefas')) || [];
    let indexEdicao = null;


    function addTarefa(taskName, taskDesc, prioridade, data, i) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${taskName}</td>
            <td>${taskDesc}</td>
            <td>${prioridade}</td>
            <td>${data}</td>
            <td>
                <button type="button" class="btn btn-warning btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal" data-index="${i}">Editar</button>
                <button type="button" class="btn btn-success btn-concluido" data-index="${i}">Marcar como concluido</button>
                <button type="button" class="btn btn-danger btn-excluir" data-index="${i}">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    }

    function atualizar() {
        form.reset();
        form1.reset();
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

        salvar();

        
    }

    function criarRegistro(taskName, taskDesc, prioridade, data) {
        const novoRegistro = { taskName, taskDesc, prioridade, data };
        dados.push(novoRegistro);
        atualizar();
    }

    function editarRegistro(editName, editDesc, editPrioridade, editData, i) {
        if (i === null || i === undefined || i < 0 || i >= dados.length) return;
        dados[i] = { taskName: editName, taskDesc: editDesc, prioridade: editPrioridade, data: editData };
        atualizar();
        indexEdicao = null;
    }

    function deletar(i) {
        dados.splice(i, 1);
        atualizar();
    }

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const taskName = document.getElementById('taskName').value.trim();
        const taskDesc = document.getElementById('taskDesc').value.trim();
        const prioridade = document.getElementById('Prioridade').value.trim();
        const data = document.getElementById('data').value.trim();

        if (!taskName || !taskDesc || !prioridade || !data) {
            alert('Preencha todos os campos.');
            return;
        }

        criarRegistro(taskName, taskDesc, prioridade, data);
        alert('Tarefa adicionada com sucesso!');
    });

    tabela.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('btn-excluir')) {
            const index = Number(evento.target.getAttribute('data-index'));
            deletar(index);
            return;
        }

        if (evento.target.classList.contains('btn-editar')) {
            indexEdicao = Number(evento.target.getAttribute('data-index'));
            const tarefa = dados[indexEdicao];
            if (tarefa) {
                document.getElementById('editName').value = tarefa.taskName;
                document.getElementById('editDesc').value = tarefa.taskDesc;
                document.getElementById('editPrioridade').value = tarefa.prioridade;
                document.getElementById('editdata').value = tarefa.data;
            }
        }
    });

    form1.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (indexEdicao === null) {
            alert('Selecione uma tarefa para editar.');
            return;
        }

        const editName = document.getElementById('editName').value.trim();
        const editDesc = document.getElementById('editDesc').value.trim();
        const editPrioridade = document.getElementById('editPrioridade').value.trim();
        const editData = document.getElementById('editdata').value.trim();

        if (!editName || !editDesc || !editPrioridade || !editData) {
            alert('Preencha todos os campos no modal.');
            return;
        }

        editarRegistro(editName, editDesc, editPrioridade, editData, indexEdicao);

        const modalEl = document.getElementById('exampleModal');
        const bsModal = bootstrap.Modal.getInstance(modalEl);
        if (bsModal) bsModal.hide();

        alert('Tarefa editada com sucesso!');
    });

    function salvar(){
        localStorage.setItem('tarefas', JSON.stringify(dados))
        localStorage.getItem('tarefas', JSON.parse(dados))
    }
});

localStorage.setItem('testando', JSON.stringify({ teste: 'teste' }));
JSON.parse(localStorage.getItem('testando'));
