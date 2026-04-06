// UI Controller
import { getDefaultAssumptions } from './js/model.js';
import { getAssumptionsFromInputs } from './js/assumptions.js';
import { calculateRequiredSuperBalance, validateAge } from './js/calculator.js';
import { displayResult, displayError } from './js/format.js';

/**
 * Main calculation function triggered by user input
 */
export function calculate() {
    const calculateBtn = document.querySelector('button[onclick*="calculate"]');
    const originalText = calculateBtn.innerHTML;

    // Show loading state
    calculateBtn.innerHTML = '<span class="loading"></span>Calculating...';
    calculateBtn.disabled = true;

    try {
        const ageInput = document.getElementById('age');
        const age = parseInt(ageInput.value);

        const ageValidation = validateAge(age);
        if (!ageValidation.valid) {
            displayError(ageValidation.message);
            return;
        }

        const assumptions = getAssumptionsFromInputs();
        const requiredBalance = calculateRequiredSuperBalance(age, assumptions);
        displayResult(requiredBalance);
    } catch (error) {
        displayError(`Calculation error: ${error.message}`);
    } finally {
        // Reset loading state
        calculateBtn.innerHTML = originalText;
        calculateBtn.disabled = false;
    }
}

/**
 * Recalculates with custom assumptions
 */
export function recalculateWithAssumptions() {
    calculate(); // Same logic, just triggered from assumptions panel
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Initialize with default values
    const defaults = getDefaultAssumptions();
    document.getElementById('salaryInput').value = defaults.salary;
    document.getElementById('wageGrowthInput').value = defaults.wageGrowth;
    document.getElementById('sgInput').value = defaults.sgRate;
    document.getElementById('returnInput').value = defaults.returnRate;
    document.getElementById('prcntFeeInput').value = defaults.percentFee;
    document.getElementById('dollarFeeInput').value = defaults.dollarFee;
    document.getElementById('insuranceInput').value = defaults.insurance;
});

// Make functions accessible from HTML onclick handlers
window.calculate = calculate;
window.recalculateWithAssumptions = recalculateWithAssumptions;
