//Promise & concurrency

const x = "ciao";
console.log(x);

setTimeout(() => { //vuole come parametro una funzione da eseguire in un determinato momento e un delay
    /* console.log("2"); */
}, 4000);

console.log("1");
//imposto una promise
const sleep = new Promise((res, rej) => { //vuole sempre due paramatri => resolve, reject
    rej("NON Ho mantenyuti lka primoesse"); //è comunque una azione ASINCRONA che parte con dei millisecondi di ritardo
    setTimeout(() => {
        console.log(2)
        res("Beccati sta promessa zio!" ); //funziona data dal paramentro che restutisce il risultato/azione della promise
    }, 4000);
});

/* const sleep2 = new Promise(()=>{
    if(error){
        rej("NON Ho mantenyuti lka primoesse");
    }
    else{
        setTimeout(() => {
            console.log(2)
            res("Beccati sta promessa zio!" ); //funziona data dal paramentro che restutisce il risultato/azione della promise
        }, 4000);
    }
}); */


console.log("3");

//sleep ha a sua volta dei metodi
//then risolve la funzione passata come parametro dopo che la promise è risolta
sleep
    .then((res) => {
        console.log(res);
    })
    .catch((err) =>{ //catch intercetta l'errore e gli assegna il valore inserito dentro a rej, se non lo metto ridà un errore generico
        console.log(err);
    })
console.log(4);


fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch((err)=>{
        console.log(err);
    });