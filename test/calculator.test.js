// Basic test suite for the super calculator
// Run with: node --experimental-modules test/calculator.test.js

import { calculateRequiredSuperBalance, validateAge } from '../js/calculator.js';
import { getNetContributionRate, getNetReturnRate } from '../js/assumptions.js';

// Simple test framework
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Test failed: ${message}`);
    }
}

function test(description, testFn) {
    try {
        testFn();
        console.log(`✓ ${description}`);
    } catch (error) {
        console.error(`✗ ${description}: ${error.message}`);
    }
}

// Test cases
console.log('Running calculator tests...\n');

// Age validation tests
test('validateAge accepts valid age', () => {
    const result = validateAge(40);
    assert(result.valid === true, 'Should accept age 40');
});

test('validateAge rejects age too low', () => {
    const result = validateAge(17);
    assert(result.valid === false, 'Should reject age 17');
});

test('validateAge rejects age too high', () => {
    const result = validateAge(67);
    assert(result.valid === false, 'Should reject age 67');
});

test('validateAge rejects invalid input', () => {
    const result = validateAge('not a number');
    assert(result.valid === false, 'Should reject non-numeric input');
});

// Calculation tests
test('calculateRequiredSuperBalance returns positive number', () => {
    const assumptions = {
        salary: 74100,
        wageGrowth: 0.037,
        sgRate: 0.12,
        returnRate: 0.065,
        percentFee: 0.001,
        dollarFee: 57.2,
        insurance: 521,
    };
    const result = calculateRequiredSuperBalance(40, assumptions);
    assert(result > 0, 'Should return positive balance');
    assert(Number.isInteger(result), 'Should return integer');
    assert(result % 1000 === 0, 'Should be rounded to nearest $1000');
});

test('calculateRequiredSuperBalance handles younger age', () => {
    const assumptions = {
        salary: 100000,
        wageGrowth: 0.03,
        sgRate: 0.15,
        returnRate: 0.07,
        percentFee: 0.002,
        dollarFee: 100,
        insurance: 521,
    };
    const result = calculateRequiredSuperBalance(25, assumptions);
    assert(result >= 0, `Should return non-negative balance, got ${result}`);
    assert(Number.isInteger(result), 'Should return integer');
    assert(result % 1000 === 0, 'Should be rounded to nearest $1000');
});

// Assumption calculation tests
test('getNetContributionRate calculates correctly', () => {
    const assumptions = {
        salary: 80000,
        sgRate: 0.12,
        dollarFee: 50,
        insurance: 521,
    };
    const result = getNetContributionRate(assumptions);
    // Expected: (80000 * 0.12) * (1 - 0.15) - 50 - 521 = 9600 * 0.85 - 571 = 8160 - 571 = 7589
    assert(Math.abs(result - 7589) < 1, `Expected ~7589, got ${result}`);
});

test('getNetReturnRate calculates correctly', () => {
    const assumptions = {
        returnRate: 0.07,
        percentFee: 0.001,
    };
    const result = getNetReturnRate(assumptions);
    assert(Math.abs(result - 0.069) < 0.001, `Expected 0.069, got ${result}`);
});

console.log('\nTest suite completed!');
