// Implementation 1: Iterative approach using a loop
function sum_to_n_a(n: number): number {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i; // Add each number to total
    }
    return total;
}

// Implementation 2: Direct calculation using a formula
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2; // Use the arithmetic series formula
}

// Implementation 3: Recursive approach
function sum_to_n_c(n: number): number {
    if (n === 0) {
        return 0; // Base case: sum of 0 is 0
    }
    return n + sum_to_n_c(n - 1); // Add n and call recursively for n-1
}

// Test cases to verify the implementations
console.log(sum_to_n_a(5)); // Expected output: 15
console.log(sum_to_n_b(5)); // Expected output: 15
console.log(sum_to_n_c(5)); // Expected output: 15
