import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EventStatusBadge } from '@/components/dashboard/EventStatusBadge';

type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
type EventType = 'webinar' | 'workshop' | 'conference' | 'seminar' | 'orientation';

interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  institution?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Career Counseling Workshop',
    description: 'Interactive workshop on career planning and guidance',
    type: 'workshop',
    status: 'upcoming',
    date: '2026-01-15',
    time: '10:00 AM',
    location: 'Virtual - Zoom',
    organizer: 'Dr. Sarah Johnson',
    attendees: 45,
    maxAttendees: 100,
    institution: 'Harvard University',
  },
  {
    id: '2',
    title: 'University Orientation Program',
    description: 'Welcome session for new students',
    type: 'orientation',
    status: 'ongoing',
    date: '2026-01-05',
    time: '9:00 AM',
    location: 'Main Auditorium',
    organizer: 'Admin Office',
    attendees: 250,
    maxAttendees: 300,
    institution: 'MIT',
  },
  {
    id: '3',
    title: 'EdTech Conference 2026',
    description: 'Annual conference on educational technology trends',
    type: 'conference',
    status: 'upcoming',
    date: '2026-02-20',
    time: '8:00 AM',
    location: 'Convention Center, Boston',
    organizer: 'LiftUpLabs',
    attendees: 500,
    maxAttendees: 1000,
  },
  {
    id: '4',
    title: 'Student Mental Health Webinar',
    description: 'Webinar focusing on student wellness and mental health',
    type: 'webinar',
    status: 'completed',
    date: '2025-12-28',
    time: '2:00 PM',
    location: 'Virtual - Google Meet',
    organizer: 'Counseling Dept',
    attendees: 180,
    maxAttendees: 200,
    institution: 'Stanford University',
  },
  {
    id: '5',
    title: 'Research Methodology Seminar',
    description: 'Advanced research techniques for graduate students',
    type: 'seminar',
    status: 'cancelled',
    date: '2026-01-10',
    time: '3:00 PM',
    location: 'Room 301, Science Building',
    organizer: 'Prof. Michael Chen',
    attendees: 0,
    maxAttendees: 50,
    institution: 'Yale University',
  },
];

const eventTypeColors: Record<EventType, string> = {
  webinar: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  workshop: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  conference: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  seminar: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  orientation: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCancelEvent = (eventId: string) => {
    setEvents(
      events.map((e) =>
        e.id === eventId ? { ...e, status: 'cancelled' as EventStatus } : e
      )
    );
    toast({
      title: 'Event Cancelled',
      description: 'The event has been cancelled.',
      variant: 'destructive',
    });
  };

  const stats = {
    total: events.length,
    upcoming: events.filter((e) => e.status === 'upcoming').length,
    ongoing: events.filter((e) => e.status === 'ongoing').length,
    completed: events.filter((e) => e.status === 'completed').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Event Management"
          description="Create, manage, and monitor platform events"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Events</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.upcoming}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.ongoing}</p>
                <p className="text-sm text-muted-foreground">Ongoing</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-[250px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="orientation">Orientation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="Enter event title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Event description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="orientation">Orientation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxAttendees">Max Attendees</Label>
                    <Input id="maxAttendees" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Event location or virtual link" />
                </div>
                <Button className="w-full mt-2">Create Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="bg-muted/50 font-medium">Event</TableHead>
                <TableHead className="bg-muted/50 font-medium">Type</TableHead>
                <TableHead className="bg-muted/50 font-medium">Date & Time</TableHead>
                <TableHead className="bg-muted/50 font-medium">Location</TableHead>
                <TableHead className="bg-muted/50 font-medium">Attendees</TableHead>
                <TableHead className="bg-muted/50 font-medium">Status</TableHead>
                <TableHead className="bg-muted/50 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-foreground">{event.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {event.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${eventTypeColors[event.type]}`}
                    >
                      {event.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="truncate max-w-[150px]">{event.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">
                        {event.attendees}/{event.maxAttendees}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <EventStatusBadge status={event.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {event.status === 'upcoming' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleCancelEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Event Details Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
            </DialogHeader>
            {selectedEvent && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 capitalize">{selectedEvent.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className="ml-2">
                      <EventStatusBadge status={selectedEvent.status} />
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <span className="ml-2">{selectedEvent.date}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time:</span>
                    <span className="ml-2">{selectedEvent.time}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="ml-2">{selectedEvent.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Organizer:</span>
                    <span className="ml-2">{selectedEvent.organizer}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Attendees:</span>
                    <span className="ml-2">
                      {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                    </span>
                  </div>
                  {selectedEvent.institution && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Institution:</span>
                      <span className="ml-2">{selectedEvent.institution}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {selectedEvent.status === 'upcoming' && (
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        handleCancelEvent(selectedEvent.id);
                        setSelectedEvent(null);
                      }}
                    >
                      Cancel Event
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
