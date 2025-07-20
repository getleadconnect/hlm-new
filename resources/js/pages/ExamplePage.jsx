import React from 'react';
// ✅ CORRECT: Import all components from the centralized index
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Badge,
  PriorityBadge,
  StatusBadge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  EmptyStates
} from '@/components/ui';

// This is an example of how to properly use the centralized components
function ExamplePage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [tickets, setTickets] = React.useState([
    {
      id: '1234',
      subject: 'Cannot login to account',
      customer: 'John Doe',
      status: 'open',
      priority: 'high',
      createdAt: '2 hours ago'
    },
    {
      id: '1235',
      subject: 'Payment not processing',
      customer: 'Jane Smith',
      status: 'pending',
      priority: 'urgent',
      createdAt: '1 hour ago'
    }
  ]);

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Example Page - Correct Component Usage</h1>
      
      {/* Example 1: Using Cards with Badges */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Ticket Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map(ticket => (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>#{ticket.id}</CardTitle>
                    <CardDescription>{ticket.subject}</CardDescription>
                  </div>
                  <Badge variant="outline">{ticket.createdAt}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Customer: {ticket.customer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Example 2: Using Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Ticket Table</h2>
        {tickets.length > 0 ? (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map(ticket => (
                  <TableRow key={ticket.id}>
                    <TableCell>#{ticket.id}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell><StatusBadge status={ticket.status} /></TableCell>
                    <TableCell><PriorityBadge priority={ticket.priority} /></TableCell>
                    <TableCell>{ticket.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <EmptyStates.NoTickets onCreateTicket={() => setDialogOpen(true)} />
        )}
      </section>

      {/* Example 3: Using Dialog */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Ticket</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                This dialog uses our centralized Dialog component.
                Any changes to the Dialog component will reflect here automatically.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Form fields would go here...
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Important Note */}
      <Card className="bg-muted">
        <CardHeader>
          <CardTitle>Important: Component Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            ✅ All components on this page are imported from <code className="bg-background px-1 py-0.5 rounded">@/components/ui</code>
          </p>
          <p className="text-sm">
            ✅ Any changes to these components in <code className="bg-background px-1 py-0.5 rounded">/resources/js/components/ui/</code> will automatically reflect here
          </p>
          <p className="text-sm">
            ❌ Never create duplicate versions of these components
          </p>
          <p className="text-sm">
            ❌ Never import from individual component files like <code className="bg-background px-1 py-0.5 rounded">@/components/ui/button</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExamplePage;