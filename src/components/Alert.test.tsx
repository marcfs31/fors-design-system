import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders a title and body", () => {
    render(<Alert title="Deploy failed">Check the build log.</Alert>);
    expect(screen.getByText("Deploy failed")).toBeInTheDocument();
    expect(screen.getByText("Check the build log.")).toBeInTheDocument();
  });

  it("exposes a status role for assistive tech", () => {
    render(<Alert>Deploying…</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses assertive alert role for danger variant", () => {
    render(<Alert variant="danger">Deployment failed.</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("allows explicit assertive prop to override variant", () => {
    render(
      <Alert variant="success" assertive={true}>
        Critical success!
      </Alert>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert variant="danger" title="Deploy failed">
        Check the build log.
      </Alert>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders no close button unless onDismiss is passed", () => {
    render(<Alert>Deploying…</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onDismiss when the close button is activated", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Import failed.</Alert>);
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("reaches and fires the close button from the keyboard", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Import failed.</Alert>);
    await user.tab();
    expect(screen.getByRole("button", { name: "Dismiss" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("accepts a custom close-button label for localisation", () => {
    render(
      <Alert onDismiss={() => {}} dismissLabel="Descartar">
        Fallo de importación.
      </Alert>
    );
    expect(screen.getByRole("button", { name: "Descartar" })).toBeInTheDocument();
  });

  it("stays controlled — dismissing does not hide it on its own", async () => {
    const user = userEvent.setup();
    render(<Alert onDismiss={() => {}}>Import failed.</Alert>);
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.getByText("Import failed.")).toBeInTheDocument();
  });

  it("has no accessibility violations when dismissible", async () => {
    const { container } = render(
      <Alert variant="warning" title="Partial import" onDismiss={() => {}}>
        3 of 40 rows were skipped.
      </Alert>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
