import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchFilter } from '@/components/common/SearchFilter';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { ActionButtons } from '@/components/common/ActionButtons';
import { counselors } from '@/data/mockData';
import { Counselor } from '@/types';
import { Button } from '@/components/ui/button';
import { Download, Users, Building2, Award } from 'lucide-react';
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
];

export default function CounselorsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const { toast } = useToast();

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.name.toLowerCase().includes(search.toLowerCase()) ||
      counselor.email.toLowerCase().includes(search.toLowerCase()) ||
      counselor.institutionName.toLowerCase().includes(search.toLowerCase()) ||
      (counselor.specialization?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'all' || counselor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = (counselor: Counselor) => {
    toast({
      title: 'Counselor Verified',
      description: `${counselor.name} has been verified successfully.`,
    });
  };

  const handleReject = (counselor: Counselor) => {
    toast({
      title: 'Counselor Rejected',
      description: `${counselor.name} has been rejected.`,
      variant: 'destructive',
    });
  };

  const columns = [
    {
      key: 'name',
      header: 'Counselor',
      render: (item: Counselor) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-info" />
          </div>
          <div>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'institution',
      header: 'Institution',
      render: (item: Counselor) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{item.institutionName}</span>
        </div>
      ),
    },
    {
      key: 'specialization',
      header: 'Specialization',
      render: (item: Counselor) => (
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{item.specialization || '-'}</span>
        </div>
      ),
    },
    {
      key: 'credentials',
      header: 'Credentials',
      render: (item: Counselor) => (
        <span className="text-muted-foreground">{item.credentials || '-'}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Counselor) => <StatusBadge status={item.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Counselor) => (
        <ActionButtons
          status={item.status}
          onView={() => setSelectedCounselor(item)}
          onVerify={() => handleVerify(item)}
          onReject={() => handleReject(item)}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="animate-fade-in">
        <PageHeader
          title="Counselor Management"
          description="Verify and manage all counselors across institutions."
          actions={
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          }
        />

        <SearchFilter
          searchPlaceholder="Search counselors..."
          searchValue={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          statusOptions={statusOptions}
        />

        <DataTable data={filteredCounselors} columns={columns} />

        {/* Detail Dialog */}
        <Dialog open={!!selectedCounselor} onOpenChange={() => setSelectedCounselor(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-info" />
                </div>
                {selectedCounselor?.name}
              </DialogTitle>
              <DialogDescription>Counselor details and verification information</DialogDescription>
            </DialogHeader>
            {selectedCounselor && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedCounselor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Specialization</p>
                  <p className="font-medium">{selectedCounselor.specialization || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Institution</p>
                  <p className="font-medium">{selectedCounselor.institutionName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Credentials</p>
                  <p className="font-medium">{selectedCounselor.credentials || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={selectedCounselor.status} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registered</p>
                  <p className="font-medium">{selectedCounselor.createdAt}</p>
                </div>
                {selectedCounselor.status === 'pending' && (
                  <div className="col-span-2 flex gap-3 mt-4">
                    <Button
                      className="flex-1 bg-success hover:bg-success/90"
                      onClick={() => {
                        handleVerify(selectedCounselor);
                        setSelectedCounselor(null);
                      }}
                    >
                      Verify Counselor
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        handleReject(selectedCounselor);
                        setSelectedCounselor(null);
                      }}
                    >
                      Reject Counselor
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
