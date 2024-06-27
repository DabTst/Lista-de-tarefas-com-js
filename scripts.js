'use strict'

/*let banco = [
    {"task": "Estudar Js", "status": " "},
    {"task": "Comer", "status": "checked"}
]*/

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco)) 

//criar item novo-nova tarefa
const criarItem = (task, status, indice) =>{
    const item = document.createElement('label')
    item.classList.add('todo-item');
    item.innerHTML= `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div> ${task}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

//limpar tarefa
const cleanTask = () => {
    const todoList = document.getElementById("todoList")
    while( todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

//actualizar tela depois de criar nova tarefa
const updateScreen = () => {
    cleanTask()
    const banco = getBanco()
    banco.forEach((item, indice) => criarItem(item.task, item.status, indice))
}

//inserir tarefa com tecla Enter
const insertItem = (evento) =>{
    const keybord = evento.key;
    const Text = evento.target.value
    if( keybord === 'Enter'){
        const banco = getBanco()
        banco.push({'task': Text, 'status': ''})
        setBanco(banco)
        updateScreen()
        evento.target.value = " ";
    }
}

//remover tarefa
const removeItem = (indice) => {
    const banco =getBanco()
    banco.splice(indice, 1);
    setBanco(banco)
    updateScreen()
}

//verificar se tarefa foi concluida
const updateItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco [indice].status=== ``? 'checked' : ``;
    setBanco(banco)
    updateScreen()

}
const clickItem =(evento)=>{
    const elements =evento.target
    if(elements.type === 'button'){
        const indice = elements.dataset.indice;
        removeItem(indice)
    } else if( elements.type === 'checkbox' ){
        const indice = elements.dataset.indice
        updateItem(indice)
    }
}
document.getElementById('newItem').addEventListener('keypress', insertItem)
document.getElementById("todoList").addEventListener("click", clickItem)

//Chamada para actualizar indice
updateScreen()