// Input structure and defaults
export const DEFAULT_ASSUMPTIONS = {
    salary: 74100,
    wageGrowth: 3.7, // percentage
    sgRate: 12, // percentage (employer contribution rate)
    returnRate: 6.5, // percentage
    percentFee: 0.1, // percentage (percentage admin fee)
    dollarFee: 57.2, // dollar admin fee
    insurance: 521, // annual insurance cost
};

export const CALCULATION_CONSTANTS = {
    retirementAge: 67,
    comfortableRetirementBalance: 630000,
    cpi: 0.025, // included per model but unused
    contributionTax: 0.15,
};

export function getDefaultAssumptions() {
    return { ...DEFAULT_ASSUMPTIONS };
}

export function getCalculationConstants() {
    return { ...CALCULATION_CONSTANTS };
}
