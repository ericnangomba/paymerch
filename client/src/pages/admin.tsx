import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">P</span>
            </div>
            <h1 className="text-xl font-bold">PayMerch Admin</h1>
          </div>
          <div>
            <Link href="/signup">
              <Button variant="ghost">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-6 py-10">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard (MVP)</h2>
        <p className="mb-6 text-muted-foreground">
          This is an admin area stub. For production, secure this route server-side and require an admin role.
          The admin service account should be configured with the platform's admin key and correct permissions
          to perform administrative duties (manage merchants, payouts, transactions, and settings).
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold">Merchants</h3>
            <p className="text-sm text-muted-foreground">View and manage merchant accounts.</p>
            <div className="mt-4">
              <Button>Open Merchants</Button>
            </div>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold">Transactions</h3>
            <p className="text-sm text-muted-foreground">Search, refund and manage transactions.</p>
            <div className="mt-4">
              <Button>Open Transactions</Button>
            </div>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold">Payouts</h3>
            <p className="text-sm text-muted-foreground">Review and approve payouts.</p>
            <div className="mt-4">
              <Button>Open Payouts</Button>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Tools</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="outline">System Logs</Button>
            <Button variant="outline">Settings</Button>
            <Button variant="outline">API Keys</Button>
            <Button variant="outline">Webhook Management</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
