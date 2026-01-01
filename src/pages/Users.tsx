import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchFilter } from '@/components/common/SearchFilter';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { ActionButtons } from '@/components/common/ActionButtons';
import { users } from '@/data/mockData';
import { User, UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Download, Shield, Building2, GraduationCap, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'verified', label: 'Verified' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'suspended', label: 'Suspended' },
];

const roleOptions = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'institution_admin', label: 'Institution Admin' },
  { value: 'student', label: 'Student' },
  { value: 'counselor', label: 'Counselor' },
];

const roleIcons = {
  super_admin: Shield,
  institution_admin: Building2,
  student: GraduationCap,
  counselor: Users,
};

const roleColors = {
  super_admin: 'bg-primary/10 text-primary',
  institution_admin: 'bg-info/10 text-info',
  student: 'bg-accent/10 text-accent',
  counselor: 'bg-warning/10 text-warning',
};

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleBlock = (user: User) => {
    toast({
      title: 'User Blocked',
      description: `${user.name} has been blocked.`,
    });
  };

  const handleUnblock = (user: User) => {
    toast({
      title: 'User Unblocked',
      description: `${user.name} has been unblocked.`,
    });
  };

  const RoleBadge = ({ role }: { role: UserRole }) => {
    const Icon = roleIcons[role];
    const label = roleOptions.find((r) => r.value === role)?.label || role;
    return (
      <Badge variant="secondary" className={cn('gap-1', roleColors[role])}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const columns = [
    {
      key: 'name',
      header: 'User',
      render: (item: User) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              {item.name.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (item: User) => <RoleBadge role={item.role} />,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: User) => <StatusBadge status={item.status} />,
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      render: (item: User) => (
        <span className="text-muted-foreground">{item.lastLogin || '-'}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Joined',
      render: (item: User) => (
        <span className="text-muted-foreground">{item.createdAt}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: User) => (
        <ActionButtons
          status={item.status}
          onView={() => {}}
          onSuspend={() => handleBlock(item)}
          onActivate={() => handleUnblock(item)}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="animate-fade-in">
        <PageHeader
          title="User Management"
          description="Manage all users across the platform."
          actions={
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          }
        />

        <SearchFilter
          searchPlaceholder="Search users..."
          searchValue={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          statusOptions={statusOptions}
          additionalFilters={
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />

        <DataTable data={filteredUsers} columns={columns} />
      </div>
    </AdminLayout>
  );
}
