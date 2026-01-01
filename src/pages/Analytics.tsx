import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { UserGrowthChart } from '@/components/dashboard/UserGrowthChart';
import { VerificationChart } from '@/components/dashboard/VerificationChart';
import { InstitutionChart } from '@/components/dashboard/InstitutionChart';
import { StatCard } from '@/components/dashboard/StatCard';
import {
  dashboardStats,
  userGrowthData,
  verificationStatusData,
  institutionOnboardingData,
} from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, Users, Building2, CheckCircle2 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="animate-fade-in">
        <PageHeader
          title="Platform Analytics"
          description="Comprehensive analytics and insights about your platform."
          actions={
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          }
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="User Growth Rate"
            value="+8.5%"
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            title="Active Users"
            value="18,420"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Institutions Added"
            value="14"
            icon={Building2}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Verification Rate"
            value="98.2%"
            icon={CheckCircle2}
            variant="info"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UserGrowthChart data={userGrowthData} />
          <InstitutionChart data={institutionOnboardingData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VerificationChart data={verificationStatusData} />
          
          {/* Summary Cards */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">Verified Accounts</p>
                    <p className="text-sm text-muted-foreground">Total verified users</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-success">
                  {dashboardStats.verifiedAccounts.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Users className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">Pending Verifications</p>
                    <p className="text-sm text-muted-foreground">Awaiting review</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-warning">
                  {dashboardStats.pendingVerifications}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Total Institutions</p>
                    <p className="text-sm text-muted-foreground">Active on platform</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  {dashboardStats.totalInstitutions}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
