import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchFilter } from '@/components/common/SearchFilter';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { ActionButtons } from '@/components/common/ActionButtons';
import { institutions } from '@/data/mockData';
import { Institution, VerificationStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Download, Building2, Users, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'verified', label: 'Verified' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'suspended', label: 'Suspended' },
];

export default function InstitutionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const { toast } = useToast();

  const filteredInstitutions = institutions.filter((institution) => {
    const matchesSearch =
      institution.name.toLowerCase().includes(search.toLowerCase()) ||
      institution.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || institution.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = (institution: Institution) => {
    toast({
      title: 'Institution Verified',
      description: `${institution.name} has been verified successfully.`,
    });
  };

  const handleReject = (institution: Institution) => {
    toast({
      title: 'Institution Rejected',
      description: `${institution.name} has been rejected.`,
      variant: 'destructive',
    });
  };

  const handleSuspend = (institution: Institution) => {
    toast({
      title: 'Institution Suspended',
      description: `${institution.name} has been suspended.`,
    });
  };

  const columns = [
    {
      key: 'name',
      header: 'Institution',
      render: (item: Institution) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'adminName',
      header: 'Admin',
      render: (item: Institution) => (
        <span className="text-foreground">{item.adminName}</span>
      ),
    },
    {
      key: 'stats',
      header: 'Statistics',
      render: (item: Institution) => (
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            {item.totalStudents}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            {item.totalCounselors}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Institution) => <StatusBadge status={item.status} />,
    },
    {
      key: 'createdAt',
      header: 'Registered',
      render: (item: Institution) => (
        <span className="text-muted-foreground">{item.createdAt}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Institution) => (
        <ActionButtons
          status={item.status}
          onView={() => setSelectedInstitution(item)}
          onVerify={() => handleVerify(item)}
          onReject={() => handleReject(item)}
          onSuspend={() => handleSuspend(item)}
          onActivate={() => handleVerify(item)}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="animate-fade-in">
        <PageHeader
          title="Institution Management"
          description="Verify and manage all registered institutions on the platform."
          actions={
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          }
        />

        <SearchFilter
          searchPlaceholder="Search institutions..."
          searchValue={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          statusOptions={statusOptions}
        />

        <DataTable data={filteredInstitutions} columns={columns} />

        {/* Detail Dialog */}
        <Dialog open={!!selectedInstitution} onOpenChange={() => setSelectedInstitution(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                {selectedInstitution?.name}
              </DialogTitle>
              <DialogDescription>Institution details and verification information</DialogDescription>
            </DialogHeader>
            {selectedInstitution && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedInstitution.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedInstitution.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{selectedInstitution.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Admin</p>
                  <p className="font-medium">{selectedInstitution.adminName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={selectedInstitution.status} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registered</p>
                  <p className="font-medium">{selectedInstitution.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="font-medium">{selectedInstitution.totalStudents}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Counselors</p>
                  <p className="font-medium">{selectedInstitution.totalCounselors}</p>
                </div>
                {selectedInstitution.status === 'pending' && (
                  <div className="col-span-2 flex gap-3 mt-4">
                    <Button
                      className="flex-1 bg-success hover:bg-success/90"
                      onClick={() => {
                        handleVerify(selectedInstitution);
                        setSelectedInstitution(null);
                      }}
                    >
                      Verify Institution
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        handleReject(selectedInstitution);
                        setSelectedInstitution(null);
                      }}
                    >
                      Reject Institution
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
