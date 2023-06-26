const newTask = document.querySelector('.newTask');
const btnNewTask = document.querySelector('.btnAddTask');
const tasks = document.querySelector('.tasks')

function createList(){ // Função para criar elemento list
    const li = document.createElement('li')
    return li
}

function cleanInput(){ //Função para limpar o Input
    newTask.value = ''
    newTask.focus();
}

function createDeleteBtn(li){ //Função para criar o Botão de delete junto com a tarefa na list
    li.innerText += '';
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete'
    deleteBtn.setAttribute('class','apagar') //Seta a class apagar no botão criado
    li.appendChild(deleteBtn); //Adiciona ele a lista
}

function createTask(textInput){ //Função para criar a task
    const li = createList(); // li vai receber a função de criar o elemento li
    li.innerText = textInput; //texto do li, vai receber o texto passado como parementro
    tasks.appendChild(li); // e vai adicionar a li ao elemento ul
    createDeleteBtn(li); //Chama a função para criar o botão de delete passando a lista como parametro
    cleanInput(); //Limpa o form
    saveTasks(); //Salva a task na localStorage
}

function saveTasks(){ //Função para salvar as taks
    const liTasks = tasks.querySelectorAll('li'); //Seleciona todas as tarefas da classe tasks
    const listTasks = [];

    for(let task of liTasks){
        let textTask = task.innerText
        textTask = textTask.replace('Delete', '').trim(); //Retira o texto delete do Button e tira o espaço em branco sobrando
        listTasks.push(textTask) //Adiciona a textTask ao array criado
    }

    const tasksJson = JSON.stringify(listTasks); //Transfoma o array em String JSON
    localStorage.setItem('tasks', tasksJson) //Salva os textos na localStorage do navegador
}

document.addEventListener('click', function(e){ //Função para apagar o elemento
    const el = e.target

    if(el.classList.contains('apagar')){ 
        el.parentElement.remove(); //Verifica qual é o pai do elemento e remove ele
        saveTasks();//chamamos para apagar a tarefa salva
    }
})

function loadTasks(){ //Função para carregar as tasks salvas
    const tasks = localStorage.getItem('tasks')//Obtem as tasks no LocalStorage do Navegador
    const tasksList = JSON.parse(tasks); //Converte para Objeto JS novamente
    
    for(let task in tasksList){ //Pega o valor da task na taskList
        createTask(taskList[task]);
    }
}
loadTasks();

newTask.addEventListener('keypress', function(e){ //Função para criar task ao pressionar enter
    if(e.keyCode === 13){
        if(!newTask.value) return; //Se valor for vazio, não executa a função
        createTask(newTask.value)
    }
})

btnNewTask.addEventListener('click', function(){ //Função para criar task ao clicar no botão add
    if(!newTask.value) return; //Se valor for vazio, não executa a função
    createTask(newTask.value)
})