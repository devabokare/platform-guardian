import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchFilter } from '@/components/common/SearchFilter';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { ActionButtons } from '@/components/common/ActionButtons';
import { students } from '@/data/mockData';
import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { Download, GraduationCap, Building2 } from 'lucide-react';
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

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.institutionName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = (student: Student) => {
    toast({
      title: 'Student Verified',
      description: `${student.name} has been verified successfully.`,
    });
  };

  const handleReject = (student: Student) => {
    toast({
      title: 'Student Rejected',
      description: `${student.name} has been rejected.`,
      variant: 'destructive',
    });
  };

  const columns = [
    {
      key: 'name',
      header: 'Student',
      render: (item: Student) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-accent" />
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
      render: (item: Student) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{item.institutionName}</span>
        </div>
      ),
    },
    {
      key: 'enrollmentNumber',
      header: 'Enrollment #',
      render: (item: Student) => (
        <span className="font-mono text-sm text-muted-foreground">
          {item.enrollmentNumber || '-'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Student) => <StatusBadge status={item.status} />,
    },
    {
      key: 'createdAt',
      header: 'Registered',
      render: (item: Student) => (
        <span className="text-muted-foreground">{item.createdAt}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Student) => (
        <ActionButtons
          status={item.status}
          onView={() => setSelectedStudent(item)}
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
          title="Student Management"
          description="Verify and manage all students across institutions."
          actions={
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          }
        />

        <SearchFilter
          searchPlaceholder="Search students..."
          searchValue={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          statusOptions={statusOptions}
        />

        <DataTable data={filteredStudents} columns={columns} />

        {/* Detail Dialog */}
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-accent" />
                </div>
                {selectedStudent?.name}
              </DialogTitle>
              <DialogDescription>Student details and verification information</DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrollment Number</p>
                  <p className="font-medium">{selectedStudent.enrollmentNumber || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Institution</p>
                  <p className="font-medium">{selectedStudent.institutionName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={selectedStudent.status} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registered</p>
                  <p className="font-medium">{selectedStudent.createdAt}</p>
                </div>
                {selectedStudent.verifiedAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Verified On</p>
                    <p className="font-medium">{selectedStudent.verifiedAt}</p>
                  </div>
                )}
                {selectedStudent.status === 'pending' && (
                  <div className="col-span-2 flex gap-3 mt-4">
                    <Button
                      className="flex-1 bg-success hover:bg-success/90"
                      onClick={() => {
                        handleVerify(selectedStudent);
                        setSelectedStudent(null);
                      }}
                    >
                      Verify Student
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        handleReject(selectedStudent);
                        setSelectedStudent(null);
                      }}
                    >
                      Reject Student
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
