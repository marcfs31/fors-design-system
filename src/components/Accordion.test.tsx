import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

function ExampleAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Question one</AccordionTrigger>
        <AccordionContent>Answer one</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Question two</AccordionTrigger>
        <AccordionContent>Answer two</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("expands a section on trigger click", async () => {
    render(<ExampleAccordion />);
    expect(screen.queryByText("Answer one")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Question one" }));
    expect(screen.getByText("Answer one")).toBeInTheDocument();
  });

  it("collapses the open section when its trigger is clicked again", async () => {
    render(<ExampleAccordion />);
    const trigger = screen.getByRole("button", { name: "Question one" });
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    expect(screen.queryByText("Answer one")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ExampleAccordion />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
