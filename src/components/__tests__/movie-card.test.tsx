import { render, screen } from "@testing-library/react";
import { MovieCard } from "../movie-card/movie-card";
import userEvent from "@testing-library/user-event";

describe("MovieCard Component", () => {
  const mockProps = {
    image: "https://example.com/movie-poster.jpg",
    title: "Test Movie Title",
    score: 8.5,
    year: 2023,
  };

  beforeEach(() => {
    render(<MovieCard {...mockProps} />);
  });

  it("renders the movie card with the correct background image", () => {
    const card = screen.getByTestId("movie-card");
    expect(card).toHaveStyle(`background-image: url(${mockProps.image})`);
  });

  it("displays the original content by default", () => {
    // Check for the original title
    const originalTitle = screen.getByTestId("original-title");
    expect(originalTitle).toBeInTheDocument();
    expect(originalTitle).toHaveTextContent(mockProps.title);
  });

  it("shows the overlay content when hovered", async () => {
    const card = screen.getByTestId("movie-card");

    // Simulate hover using userEvent.hover
    await userEvent.hover(card);

    // Check for the overlay title
    const overlayTitle = screen.getByTestId("overlay-title");
    expect(overlayTitle).toBeInTheDocument();
    expect(overlayTitle).toHaveTextContent(mockProps.title);
  });
});
