// Pure calculation logic
import { CALCULATION_CONSTANTS } from './model.js';
import { getNetContributionRate, getNetReturnRate } from './assumptions.js';

/**
 * Calculates the required superannuation balance needed for a comfortable retirement
 * @param {number} currentAge - The person's current age
 * @param {Object} assumptions - Financial assumptions object
 * @param {number} assumptions.salary - Annual salary in dollars
 * @param {number} assumptions.wageGrowth - Annual wage growth rate (decimal, e.g., 0.037)
 * @param {number} assumptions.sgRate - Super guarantee rate (decimal, e.g., 0.12)
 * @param {number} assumptions.returnRate - Investment return rate (decimal, e.g., 0.065)
 * @param {number} assumptions.percentFee - Percentage fee rate (decimal, e.g., 0.001)
 * @param {number} assumptions.dollarFee - Fixed dollar fee
 * @param {number} [targetAtRetirement] - ASFA comfortable combined balance at retirement (defaults to single-person target)
 * @returns {number} Required super balance rounded to nearest $1000
 */
export function calculateRequiredSuperBalance(
    currentAge,
    assumptions,
    targetAtRetirement = CALCULATION_CONSTANTS.asfaComfortableSingle,
) {
    const yearsToRetirement = CALCULATION_CONSTANTS.retirementAge - currentAge;

    const netContribution = getNetContributionRate(assumptions);
    const netReturn = getNetReturnRate(assumptions);

    // Future value of contributions using geometric series formula
    const fvContributions =
        (netContribution *
            (Math.pow(1 + netReturn, yearsToRetirement) - Math.pow(1 + assumptions.wageGrowth, yearsToRetirement))) /
        (netReturn - assumptions.wageGrowth);

    // Future value of required retirement balance, adjusted for wage growth
    const fvRequiredBalance = targetAtRetirement * Math.pow(1 + assumptions.wageGrowth, yearsToRetirement);

    // Current balance needed
    const currentBalanceNeeded = (fvRequiredBalance - fvContributions) / Math.pow(1 + netReturn, yearsToRetirement);

    // Round up to nearest $1000 and ensure non-negative
    return Math.max(0, Math.ceil(currentBalanceNeeded / 1000) * 1000);
}

/**
 * Validates the age input
 * @param {number} age - The age to validate
 * @returns {Object} Validation result with valid boolean and optional error message
 */
export function validateAge(age) {
    if (isNaN(age) || age < 18 || age > 66) {
        return { valid: false, message: 'Please enter a valid age between 18 and 66.' };
    }
    return { valid: true };
}
