console.log("Hello world");

//recursive functions
const countdown = (param) => {
    if(param > 0){
        console.log(param);
        /* countdown(param-1); */
        countdown(--num); //-- si usa per ridurre di uno. Messo dopo riduce dopo aver eseguito una funzione, messo prima lo fa prima.
    }
}

const counter = () => {
    let count = 0;
    return () => {
        return ++count; // il vantaggio è poter usare questo snippet in scope
    }
}

const firstCounter = counter(); //first counter assumerà il valore della funzione di return
/* console.log(firstCounter());
console.log(firstCounter());
console.log(firstCounter()); */

//countdown(10);

const useState = (initialState) =>{
    let state = initialState;
    return [state, (newState) => {
        state = newState;
        return state;
    }]
};

/* const [person, setPerson] = useState('Nicola'); */
/* console.log(person('Nuve')); */

//objects
const user = {
    firstName: 'Mario', //proprietà dell'oggetto 
    lastName: "Rossi",
    fullName: function(){ //una funzione creata in un oggetto prende il nome di metodo
        return this.firstName; //this non funziona nelle arrow function quindi negli oggetti usiamo quelle normali
    }
};
/* console.log(user.fullName()); */

//creare uan calcolatrice in grado di fare le 4 operazioni

//modio mio
const calcolatrice = {
    totale: 0,
    operazioni: function(){
        return (num, operatore) =>{
            if(operatore == "+"){
                this.totale += num;
            }
            else if(operatore == "-"){
                this.totale -= num;
            }
            else if(operatore == "*"){
                this.totale *= num;
            }
            else if(operatore == "/"){
                this.totale /= num;
            }
            return this.totale;
        }
    },
}

const item = calcolatrice.operazioni();

/* console.log(item(10, '+'));
console.log(item(10, '+'));
console.log(item(10, '+'));
console.log(item(10, '-'));
console.log(item(2, '/')); */

//correzione
const calc = (n = 0) => {
    let result = n;
    const operations = {
        add: (num) =>{
            result += num;
            return operations;
        },
        sub: (num) =>{
            result -= num;
            return operations;
        },
        molt: (num) =>{
            result *= num;
            return operations;
        },
        divide: (num) =>{
            result /= num;
            return operations;
        },
        eq: () => result
    }
    return operations;
}

console.log(calc(24).add(5).sub(6).eq());
