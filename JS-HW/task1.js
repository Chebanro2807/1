// 3. Вывести в консоль числа кратные k, в диапазоне от 1 до n. => in home

const to = +prompt('Enter to: ');
const k = +prompt('Enter K: ');

function MultiplyK(n) {
    for (let d=k; d<=n; d++){
        if (n % d === 0) {
            return true;
    }
    return false;
}
}


function getMultiplesNumbers(from, to, k) {
    const result = [];
    
    let i = from;
    
    while (i <= to) {
        if (MultiplyK(i)) {
            result.push(i);
        }
    
        i++;
    }
    return result;
}

console.log( getMultiplesNumbers (1, to, k) ) 



