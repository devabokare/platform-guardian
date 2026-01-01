import { CheckCircle, XCircle, Ban, Eye, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { VerificationStatus } from '@/types';

interface ActionButtonsProps {
  status: VerificationStatus;
  onView?: () => void;
  onVerify?: () => void;
  onReject?: () => void;
  onSuspend?: () => void;
  onActivate?: () => void;
}

export function ActionButtons({
  status,
  onView,
  onVerify,
  onReject,
  onSuspend,
  onActivate,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {onView && (
        <Button variant="ghost" size="icon" onClick={onView} title="View Details">
          <Eye className="h-4 w-4" />
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onView && (
            <DropdownMenuItem onClick={onView}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
          )}
          {status === 'pending' && onVerify && (
            <DropdownMenuItem onClick={onVerify} className="text-success">
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify
            </DropdownMenuItem>
          )}
          {status === 'pending' && onReject && (
            <DropdownMenuItem onClick={onReject} className="text-destructive">
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </DropdownMenuItem>
          )}
          {status === 'verified' && onSuspend && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSuspend} className="text-warning">
                <Ban className="h-4 w-4 mr-2" />
                Suspend
              </DropdownMenuItem>
            </>
          )}
          {status === 'suspended' && onActivate && (
            <DropdownMenuItem onClick={onActivate} className="text-success">
              <CheckCircle className="h-4 w-4 mr-2" />
              Reactivate
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
