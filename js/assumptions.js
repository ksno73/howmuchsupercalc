// Assumptions and rates
import { CALCULATION_CONSTANTS } from './model.js';
import { validateAllAssumptions } from './validation.js';

export function getAssumptionsFromInputs() {
    const validation = validateAllAssumptions();
    if (!validation.valid) {
        throw new Error(validation.errors.join(', '));
    }

    return validation.assumptions;
}

export function getNetContributionRate(assumptions) {
    return (
        assumptions.salary * assumptions.sgRate * (1 - CALCULATION_CONSTANTS.contributionTax) -
        assumptions.dollarFee -
        assumptions.insurance
    );
}

export function getNetReturnRate(assumptions) {
    return assumptions.returnRate - assumptions.percentFee;
}
