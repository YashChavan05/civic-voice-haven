import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Shield, 
  Crown,
  Search,
  Filter,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  username: string;
  aadhaar: string;
  dob: string;
  phone: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  role: 'admin';
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  departments: string[];
}

const AdminManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [reviewReason, setReviewReason] = useState('');

  // Mock admin applications data
  const [adminApplications, setAdminApplications] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      username: 'admin1',
      aadhaar: '1234-5678-9012',
      dob: '1985-06-15',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Downtown District',
      status: 'approved',
      role: 'admin',
      appliedAt: '2024-01-15T10:30:00Z',
      reviewedAt: '2024-01-16T14:20:00Z',
      reviewedBy: 'Super Administrator',
      departments: ['Infrastructure', 'Transportation']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      username: 'admin2',
      aadhaar: '9876-5432-1098',
      dob: '1990-03-22',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Avenue, Residential Zone B',
      status: 'pending',
      role: 'admin',
      appliedAt: '2024-01-18T09:15:00Z',
      departments: ['Waste Management', 'Environment']
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      username: 'admin3',
      aadhaar: '5555-4444-3333',
      dob: '1988-11-08',
      phone: '+1 (555) 444-5555',
      address: '789 Pine Street, Commercial District',
      status: 'pending',
      role: 'admin',
      appliedAt: '2024-01-19T16:45:00Z',
      departments: ['Public Safety', 'Emergency Services']
    },
    {
      id: '4',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      username: 'admin4',
      aadhaar: '7777-8888-9999',
      dob: '1992-07-12',
      phone: '+1 (555) 777-8888',
      address: '321 Elm Street, Suburban Area',
      status: 'rejected',
      role: 'admin',
      appliedAt: '2024-01-10T11:20:00Z',
      reviewedAt: '2024-01-12T15:30:00Z',
      reviewedBy: 'Super Administrator',
      rejectionReason: 'Incomplete documentation and failed background verification',
      departments: ['Parks & Recreation']
    },
    {
      id: '5',
      name: 'David Rodriguez',
      email: 'david.rodriguez@email.com',
      username: 'admin5',
      aadhaar: '2222-3333-4444',
      dob: '1987-04-25',
      phone: '+1 (555) 222-3333',
      address: '654 Maple Drive, Industrial Zone',
      status: 'pending',
      role: 'admin',
      appliedAt: '2024-01-20T13:10:00Z',
      departments: ['Water & Utilities', 'Engineering']
    }
  ]);

  const filteredApplications = adminApplications.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Shield className="w-4 h-4" />;
      case 'approved': return <UserCheck className="w-4 h-4" />;
      case 'rejected': return <UserX className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const handleApproveAdmin = (adminId: string, reason: string) => {
    setAdminApplications(prev => prev.map(admin =>
      admin.id === adminId
        ? {
            ...admin,
            status: 'approved' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: user?.name || 'Super Administrator'
          }
        : admin
    ));

    toast({
      title: "Admin Approved",
      description: `Admin application has been approved successfully`,
      className: "bg-success text-success-foreground"
    });

    setSelectedAdmin(null);
    setReviewReason('');
  };

  const handleRejectAdmin = (adminId: string, reason: string) => {
    if (!reason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }

    setAdminApplications(prev => prev.map(admin =>
      admin.id === adminId
        ? {
            ...admin,
            status: 'rejected' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: user?.name || 'Super Administrator',
            rejectionReason: reason
          }
        : admin
    ));

    toast({
      title: "Admin Rejected",
      description: `Admin application has been rejected`,
      className: "bg-destructive text-destructive-foreground"
    });

    setSelectedAdmin(null);
    setReviewReason('');
  };

  const stats = [
    {
      title: 'Total Applications',
      value: adminApplications.length,
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Pending Review',
      value: adminApplications.filter(a => a.status === 'pending').length,
      icon: Shield,
      color: 'text-warning'
    },
    {
      title: 'Approved Admins',
      value: adminApplications.filter(a => a.status === 'approved').length,
      icon: UserCheck,
      color: 'text-success'
    },
    {
      title: 'Rejected',
      value: adminApplications.filter(a => a.status === 'rejected').length,
      icon: UserX,
      color: 'text-destructive'
    }
  ];

  // Only show this page to super admin
  if (user?.role !== 'super_admin') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="card-luxury max-w-md text-center">
          <CardContent className="p-8">
            <Crown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">
              This page is only accessible to Super Administrators.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-luxury-fade-in">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Admin Management</h1>
          <p className="text-muted-foreground text-lg">
            Review and manage administrator account applications
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          <Crown className="w-4 h-4 mr-2" />
          Super Admin Only
        </Badge>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title} className="card-luxury">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-accent/10 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-accent" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Applications</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, or username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Status Filter</Label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Applications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle>Admin Applications ({filteredApplications.length})</CardTitle>
            <CardDescription>
              Review administrator account requests and manage approvals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredApplications.map((admin, index) => (
                <motion.div
                  key={admin.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{admin.name}</h3>
                          <p className="text-sm text-muted-foreground">@{admin.username}</p>
                        </div>
                        <Badge className={getStatusColor(admin.status)}>
                          {getStatusIcon(admin.status)}
                          <span className="ml-2 capitalize">{admin.status}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{admin.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{admin.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>DOB: {new Date(admin.dob).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{admin.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                          <span>Aadhaar: {admin.aadhaar}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>Applied: {new Date(admin.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label className="text-sm font-medium">Requested Departments:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {admin.departments.map((dept, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {admin.status === 'approved' && (
                        <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-sm">
                          <strong className="text-success">Approved</strong> by {admin.reviewedBy} on{' '}
                          {admin.reviewedAt && new Date(admin.reviewedAt).toLocaleDateString()}
                        </div>
                      )}

                      {admin.status === 'rejected' && admin.rejectionReason && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm">
                          <strong className="text-destructive">Rejected</strong> by {admin.reviewedBy} on{' '}
                          {admin.reviewedAt && new Date(admin.reviewedAt).toLocaleDateString()}
                          <br />
                          <strong>Reason:</strong> {admin.rejectionReason}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{admin.name} - Application Details</DialogTitle>
                            <DialogDescription>
                              Complete information for administrator application
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <h4 className="font-semibold">Full Name</h4>
                                <p>{admin.name}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Username</h4>
                                <p>{admin.username}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Email</h4>
                                <p>{admin.email}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Phone</h4>
                                <p>{admin.phone}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Date of Birth</h4>
                                <p>{new Date(admin.dob).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Aadhaar Number</h4>
                                <p>{admin.aadhaar}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold">Address</h4>
                              <p>{admin.address}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Requested Departments</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {admin.departments.map((dept, idx) => (
                                  <Badge key={idx} variant="outline">{dept}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {admin.status === 'pending' && (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                className="gap-2 btn-luxury"
                                onClick={() => setSelectedAdmin(admin)}
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Approve Admin Application</DialogTitle>
                                <DialogDescription>
                                  Approve {admin.name}'s administrator account request
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p>Are you sure you want to approve this application? The user will gain administrator access to the system.</p>
                                <div className="space-y-2">
                                  <Label>Approval Note (Optional)</Label>
                                  <Textarea
                                    value={reviewReason}
                                    onChange={(e) => setReviewReason(e.target.value)}
                                    placeholder="Add any notes about this approval..."
                                  />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button variant="outline" onClick={() => setSelectedAdmin(null)}>
                                    Cancel
                                  </Button>
                                  <Button 
                                    onClick={() => handleApproveAdmin(admin.id, reviewReason)}
                                    className="btn-luxury"
                                  >
                                    Approve Application
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                className="gap-2"
                                onClick={() => setSelectedAdmin(admin)}
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reject Admin Application</DialogTitle>
                                <DialogDescription>
                                  Reject {admin.name}'s administrator account request
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Rejection Reason (Required)</Label>
                                  <Textarea
                                    value={reviewReason}
                                    onChange={(e) => setReviewReason(e.target.value)}
                                    placeholder="Provide a clear reason for rejection..."
                                    required
                                  />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button variant="outline" onClick={() => setSelectedAdmin(null)}>
                                    Cancel
                                  </Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleRejectAdmin(admin.id, reviewReason)}
                                  >
                                    Reject Application
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Applications Found</h3>
                  <p className="text-muted-foreground">
                    No admin applications match your current filters.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminManagement;