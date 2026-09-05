import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

const meta: Meta = {
  title: "Fors/Accordion",
};
export default meta;
type Story = StoryObj;

export const SingleOpen: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="billing" className="w-96">
      <AccordionItem value="billing">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          You're billed monthly based on your plan. Upgrades take effect immediately; downgrades
          apply next cycle.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="cancel">
        <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
        <AccordionContent>
          Yes — cancel from Settings and you'll keep access until the period ends.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>What support is included?</AccordionTrigger>
        <AccordionContent>
          Every plan includes email support; Pro adds priority response times.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
