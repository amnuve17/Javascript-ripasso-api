const baseUrl = 'https://jsonplaceholder.typicode.com';

const createTodoDiv = (todo) => {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.type = "checkbox";
    input.id = todo.id;
    input.checked = todo.completed;
    input.onchange = handleCheckbox; //riferimento alla funzione si scrive senza le ()
    const label = document.createElement('label');
    label.textContent = todo.title;
    div.appendChild(input);
    div.appendChild(label);
    return div;
}

const loading = document.querySelector('#todos .loading');
const todoDiv = document.querySelector('#todos');

const todoManager = () => {
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