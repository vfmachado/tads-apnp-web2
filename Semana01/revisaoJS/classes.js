class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    detail() {
        console.log(`${this.name} tem ${this.age} anos e ${this.isAdult()}`);
    }

    isAdult() {
        return this.age >= 18;
    }

}

let vini = new Person('Vinicius', 29);
let manu = new Person("Manu", 27);
let ale = new Person("Alexandre", 16);

vini.detail();
console.log(vini.isAdult());
ale.detail();
console.log(ale.isAdult());