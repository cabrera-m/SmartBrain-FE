// This function, reportWebVitals, is designed to report web vitals using the web-vitals library.
// It takes a single argument, onPerfEntry, which should be a function.

const reportWebVitals = onPerfEntry => {

  // The function first checks if onPerfEntry is a valid function.
  // If it is not, the function will not execute any further.
  if (onPerfEntry && onPerfEntry instanceof Function) {

    // The import statement is used to import the web-vitals library.
    // Once the library is imported, it is destructured to extract the necessary functions:
    // getCLS, getFID, getFCP, getLCP, and getTTFB.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {

      // Each of these functions is then called with onPerfEntry as an argument.
      // This will report the respective web vitals.
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// The function is then exported as the default export.
export default reportWebVitals;
