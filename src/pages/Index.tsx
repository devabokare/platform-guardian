import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { UserGrowthChart } from '@/components/dashboard/UserGrowthChart';
import { VerificationChart } from '@/components/dashboard/VerificationChart';
import { InstitutionChart } from '@/components/dashboard/InstitutionChart';
import {
  dashboardStats,
  activityLogs,
  userGrowthData,
  verificationStatusData,
  institutionOnboardingData,
} from '@/data/mockData';
import { Building2, GraduationCap, Users, Clock, CheckCircle2, XCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-description">
            Welcome back! Here's what's happening on your platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Total Institutions"
            value={dashboardStats.totalInstitutions}
            icon={Building2}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Students"
            value={dashboardStats.totalStudents}
            icon={GraduationCap}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Total Counselors"
            value={dashboardStats.totalCounselors}
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Pending"
            value={dashboardStats.pendingVerifications}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Verified"
            value={dashboardStats.verifiedAccounts}
            icon={CheckCircle2}
            variant="success"
          />
          <StatCard
            title="Rejected"
            value={dashboardStats.rejectedAccounts}
            icon={XCircle}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UserGrowthChart data={userGrowthData} />
          <VerificationChart data={verificationStatusData} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InstitutionChart data={institutionOnboardingData} />
          </div>
          <RecentActivity activities={activityLogs.slice(0, 5)} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
