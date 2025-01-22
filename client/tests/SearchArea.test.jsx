import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchArea } from '../src/components/SearchArea'; // Adjust the import path as necessary
import { getAreas } from '../src/api'; // Import your mock API function

// Mock the `getAreas` API function
vi.mock('@/api', () => ({
  getAreas: vi.fn(
    () => Promise.resolve([
      { placeId: '1', mainText: 'Nafplio', secondaryText: 'Greece' },
      { placeId: '2', mainText: 'Athens', secondaryText: 'Greece' },
    ])
  ),
}));

describe('SearchArea Component', () => {
  // Test when no value is set and the input is empty
  test('renders correctly with no value and no suggestions', async () => {
    render(<SearchArea value="" setValue={vi.fn()} />);
    
    // Verify the placeholder text appears correctly
    expect(screen.getByText(/Search area.../i)).toBeInTheDocument();

    // Verify that no suggestions are visible
    const button = screen.getByRole('combobox');
    fireEvent.click(button);  // Open the popover
    
    // Verify that no suggestions are visible
  
    const commandInput = screen.getByPlaceholderText('Search area...');

    //type in the search input less than 3 characters
    fireEvent.change(commandInput, { target: { value: 'ne' } });  

    // Verify that no suggestions are visible
    expect(screen.queryByText('Nafplio')).not.toBeInTheDocument();

    // Type in the search input more than 3 characters
    fireEvent.change(commandInput, { target: { value: 'nafplio' } });

    
    // Wait for the API to be called and the suggestions to be populated
    await waitFor(() => {
      expect(getAreas).toHaveBeenCalled();
    });

    // Verify that the suggestions are visible
    expect(screen.getByText('Nafplio')).toBeInTheDocument();
  });
});
