// Input validation utilities

/**
 * Validates a numeric input field
 * @param {string} value - The input value as string
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @param {string} fieldName - Human-readable field name for error messages
 * @returns {Object} Validation result with valid boolean and optional error message
 */
export function validateNumericInput(value, min, max, fieldName) {
    const num = parseFloat(value);
    if (isNaN(num)) {
        return { valid: false, message: `${fieldName} must be a valid number` };
    }
    if (num < min) {
        return { valid: false, message: `${fieldName} must be at least ${min}` };
    }
    if (num > max) {
        return { valid: false, message: `${fieldName} must be no more than ${max}` };
    }
    return { valid: true, value: num };
}

/**
 * Validates all assumption inputs
 * @returns {Object} Validation result with valid boolean and assumptions object or error messages
 */
export function validateAllAssumptions() {
    const validations = [
        validateNumericInput(document.getElementById('salaryInput').value, 0, 250000, 'Salary'),
        validateNumericInput(document.getElementById('wageGrowthInput').value, 0, 20, 'Wage Growth'),
        validateNumericInput(document.getElementById('sgInput').value, 0, 20, 'Employer contribution rate'),
        validateNumericInput(document.getElementById('returnInput').value, 0, 15, 'Return Rate'),
        validateNumericInput(document.getElementById('prcntFeeInput').value, 0, 10, 'Percentage admin fee'),
        validateNumericInput(document.getElementById('dollarFeeInput').value, 0, 10000, 'Dollar admin fee'),
        validateNumericInput(document.getElementById('insuranceInput').value, 0, 10000, 'Annual insurance cost'),
    ];

    const errors = validations.filter((v) => !v.valid).map((v) => v.message);
    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return {
        valid: true,
        assumptions: {
            salary: validations[0].value,
            wageGrowth: validations[1].value / 100, // Convert percentage to decimal
            sgRate: validations[2].value / 100,
            returnRate: validations[3].value / 100,
            percentFee: validations[4].value / 100,
            dollarFee: validations[5].value,
            insurance: validations[6].value,
        },
    };
}
