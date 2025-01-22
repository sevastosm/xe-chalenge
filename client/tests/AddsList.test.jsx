import { screen } from '@testing-library/react';
import AddsList from '../src/components/AddsList';
import renderWithRouter from './utils'; // Import your renderWithRouter function

// Mock data for form entries (this test will use an empty array)
test('renders AddsList and shows "No form submissions yet." when formEntries is empty', () => {
  const mockFormEntries = [];

  renderWithRouter(<AddsList formEntries={mockFormEntries} />); // Directly use renderWithRouter

  // Check that the "No form submissions yet." message appears when the formEntries is empty
  expect(screen.getByText(/No form submissions yet./i)).toBeInTheDocument();
});


