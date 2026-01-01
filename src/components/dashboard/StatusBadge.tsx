import { VerificationStatus } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, Ban } from 'lucide-react';

interface StatusBadgeProps {
  status: VerificationStatus;
  showIcon?: boolean;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'status-pending',
    icon: Clock,
  },
  verified: {
    label: 'Verified',
    className: 'status-verified',
    icon: CheckCircle2,
  },
  rejected: {
    label: 'Rejected',
    className: 'status-rejected',
    icon: XCircle,
  },
  suspended: {
    label: 'Suspended',
    className: 'status-suspended',
    icon: Ban,
  },
};

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn('status-badge', config.className)}>
      {showIcon && <Icon className="h-3.5 w-3.5 mr-1" />}
      {config.label}
    </span>
  );
}
