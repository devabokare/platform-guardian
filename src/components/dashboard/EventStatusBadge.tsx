import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, PlayCircle } from 'lucide-react';

type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

interface EventStatusBadgeProps {
  status: EventStatus;
  showIcon?: boolean;
}

const statusConfig = {
  upcoming: {
    label: 'Upcoming',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    icon: Clock,
  },
  ongoing: {
    label: 'Ongoing',
    className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    icon: PlayCircle,
  },
  completed: {
    label: 'Completed',
    className: 'bg-muted text-muted-foreground',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-destructive/10 text-destructive',
    icon: XCircle,
  },
};

export function EventStatusBadge({ status, showIcon = true }: EventStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.className)}>
      {showIcon && <Icon className="h-3.5 w-3.5 mr-1" />}
      {config.label}
    </span>
  );
}
