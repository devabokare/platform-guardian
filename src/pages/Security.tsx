import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { activityLogs } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { Building2, GraduationCap, Users, UserCog, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const entityIcons = {
  institution: Building2,
  student: GraduationCap,
  counselor: Users,
  user: UserCog,
};

const getActionIcon = (action: string) => {
  if (action.includes('Verified') || action.includes('Approved')) return CheckCircle;
  if (action.includes('Rejected') || action.includes('Suspended')) return AlertTriangle;
  return Shield;
};

const getActionColor = (action: string) => {
  if (action.includes('Verified') || action.includes('Approved')) return 'text-success';
  if (action.includes('Rejected') || action.includes('Suspended')) return 'text-destructive';
  return 'text-info';
};

export default function SecurityPage() {
  return (
    <AdminLayout>
      <div className="animate-fade-in">
        <PageHeader
          title="Security & Logs"
          description="Monitor platform activity and security events."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Log */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Activity Log</h3>
            <div className="space-y-4">
              {activityLogs.map((log) => {
                const EntityIcon = entityIcons[log.entityType];
                const ActionIcon = getActionIcon(log.action);
                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0 p-2 bg-background rounded-lg">
                      <EntityIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <ActionIcon className={cn('h-4 w-4', getActionColor(log.action))} />
                        <p className="font-medium text-foreground">{log.action}</p>
                      </div>
                      <p className="text-sm text-foreground">{log.entityName}</p>
                      {log.details && (
                        <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>By: {log.performedBy}</span>
                        <span>{formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Stats */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Security Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Failed Logins (24h)</span>
                  <span className="font-semibold text-destructive">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Successful Logins (24h)</span>
                  <span className="font-semibold text-success">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">New Registrations</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Password Resets</span>
                  <span className="font-semibold">5</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Admin Actions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Verifications Today</span>
                  <span className="font-semibold text-success">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rejections Today</span>
                  <span className="font-semibold text-destructive">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Suspensions</span>
                  <span className="font-semibold text-warning">1</span>
                </div>
              </div>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-success" />
                <h3 className="font-semibold text-success">System Status</h3>
              </div>
              <p className="text-sm text-success/80">All systems operational. No security alerts.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
