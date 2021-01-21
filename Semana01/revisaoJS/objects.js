
let vini = {
    name: "Vinicius",
    age: 29,

    detail() {
        console.log(`${this.name} tem ${this.age} anos`);
    }
}

/*
const detail = person => {
    console.log(`${person.name} tem ${person.age} anos`);
}
*/
vini.name = "Guilherme"
vini.detail();