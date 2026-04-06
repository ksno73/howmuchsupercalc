// Display helpers and formatting

/**
 * Formats a number as currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
    return `$${amount.toLocaleString()}`;
}

/**
 * Formats a decimal as percentage
 * @param {number} value - The decimal value to format (e.g., 0.037)
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value) {
    return `${(value * 100).toFixed(1)}%`;
}

/**
 * Displays the calculation result in the UI
 * @param {number} balance - The calculated balance
 */
export function displayResult(balance) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<p>Estimated balance needed: ${formatCurrency(balance)}</p>`;
}

/**
 * Displays an error message in the UI
 * @param {string} message - The error message to display
 */
export function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}
