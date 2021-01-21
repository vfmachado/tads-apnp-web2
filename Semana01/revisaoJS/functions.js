
const data2 = "OPS...";

function detail(data) {
    return `Your data: ${data} ... ${data2}`;    
}

/*
if (a > b)
    return a;
else
    return b;
*/
function max(a, b) {
    return a > b ? a : b;
}

const maxArrow = (a, b) => a > b ? a : b;

const rnd = () => Math.random();

const rndMax = max => Math.floor(Math.random() * max);

console.log(max(10, 5));
console.log(maxArrow(3, 7));
console.log(rnd())
console.log(rndMax(100))