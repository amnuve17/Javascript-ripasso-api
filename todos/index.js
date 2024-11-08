const baseUrl = 'http://localhost:3000';

const createTodoDiv = (todo) => {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.type = "checkbox";
    input.id = todo.id;
    input.checked = todo.completed;
    input.onchange = handleCheckbox; //riferimento alla funzione si scrive senza le ()
    const label = document.createElement('input');
    label.value = todo.title;
    label.onchange = (e) => handleChange(todo, e.target.value); //prende il valore di label
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "elimina";
    deleteButton.onclick = () => handleDelete(todo); //creo una funzione che lancia la funzione che mi serve perché se scrivo una funzione direttament
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(deleteButton) ;
    return div;
}

function handleDelete(todo){
    fetch(baseUrl + '/todos/' + todo.id, {method:'DELETE'})
    .then(res => res.json())
    .then(() => {
        firstTodos.delete(todo.id);
    })
}

function handleChange(todo, newTitle){
    fetch(baseUrl + '/todos/' + todo.id, {
        method: 'PATCH',
        body: JSON.stringify({ title: newTitle }),
        headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then(newTodo =>{
        firstTodos.update(newTodo);
    })
}


const loading = document.querySelector('#todos .loading');
const todoDiv = document.querySelector('#todos');

const todoManager = () => { //manager che gestisce l'interfaccia
    let state = [];
    return {
        set: function(newState) {
            state = newState;
            this.render();
        },
        render: function(){
            todoDiv.innerHTML = "";
            state.forEach(element => {
                todoDiv.appendChild(createTodoDiv(element));
            })
        },
        add: function(newElement){
            state.unshift(newElement);
            this.render();
        },
        delete: function(id){
            /* const index = state.findIndex(todo => todo.id === id);
            state.splice(index, 1); */ //trova id e elimina

            state = state.filter(todo => todo.id !== id); //esclude l'id e renderizza solo gli altri
            this.render();
        },
        update: function(todo){
            const index = state.findIndex(newTodo => todo.id == newTodo.id); 
            state.splice(index, 1, todo); //sostituisce il valore con quello nuovo
        }
    }
}
const firstTodos = todoManager();

fetch(baseUrl + '/todos/')
    .then(response => response.json())
    .then(todos => {
        loading.remove();
        firstTodos.set(todos);
    })
    .catch((err)=>{
    console.log(err);
});

const handleCheckbox = (event) => {
    console.log(event.target.checked);
    fetch(baseUrl + '/todos/'+ event.target.id,
        { 
            method: 'PATCH',
            body: JSON.stringify({completed: event.target.checked()}),
            headers:{ "Content-Type": "application/json" }  
        }
    )
    .then(response => response.json())
    .then(todo => {
        console.log(todo);
    })
    .catch(() =>{
        event.target.checked = !event.target.checked;
    })
}

const todoForm = document.querySelector("#todoForm");
// todoForm.onsubmit = () => {} questo sovrascrive eventi precedenti
    todoForm.addEventListener('submit', (event) => { //questo aggiunge un evento senza eliminare i precedenti => molto più versatile
        event.preventDefault();
        const title = event.target.children.title;
        console.log(title.value);
        fetch(baseUrl + '/todos/',{
            method: 'POST',
            body: JSON.stringify({
                title: title.value,
                completed: false,
                userId: 1,
            }),
            headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(newTodo => { 
        firstTodos.add(newTodo);
    })
})

//aggiungi modifica ed elimina