// Import necessary libraries for testing the React application
import { render, screen } from '@testing-library/react';

// Import the App component to be tested
import App from './App';

// Begin the test block with a description of the test
test('renders learn react link', () => {
  // Use the render function from '@testing-library/react' to render the App component
  render(<App />);

  // Use the getByText function from '@testing-library/react' to query for the "Learn React" link
  const linkElement = screen.getByText(/learn react/i);

  // Use the expect function from Jest to check if the link element is in the document
  expect(linkElement).toBeInTheDocument();
});