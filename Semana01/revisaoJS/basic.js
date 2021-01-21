
let name = "Vinicius";
const bornCity = "Rio Grande";
let age = 29;

function detailPerson(name, age, bornCity) {
    return `
    Name: ${name}
    Age: ${age}
    City: ${bornCity}`;
}

/* 
console.log(typeof(name), name)
console.log(bornCity);
console.log(age)
*/

console.log(detailPerson(name, age, bornCity));
console.log(detailPerson("Guilherme", 28, "Rio Grande"));