import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Crown, Star, Medal, Award, Users, TrendingUp, Calendar } from 'lucide-react';

interface Citizen {
  id: string;
  name: string;
  email: string;
  totalReports: number;
  resolvedReports: number;
  votes: number;
  rank: number;
  joinDate: string;
  badge: 'bronze' | 'silver' | 'gold' | 'platinum';
  avatar?: string;
  recentActivity: string;
}

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('all_time');
  const [categoryFilter, setCategoryFilter] = useState('overall');

  // Mock leaderboard data
  const citizens: Citizen[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      totalReports: 47,
      resolvedReports: 42,
      votes: 234,
      rank: 1,
      joinDate: '2023-03-15',
      badge: 'platinum',
      recentActivity: 'Submitted water leak report 2 hours ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mike.chen@email.com',
      totalReports: 38,
      resolvedReports: 35,
      votes: 198,
      rank: 2,
      joinDate: '2023-05-20',
      badge: 'gold',
      recentActivity: 'Voted on street light issue 1 day ago'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      totalReports: 32,
      resolvedReports: 28,
      votes: 167,
      rank: 3,
      joinDate: '2023-04-10',
      badge: 'gold',
      recentActivity: 'Submitted park maintenance report 3 days ago'
    },
    {
      id: '4',
      name: 'David Thompson',
      email: 'david.t@email.com',
      totalReports: 28,
      resolvedReports: 24,
      votes: 145,
      rank: 4,
      joinDate: '2023-06-05',
      badge: 'silver',
      recentActivity: 'Commented on traffic signal issue 5 days ago'
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      totalReports: 25,
      resolvedReports: 22,
      votes: 132,
      rank: 5,
      joinDate: '2023-07-12',
      badge: 'silver',
      recentActivity: 'Submitted noise complaint report 1 week ago'
    },
    {
      id: '6',
      name: 'James Wilson',
      email: 'james.w@email.com',
      totalReports: 22,
      resolvedReports: 19,
      votes: 118,
      rank: 6,
      joinDate: '2023-08-03',
      badge: 'bronze',
      recentActivity: 'Voted on garbage collection issue 2 weeks ago'
    },
    {
      id: '7',
      name: 'Maria Garcia',
      email: 'maria.g@email.com',
      totalReports: 20,
      resolvedReports: 17,
      votes: 105,
      rank: 7,
      joinDate: '2023-09-15',
      badge: 'bronze',
      recentActivity: 'Submitted pothole report 3 weeks ago'
    },
    {
      id: '8',
      name: 'Robert Brown',
      email: 'robert.b@email.com',
      totalReports: 18,
      resolvedReports: 15,
      votes: 92,
      rank: 8,
      joinDate: '2023-10-01',
      badge: 'bronze',
      recentActivity: 'Voted on playground safety issue 1 month ago'
    }
  ];

  const getBadgeIcon = (badge: string, size: number = 5) => {
    const className = `w-${size} h-${size}`;
    switch (badge) {
      case 'platinum':
        return <Crown className={`${className} text-purple-500`} />;
      case 'gold':
        return <Trophy className={`${className} text-yellow-500`} />;
      case 'silver':
        return <Medal className={`${className} text-gray-400`} />;
      case 'bronze':
        return <Award className={`${className} text-orange-600`} />;
      default:
        return <Star className={`${className} text-muted-foreground`} />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'platinum':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'gold':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'silver':
        return 'bg-gray-400/10 text-gray-500 border-gray-400/20';
      case 'bronze':
        return 'bg-orange-600/10 text-orange-600 border-orange-600/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold">#{rank}</span>;
  };

  const getResolutionRate = (resolved: number, total: number) => {
    return total > 0 ? Math.round((resolved / total) * 100) : 0;
  };

  const topThree = citizens.slice(0, 3);
  const remaining = citizens.slice(3);

  const stats = [
    {
      title: 'Total Citizens',
      value: citizens.length.toLocaleString(),
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Active This Month',
      value: '42',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      title: 'Platinum Members',
      value: citizens.filter(c => c.badge === 'platinum').length.toString(),
      icon: Crown,
      color: 'text-purple-500'
    },
    {
      title: 'Total Reports',
      value: citizens.reduce((sum, c) => sum + c.totalReports, 0).toLocaleString(),
      icon: Star,
      color: 'text-accent'
    }
  ];

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
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Citizen Leaderboard</h1>
          <p className="text-muted-foreground text-lg">
            Recognizing our most active and engaged community members
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          <Trophy className="w-4 h-4 mr-2" />
          Community Champions
        </Badge>
      </motion.div>

      {/* Stats Grid */}
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
            <CardTitle>Leaderboard Filters</CardTitle>
            <CardDescription>
              Customize the leaderboard view by time period and category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_time">All Time</SelectItem>
                    <SelectItem value="this_year">This Year</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="this_week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overall">Overall Score</SelectItem>
                    <SelectItem value="reports">Most Reports</SelectItem>
                    <SelectItem value="votes">Most Votes</SelectItem>
                    <SelectItem value="resolved">Resolution Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Card className="card-luxury">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              Top Contributors
            </CardTitle>
            <CardDescription>Our community champions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topThree.map((citizen, index) => (
                <motion.div
                  key={citizen.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className={`text-center p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400/10 to-gray-500/5 border-gray-400/20' :
                    'bg-gradient-to-br from-orange-600/10 to-orange-700/5 border-orange-600/20'
                  }`}
                >
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mb-2">
                      {citizen.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      {getRankIcon(citizen.rank)}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{citizen.name}</h3>
                  <Badge className={`mb-3 ${getBadgeColor(citizen.badge)}`}>
                    {getBadgeIcon(citizen.badge, 4)}
                    <span className="ml-2 capitalize">{citizen.badge}</span>
                  </Badge>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reports:</span>
                      <span className="font-semibold">{citizen.totalReports}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Votes:</span>
                      <span className="font-semibold">{citizen.votes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolution:</span>
                      <span className="font-semibold">{getResolutionRate(citizen.resolvedReports, citizen.totalReports)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle>Complete Leaderboard</CardTitle>
            <CardDescription>
              All community members ranked by their contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {citizens.map((citizen, index) => (
                <motion.div
                  key={citizen.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-card/80 transition-all duration-300 border border-border/50"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      {getRankIcon(citizen.rank)}
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                        {citizen.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold">{citizen.name}</h4>
                        <Badge className={`text-xs ${getBadgeColor(citizen.badge)}`}>
                          {getBadgeIcon(citizen.badge, 3)}
                          <span className="ml-1 capitalize">{citizen.badge}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{citizen.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">{citizen.recentActivity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 text-center text-sm">
                    <div>
                      <p className="font-semibold">{citizen.totalReports}</p>
                      <p className="text-muted-foreground text-xs">Reports</p>
                    </div>
                    <div>
                      <p className="font-semibold">{citizen.votes}</p>
                      <p className="text-muted-foreground text-xs">Votes</p>
                    </div>
                    <div>
                      <p className="font-semibold">{getResolutionRate(citizen.resolvedReports, citizen.totalReports)}%</p>
                      <p className="text-muted-foreground text-xs">Resolved</p>
                    </div>
                    <div>
                      <p className="font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(citizen.joinDate).getFullYear()}
                      </p>
                      <p className="text-muted-foreground text-xs">Joined</p>
                    </div>
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

export default Leaderboard;