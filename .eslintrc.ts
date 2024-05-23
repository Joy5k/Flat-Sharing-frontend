module.exports = {
    // ... other ESLint config
    plugins: ['mui-path-imports'],
    rules: {
      // ... other ESLint rules
      'mui-path-imports/prefer-exact-import': 'warn', // Or 'error' if desired
    },
  };
  