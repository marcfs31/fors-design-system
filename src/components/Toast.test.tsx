import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { Toaster, toast } from "./Toast";

describe("Toast", () => {
  it("renders a toast enqueued via toast()", async () => {
    render(<Toaster />);
    act(() => {
      toast({ title: "Deployed", description: "v14 is live." });
    });
    await waitFor(() => expect(screen.getByText("Deployed")).toBeInTheDocument());
    expect(screen.getByText("v14 is live.")).toBeInTheDocument();
  });
});
