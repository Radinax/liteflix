import { render, screen } from "@testing-library/react";
import DEFAULT_AVATAR from "../../assets/avatar.png";
import Avatar from "../avatar/avatar";

describe("Avatar Component", () => {
  it("renders the default avatar when no src is provided", () => {
    render(<Avatar />);

    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", DEFAULT_AVATAR);
    expect(imgElement).toHaveAttribute("alt", "User Avatar");
  });

  it("renders a custom image when src is provided", () => {
    const customSrc = "https://example.com/custom-avatar.jpg";
    render(<Avatar src={customSrc} alt="Custom Avatar" />);

    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", customSrc);
    expect(imgElement).toHaveAttribute("alt", "Custom Avatar");
  });

  it("applies the correct size class based on the size prop", () => {
    const { rerender } = render(<Avatar size="sm" />);
    let container = screen.getByRole("img").parentElement;

    // Check for "sm" size
    expect(container).toHaveClass("w-10");
    expect(container).toHaveClass("h-10");

    // Re-render with "md" size
    rerender(<Avatar size="md" />);
    container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass("w-12");
    expect(container).toHaveClass("h-12");

    // Re-render with "lg" size
    rerender(<Avatar size="lg" />);
    container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass("w-16");
    expect(container).toHaveClass("h-16");
  });

  it("merges custom className with default styles", () => {
    const customClassName = "border-2 border-red-500";
    render(<Avatar className={customClassName} />);

    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass(customClassName);
    expect(container).toHaveClass("rounded-full");
    expect(container).toHaveClass("overflow-hidden");
  });

  it("displays the correct alt text", () => {
    const altText = "Test Alt Text";
    render(<Avatar alt={altText} />);

    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("alt", altText);
  });
});
