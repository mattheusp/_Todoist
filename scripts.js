const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
  if (input.value.trim() !== '') {
    minhaListaDeItens.push({
      tarefa: input.value,
      concluida: false,
    })
    input.value = ''
    mostrarTarefas()
  }
}

function mostrarTarefas() {
  let novaLi = ''
  minhaListaDeItens.forEach((item, posicao) => {
    novaLi +=
      `
       <li class="task">
          <img src="./img/icons8-ok-48.png" alt="tarefa-concluida" onclick="concluirTarefa(${posicao})" ${item.concluida ? 'style="opacity: 0.5;"' : ''}>
          <p>${item.tarefa}</p>
          <img src="./img/icons8-remove-96.png" alt="remover-tarefa" onclick="deletarItem(${posicao})">
       </li>
      `
  })
  listaCompleta.innerHTML = novaLi
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
  mostrarTarefas()
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)
  mostrarTarefas()
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')
  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }
  mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)
