import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Filter, 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  MapPin,
  Star,
  User,
  Calendar,
  MessageCircle,
  Download,
  RefreshCw
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high';
  submittedBy: string;
  submittedAt: string;
  votes: number;
  comments: number;
  assignedTo?: string;
  images?: string[];
}

const ReportsManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [actionReason, setActionReason] = useState('');

  // Mock reports data
  const [reports, setReports] = useState<Report[]>([
    {
      id: 'RPT-001',
      title: 'Broken Street Light on Main Road',
      description: 'The street light near the intersection of Main Road and Oak Street has been flickering for days and is now completely out. This creates a safety hazard for pedestrians and drivers, especially during nighttime hours.',
      location: 'Main Road & Oak Street, Downtown Zone A',
      category: 'Infrastructure',
      status: 'open',
      priority: 'high',
      submittedBy: 'John Citizen',
      submittedAt: '2024-01-15T10:30:00Z',
      votes: 23,
      comments: 8,
      images: ['street-light-1.jpg', 'street-light-2.jpg']
    },
    {
      id: 'RPT-002',
      title: 'Large Pothole near City Park',
      description: 'A significant pothole has formed on the road leading to City Park. It\'s causing damage to vehicles and creating dangerous driving conditions.',
      location: 'Park Avenue, Central District',
      category: 'Road Maintenance',
      status: 'in_progress',
      priority: 'medium',
      submittedBy: 'Sarah Johnson',
      submittedAt: '2024-01-14T14:20:00Z',
      votes: 15,
      comments: 5,
      assignedTo: 'Road Maintenance Team A'
    },
    {
      id: 'RPT-003',
      title: 'Garbage Collection Delay in Residential Area',
      description: 'Garbage has not been collected for over a week in Residential Block C. This is causing hygiene issues and attracting pests.',
      location: 'Residential Block C, Sector 7',
      category: 'Waste Management',
      status: 'resolved',
      priority: 'low',
      submittedBy: 'Mike Davis',
      submittedAt: '2024-01-10T09:15:00Z',
      votes: 8,
      comments: 3,
      assignedTo: 'Waste Management Department'
    },
    {
      id: 'RPT-004',
      title: 'Water Leak at Bus Stop',
      description: 'Continuous water leak from underground pipe near the main bus stop. Water is pooling and creating slippery conditions.',
      location: 'Central Bus Terminal, Main Square',
      category: 'Water Infrastructure',
      status: 'escalated',
      priority: 'high',
      submittedBy: 'Anna Wilson',
      submittedAt: '2024-01-13T16:45:00Z',
      votes: 31,
      comments: 12,
      assignedTo: 'Emergency Response Team'
    },
    {
      id: 'RPT-005',
      title: 'Playground Equipment Needs Repair',
      description: 'Several pieces of playground equipment at Community Park are broken or unsafe. The swing set has loose chains and the slide has sharp edges.',
      location: 'Community Park, Westside',
      category: 'Recreation',
      status: 'open',
      priority: 'medium',
      submittedBy: 'Parent Committee',
      submittedAt: '2024-01-12T11:30:00Z',
      votes: 19,
      comments: 7
    }
  ]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-warning text-warning-foreground';
      case 'in_progress': return 'bg-primary text-primary-foreground';
      case 'resolved': return 'bg-success text-success-foreground';
      case 'escalated': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  const handleStatusChange = (reportId: string, newStatus: string, reason: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: newStatus as any }
        : report
    ));

    toast({
      title: "Status Updated",
      description: `Report ${reportId} status changed to ${newStatus}`,
      className: "bg-success text-success-foreground"
    });

    setSelectedReport(null);
    setActionReason('');
  };

  const exportReports = () => {
    const csvContent = [
      ['ID', 'Title', 'Location', 'Category', 'Status', 'Priority', 'Submitted By', 'Date', 'Votes'].join(','),
      ...filteredReports.map(report => [
        report.id,
        `"${report.title}"`,
        `"${report.location}"`,
        report.category,
        report.status,
        report.priority,
        report.submittedBy,
        new Date(report.submittedAt).toLocaleDateString(),
        report.votes
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'civic_reports.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Reports exported successfully",
      className: "bg-success text-success-foreground"
    });
  };

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
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Reports Management</h1>
          <p className="text-muted-foreground text-lg">
            Review, approve, and manage civic issue reports from citizens
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportReports} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button className="gap-2 btn-luxury">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-accent" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Reports</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by title, description, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Status Filter</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority Filter</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setPriorityFilter('all');
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

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Reports', value: reports.length, icon: FileText, color: 'text-primary' },
          { label: 'Open', value: reports.filter(r => r.status === 'open').length, icon: AlertTriangle, color: 'text-warning' },
          { label: 'In Progress', value: reports.filter(r => r.status === 'in_progress').length, icon: Clock, color: 'text-primary' },
          { label: 'Resolved', value: reports.filter(r => r.status === 'resolved').length, icon: CheckCircle, color: 'text-success' }
        ].map((stat, index) => (
          <Card key={stat.label} className="card-luxury">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Reports List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Reports ({filteredReports.length})</span>
              <Badge variant="outline">
                {filteredReports.length} of {reports.length} reports
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className={`p-6 rounded-lg border-l-4 bg-card/50 hover:bg-card/80 transition-all duration-300 ${getPriorityColor(report.priority)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{report.id}</span>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {report.priority} priority
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {report.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-xl mb-2">{report.title}</h3>
                      <p className="text-muted-foreground mb-3">{report.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {report.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4" />
                          {report.submittedBy}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.submittedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            {report.votes} votes
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <MessageCircle className="w-4 h-4" />
                            {report.comments} comments
                          </span>
                        </div>
                      </div>

                      {report.assignedTo && (
                        <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                          <strong>Assigned to:</strong> {report.assignedTo}
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
                            <DialogTitle>{report.title}</DialogTitle>
                            <DialogDescription>Report ID: {report.id}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-muted-foreground">{report.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <h4 className="font-semibold">Location</h4>
                                <p>{report.location}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Category</h4>
                                <p>{report.category}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Submitted By</h4>
                                <p>{report.submittedBy}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Date</h4>
                                <p>{new Date(report.submittedAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            {report.images && (
                              <div>
                                <h4 className="font-semibold mb-2">Attachments</h4>
                                <div className="flex gap-2">
                                  {report.images.map((image, idx) => (
                                    <Badge key={idx} variant="outline">{image}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {report.status !== 'resolved' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="gap-2 btn-luxury"
                              onClick={() => setSelectedReport(report)}
                            >
                              Update Status
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Report Status</DialogTitle>
                              <DialogDescription>
                                Change the status of report {report.id}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>New Status</Label>
                                <Select onValueChange={(value) => {
                                  if (value && selectedReport) {
                                    handleStatusChange(selectedReport.id, value, actionReason);
                                  }
                                }}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select new status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="escalated">Escalated</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Reason (Optional)</Label>
                                <Textarea
                                  value={actionReason}
                                  onChange={(e) => setActionReason(e.target.value)}
                                  placeholder="Provide reason for status change..."
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredReports.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
                  <p className="text-muted-foreground">
                    No reports match your current filters. Try adjusting your search criteria.
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

export default ReportsManagement;