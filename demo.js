function sumArray(arr) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
      result += arr[i];
    }
    return result;
}
  
const numbers = [1, 2, 3, 4, 5];
const total = sumArray(numbers);
console.log(total);
