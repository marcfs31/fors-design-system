import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

describe("RadioGroup", () => {
  it("only allows one item selected at a time", async () => {
    render(
      <RadioGroup defaultValue="hobby" aria-label="Plan">
        <RadioGroupItem value="hobby" aria-label="Hobby" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>
    );
    const hobby = screen.getByRole("radio", { name: "Hobby" });
    const pro = screen.getByRole("radio", { name: "Pro" });
    expect(hobby).toHaveAttribute("aria-checked", "true");
    await userEvent.click(pro);
    expect(pro).toHaveAttribute("aria-checked", "true");
    expect(hobby).toHaveAttribute("aria-checked", "false");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <RadioGroup defaultValue="hobby" aria-label="Plan">
        <RadioGroupItem value="hobby" aria-label="Hobby" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has minimum 24px touch target size", () => {
    render(
      <RadioGroup defaultValue="hobby" aria-label="Plan">
        <RadioGroupItem value="hobby" aria-label="Hobby" />
      </RadioGroup>
    );
    const radio = screen.getByRole("radio", { name: "Hobby" });
    expect(radio).toHaveClass("h-6", "w-6");
  });
});
