# How Much Super Calculator

A simple web application to estimate the superannuation balance needed for a comfortable retirement in Australia.

## Features

- Calculate required super balance based on current age
- Customizable assumptions (salary, growth rates, fees)
- Responsive design with Bootstrap
- Modular JavaScript architecture

## Quick Start

1. Clone the repository
2. Open `index.html` in your browser
3. Enter your age and click "Calculate"

## Development

### Prerequisites

- Node.js 14+ (for development tools)
- Modern web browser with ES6 module support

### Setup

```bash
npm install
```

### Development Commands

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm test
```

## Project Structure

```
├── index.html          # Main HTML page
├── styles.css          # Application styles
├── main.js            # UI controller and event handlers
├── js/
│   ├── model.js       # Constants and default values
│   ├── assumptions.js # Input processing and assumption calculations
│   ├── calculator.js  # Core calculation logic
│   ├── format.js      # Display formatting utilities
│   └── validation.js  # Input validation
├── test/
│   └── calculator.test.js # Unit tests
└── package.json       # Dependencies and scripts
```

## Calculation Methodology

The calculator determines the current super balance needed to reach a comfortable retirement at age 67, assuming:

- **Comfortable retirement balance**: $630,000 (provides ~$65,000 annual income)
- **Super guarantee rate**: 12% of salary (after 15% contributions tax)
- **Investment return**: 6.5% per annum (after fees)
- **Wage growth**: 3.7% per annum
- **Fees**: 0.1% of balance + $52 annually
- **Insurance costs**: $521 per year

### Formula Overview

1. Calculate net annual contribution: `(salary × SG rate × (1 - tax)) - fees - insurance`
2. Project future value of contributions using compound growth
3. Adjust retirement target for wage inflation
4. Solve for present value needed today

## Assumptions

- Retirement at age 67
- No additional voluntary contributions
- Constant rates (no market volatility modeling)
- Australian superannuation system parameters

## Disclaimer

This calculator provides estimates only and should not be considered financial advice. Actual retirement needs vary based on individual circumstances, lifestyle, health, and economic conditions. Consult a qualified financial advisor for personalized retirement planning.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run `npm run lint && npm test`
6. Submit a pull request

## License

MIT License - see LICENSE file for details
