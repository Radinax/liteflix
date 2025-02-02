import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../dropdown/dropdown"; // Adjust the import path as needed
import { vi } from "vitest";

describe("Dropdown Component", () => {
  const mockOnSelect = vi.fn(); // Mock the onSelect callback
  const items = ["Option 1", "Option 2", "Option 3"];

  beforeEach(() => {
    mockOnSelect.mockClear(); // Reset the mock before each test
    render(<Dropdown items={items} onSelect={mockOnSelect} />);
  });

  it("renders the dropdown button with the default selected item", () => {
    // Check if the button displays the first item by default
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(items[0]);
  });

  it("toggles the dropdown menu when the button is clicked", () => {
    // Initially, the dropdown menu should not be visible
    const dropdownMenu = screen.queryByRole("list");
    expect(dropdownMenu).not.toBeInTheDocument();

    // Click the button to open the dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Now, the dropdown menu should be visible
    const visibleDropdownMenu = screen.getByRole("list");
    expect(visibleDropdownMenu).toBeInTheDocument();
    expect(visibleDropdownMenu.children.length).toBe(items.length); // Ensure all items are rendered

    // Click the button again to close the dropdown
    fireEvent.click(button);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("updates the selected item and calls onSelect when an item is clicked", () => {
    // Open the dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Click on the second item in the dropdown
    const secondItem = screen.getByText(items[1]);
    fireEvent.click(secondItem);

    // Check if the selected item updates
    expect(button).toHaveTextContent(items[1]);

    // Check if the onSelect callback was called with the correct value
    expect(mockOnSelect).toHaveBeenCalledWith(items[1]);
  });

  it("rotates the arrow icon when the dropdown is toggled", () => {
    // Initially, the arrow icon should not be rotated
    const arrowIcon = screen.getByRole("img", { name: /arrow/i });
    expect(arrowIcon).not.toHaveClass("transform rotate-180");

    // Toggle the dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // The arrow icon should now be rotated
    expect(arrowIcon).toHaveClass("transform rotate-180");

    // Toggle the dropdown again
    fireEvent.click(button);

    // The arrow icon should return to its original state
    expect(arrowIcon).not.toHaveClass("transform rotate-180");
  });
});
