/*

    spread: na frente do objeto com o intuito de "desmontar"
    rest: parametros de funções quando nao sabemos quantos parametros serao passados

*/

function toArray(description, ...params) {
    console.log(description)
    return params;
}

console.log(toArray(1, 2, 3, 4, 5, 6, 7, 8 ));

/*
    destructuring
        copiar somente parte dos valores de um objeto
*/

const person = {
    name: "Vini",
    age: 29,
    job: "Teacher",
    detail() {
        console.log("sou uma pessoa")
    }
}

let {name, job} = person;
console.log(name, job)

const series = ["LUPIN", "La casa de papel"];
let [serie1, serie2] = series;
console.log(serie1, serie2)