import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProgressBar } from "../progress-bar/progress-bar";
import { vi } from "vitest";

describe("ProgressBar Component", () => {
  const onCancelMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the progress bar with initial progress", () => {
    render(<ProgressBar progress={50} onCancel={onCancelMock} />);

    // Check progress label
    expect(screen.getByText("CARGANDO 50%")).toBeInTheDocument();

    // Check cancel button
    const cancelButton = screen.getByText("CANCELAR");
    expect(cancelButton).toBeInTheDocument();

    // Check progress bar width
    const progressBarFill = screen.getByRole("progressbar");
    expect(progressBarFill).toHaveStyle({ width: "50%" });
  });

  it("displays '¡LISTO!' when progress is 100%", () => {
    render(<ProgressBar progress={100} onCancel={onCancelMock} />);

    // Check progress label
    expect(screen.getByText("100% CARGANDO")).toBeInTheDocument();

    // Check '¡LISTO!' text
    expect(screen.getByText("¡LISTO!")).toBeInTheDocument();

    // Ensure cancel button is not rendered
    expect(screen.queryByText("CANCELAR")).not.toBeInTheDocument();
  });

  it("calls onCancel when the cancel button is clicked", async () => {
    render(<ProgressBar progress={30} onCancel={onCancelMock} />);

    // Find and click the cancel button
    const cancelButton = screen.getByText("CANCELAR");
    await userEvent.click(cancelButton);

    // Verify onCancel was called
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it("renders an error state with a red progress bar", () => {
    render(
      <ProgressBar
        progress={75}
        onCancel={onCancelMock}
        error="Error occurred"
      />
    );

    // Check progress label
    expect(screen.getByText("CARGANDO 75%")).toBeInTheDocument();

    // Check if the progress bar has a red background
    const progressBarFill = screen.getByRole("progressbar");
    expect(progressBarFill).toHaveClass("bg-red-600");

    // Ensure cancel button is still visible
    expect(screen.getByText("CANCELAR")).toBeInTheDocument();
  });

  it("does not render the cancel button when progress is 100%", () => {
    render(<ProgressBar progress={100} onCancel={onCancelMock} />);

    // Ensure cancel button is not rendered
    expect(screen.queryByText("CANCELAR")).not.toBeInTheDocument();
  });

  it("handles edge case: progress at 0%", () => {
    render(<ProgressBar progress={0} onCancel={onCancelMock} />);

    // Check progress label
    expect(screen.getByText("CARGANDO 0%")).toBeInTheDocument();

    // Check progress bar width
    const progressBarFill = screen.getByRole("progressbar");
    expect(progressBarFill).toHaveStyle({ width: "0%" });

    // Ensure cancel button is visible
    expect(screen.getByText("CANCELAR")).toBeInTheDocument();
  });
});
