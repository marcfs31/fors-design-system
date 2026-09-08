// Server Component page: library components used directly in an RSC tree
// (the package's own "use client" boundary must make this work), plus one
// element styled with the token vocabulary from the consumer's Tailwind.
import { Button, Card, CardContent, CardHeader, CardTitle } from "@marcfs31/design-system";

export default function Page() {
  return (
    <main className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Consumer fixture</CardTitle>
        </CardHeader>
        <CardContent>
          <Button data-testid="fixture-button">Deploy</Button>
          <div data-testid="fixture-token-utility" className="bg-accent text-accent-fg rounded-md">
            token utility
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
