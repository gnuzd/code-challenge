/**
 *
 * @description
 *
 * This function uses a simple for loop to iterate from 1 to n and accumulate the sum.
 * This is the most straightforward and efficient approach.
 *
 * Conclusion: this is the best option in terms of efficiency and readability.
 * */
const sum_to_n_a = function (n) {
  let total = 0;
  for (let idx = 1; idx <= n; idx++) {
    total += idx;
  }

  return total;
};

/**
 *
 * @description
 *
 * This function creates an array of numbers from 1 to n using Array.from and then uses the reduce method to sum the elements
 * This approach is less efficient than the for loop because it involves creating an intermediate array and using a higher-order function.
 *
 */
const sum_to_n_b = function (n) {
  return Array.from({ length: n }, (_, idx) => idx + 1).reduce((acc, cur) => {
    return acc + cur;
  }, 0);
};

/**
 *
 * @description
 *
 * This function also creates an array of numbers from 1 to n and then uses the map method to iterate over the array and accumulate the sum.
 * This approach is less efficient than the for loop and also less appropriate than reduce because map is intended for transforming array elements, not for accumulating a value
 *
 */
const sum_to_n_c = function (n) {
  let sum = 0;
  Array.from({ length: n }, (_, idx) => idx + 1).map((item) => {
    sum += item;
  });

  return sum;
};

console.log("sum_a: ", sum_to_n_a(10));
console.log("sum_b: ", sum_to_n_b(10));
console.log("sum_c: ", sum_to_n_c(10));
