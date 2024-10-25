fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => response.json())
    .then(todos => {
        const loading = document.querySelector('#todos .loading');
        const todoDiv = document.querySelector('#todos');
        loading.remove();
        todos.forEach(todo => {
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
            todoDiv.appendChild(div);
        });
    })
    .catch((err)=>{
    console.log(err);
});

const handleCheckbox = (event) => {
    console.log(event.target.checked);
    fetch('https://jsonplaceholder.typicode.com/todos/' + event.target.id,
        { method: 'PUT'}
    )
    .then(response => response.json())
    .then(todo => {
        console.log(todo);
    })
    .catch(() =>{
        event.target.checked = !event.target.checked;
    })
}