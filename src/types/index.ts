export type UserRole = 'super_admin' | 'institution_admin' | 'student' | 'counselor';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'suspended';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: VerificationStatus;
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export interface Institution {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: VerificationStatus;
  documentsUrl?: string;
  totalStudents: number;
  totalCounselors: number;
  createdAt: string;
  verifiedAt?: string;
  adminName: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  institutionId: string;
  institutionName: string;
  status: VerificationStatus;
  enrollmentNumber?: string;
  createdAt: string;
  verifiedAt?: string;
}

export interface Counselor {
  id: string;
  name: string;
  email: string;
  institutionId: string;
  institutionName: string;
  status: VerificationStatus;
  credentials?: string;
  specialization?: string;
  documentsUrl?: string;
  createdAt: string;
  verifiedAt?: string;
}

export interface DashboardStats {
  totalInstitutions: number;
  totalStudents: number;
  totalCounselors: number;
  pendingVerifications: number;
  verifiedAccounts: number;
  rejectedAccounts: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'institution' | 'student' | 'counselor' | 'user';
  entityId: string;
  entityName: string;
  performedBy: string;
  timestamp: string;
  details?: string;
}

export interface ChartData {
  name: string;
  value?: number;
  students?: number;
  counselors?: number;
  [key: string]: string | number | undefined;
}
