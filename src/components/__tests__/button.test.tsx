import { render, screen } from "@testing-library/react";
import Button from "../button/button"; // Adjust the import path as needed

describe("Button Component", () => {
  it("renders the button with the correct variant styles", () => {
    const { rerender } = render(
      <Button variant="primary">Primary Button</Button>
    );

    let buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("bg-primary text-white");

    rerender(<Button variant="secondary">Secondary Button</Button>);
    buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("bg-white text-gray-800");

    rerender(<Button variant="outline">Outline Button</Button>);
    buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("border border-white bg-transparent");

    rerender(<Button variant="transparent">Transparent Button</Button>);
    buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("text-white font-bold outline-none");

    rerender(
      <Button variant="disabled" disabled>
        Disabled Button
      </Button>
    );
    buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("text-gray-600 hover:bg-gray-100");
    expect(buttonElement).toBeDisabled();
  });

  it("renders the icon in the correct position", () => {
    const iconSrc = "https://example.com/icon.png";

    // Icon on the left
    render(
      <Button icon={iconSrc} iconPosition="left">
        Left Icon Button
      </Button>
    );
    const leftIcon = screen.getByRole("img", { name: /lefticon/i });
    expect(leftIcon).toBeInTheDocument();
    expect(leftIcon).toHaveAttribute("src", iconSrc);

    // Icon on the right
    render(
      <Button icon={iconSrc} iconPosition="right">
        Right Icon Button
      </Button>
    );
    const rightIcon = screen.getByRole("img", { name: /righticon/i });
    expect(rightIcon).toBeInTheDocument();
    expect(rightIcon).toHaveAttribute("src", iconSrc);
  });

  it("renders the children content correctly", () => {
    render(<Button>Test Content</Button>);

    const buttonContent = screen.getByText("Test Content");
    expect(buttonContent).toBeInTheDocument();
  });

  it("disables the button when the disabled prop is passed", () => {
    render(<Button disabled>Disabled Button</Button>);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
});
