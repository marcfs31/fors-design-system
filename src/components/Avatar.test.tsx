import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Avatar, AvatarGroup } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when no image is given", () => {
    render(<Avatar initials="MF" alt="Marc Fors" />);
    expect(screen.getByText("MF")).toBeInTheDocument();
  });

  it("falls back to initials when the image fails to load", () => {
    render(<Avatar src="https://broken.example/x.png" initials="MF" alt="Marc Fors" />);
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(screen.getByText("MF")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Avatar initials="MF" alt="Marc Fors" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("AvatarGroup", () => {
  it("collapses avatars beyond max into a +N bubble", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar initials="MF" alt="Marc Fors" />
        <Avatar initials="JD" alt="Jamie Doe" />
        <Avatar initials="AK" alt="Alex Kim" />
      </AvatarGroup>
    );
    expect(screen.getByText("MF")).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.queryByText("AK")).not.toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("renders every avatar when under max", () => {
    render(
      <AvatarGroup max={5}>
        <Avatar initials="MF" alt="Marc Fors" />
        <Avatar initials="JD" alt="Jamie Doe" />
      </AvatarGroup>
    );
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });
});
