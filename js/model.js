// Input structure and defaults
export const DEFAULT_ASSUMPTIONS = {
    salary: 74100,
    partnerSalary: 74100,
    wageGrowth: 3.7, // percentage
    sgRate: 12, // percentage (employer contribution rate)
    returnRate: 6.5, // percentage
    percentFee: 0.1, // percentage (percentage admin fee)
    dollarFee: 57.2, // dollar admin fee
    insurance: 521, // annual insurance cost
};

/** Canonical calculation constants (keep in sync with index.html inline script). */
export const CALCULATION_CONSTANTS = {
    retirementAge: 67,
    asfaComfortableSingle: 630000,
    asfaComfortableCouple: 730000,
    concessionalCap: 30000, // per person
    cpi: 0.025, // included per model but unused
    contributionTax: 0.15,
};

/** @deprecated Use asfaComfortableSingle — live single-person target only. */
export const comfortableRetirementBalance = CALCULATION_CONSTANTS.asfaComfortableSingle;

export function getDefaultAssumptions() {
    return { ...DEFAULT_ASSUMPTIONS };
}

export function getCalculationConstants() {
    return { ...CALCULATION_CONSTANTS };
}
