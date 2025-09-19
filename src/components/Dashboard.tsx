import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SimpleChart } from '@/components/charts/SimpleChart';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  MapPin,
  Star,
  FileText,
  Filter
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for charts and statistics
  const reportStats = [
    { label: 'Open', value: 45, color: 'hsl(var(--warning))' },
    { label: 'In Progress', value: 23, color: 'hsl(var(--primary))' },
    { label: 'Resolved', value: 67, color: 'hsl(var(--success))' },
    { label: 'Escalated', value: 8, color: 'hsl(var(--destructive))' }
  ];

  const monthlyTrends = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 90 },
    { label: 'Apr', value: 87 },
    { label: 'May', value: 95 },
    { label: 'Jun', value: 112 }
  ];

  const quickStats = [
    {
      title: 'Total Reports',
      value: '1,234',
      change: '+12%',
      icon: FileText,
      color: 'text-primary'
    },
    {
      title: 'Active Citizens',
      value: '856',
      change: '+8%',
      icon: Users,
      color: 'text-accent'
    },
    {
      title: 'Resolution Rate',
      value: '89%',
      change: '+3%',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-15%',
      icon: Clock,
      color: 'text-warning'
    }
  ];

  const recentReports = [
    {
      id: 'RPT-001',
      title: 'Broken Street Light on Main Road',
      location: 'Downtown, Zone A',
      status: 'open',
      priority: 'high',
      votes: 23,
      timeAgo: '2 hours ago'
    },
    {
      id: 'RPT-002',
      title: 'Pothole near City Park',
      location: 'Central Park Area',
      status: 'in_progress',
      priority: 'medium',
      votes: 15,
      timeAgo: '4 hours ago'
    },
    {
      id: 'RPT-003',
      title: 'Garbage Collection Delay',
      location: 'Residential Block C',
      status: 'resolved',
      priority: 'low',
      votes: 8,
      timeAgo: '1 day ago'
    }
  ];

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

  return (
    <div className="space-y-8 animate-luxury-fade-in">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's what's happening with civic reports today
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
          {user?.role === 'super_admin' ? 'Super Administrator' : 'Administrator'}
        </Badge>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Card className="card-luxury hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-accent/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Report Status Distribution
              </CardTitle>
              <CardDescription>
                Current status breakdown of all reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleChart data={reportStats} type="pie" height={200} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Monthly Report Trends
              </CardTitle>
              <CardDescription>
                Report submissions over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleChart data={monthlyTrends} type="bar" height={200} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Card className="card-luxury">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Recent Reports
              </CardTitle>
              <CardDescription>
                Latest civic issue reports requiring attention
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`p-4 rounded-lg border-l-4 bg-card/50 hover:bg-card/80 transition-colors ${getPriorityColor(report.priority)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">
                          {report.id}
                        </span>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {report.priority}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-lg mb-1">{report.title}</h4>
                      <p className="text-muted-foreground flex items-center gap-1 mb-2">
                        <MapPin className="w-4 h-4" />
                        {report.location}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          {report.votes} votes
                        </span>
                        <span>{report.timeAgo}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;