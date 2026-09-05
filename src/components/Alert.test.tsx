import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
