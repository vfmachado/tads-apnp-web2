
const series = ["GoT", "The Big Bang Theory"];

let myarray;
myarray = new Array();

//Tipo por referencia (eu altero ambos os arrays)
//myarray = series; //muito cuidado

series.push("Ricky and Morty")

let copy;
copy = [...series];
copy.pop();

console.log("Series", series);
console.log("Copy", copy);

const person = {
    name: "Vini",
    age: 29
}

let copiedPerson = { ...person }
copiedPerson.age = 18;

console.log(person.age)
console.log(copiedPerson.age)