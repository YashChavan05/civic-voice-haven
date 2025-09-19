import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Palette,
  Save,
  RefreshCw,
  Lock,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.username || '',
    phone: '+1 (555) 123-4567',
    department: 'Infrastructure Management',
    bio: 'Experienced administrator focused on improving civic infrastructure and community engagement.'
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    urgentAlerts: true,
    statusUpdates: true
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    autoApproveReports: false,
    requireManagerApproval: true,
    maxReportsPerDay: 100,
    sessionTimeout: 30,
    twoFactorAuth: false,
    maintenanceMode: false
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully",
      className: "bg-success text-success-foreground"
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
      className: "bg-success text-success-foreground"
    });
  };

  const handleSaveSystem = () => {
    if (user?.role !== 'super_admin') {
      toast({
        title: "Access Denied",
        description: "Only Super Administrators can modify system settings",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "System Settings Updated",
      description: "System configuration has been updated successfully",
      className: "bg-success text-success-foreground"
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be available for download shortly",
      className: "bg-primary text-primary-foreground"
    });
  };

  const settingSections = [
    {
      title: 'Profile Settings',
      description: 'Manage your personal information and account details',
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profileData.department}
                onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>
          <Button onClick={handleSaveProfile} className="btn-luxury gap-2">
            <Save className="w-4 h-4" />
            Save Profile
          </Button>
        </div>
      )
    },
    {
      title: 'Notifications',
      description: 'Configure how you receive updates and alerts',
      icon: Bell,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
              { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
              { key: 'smsNotifications', label: 'SMS Notifications', description: 'Text message alerts' },
              { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary reports every week' },
              { key: 'urgentAlerts', label: 'Urgent Alerts', description: 'High priority issue notifications' },
              { key: 'statusUpdates', label: 'Status Updates', description: 'Report status change notifications' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">{setting.label}</h4>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch
                  checked={notifications[setting.key as keyof typeof notifications]}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, [setting.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
          <Button onClick={handleSaveNotifications} className="btn-luxury gap-2">
            <Save className="w-4 h-4" />
            Save Notifications
          </Button>
        </div>
      )
    },
    {
      title: 'Appearance',
      description: 'Customize the look and feel of your dashboard',
      icon: Palette,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="font-medium">Theme Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Light</span>
                <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                <span className="text-sm">Dark</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3">Theme Preview</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded border bg-card">
                  <div className="w-full h-2 bg-primary rounded mb-2"></div>
                  <div className="w-3/4 h-1 bg-muted rounded mb-1"></div>
                  <div className="w-1/2 h-1 bg-muted rounded"></div>
                </div>
                <div className="p-3 rounded border bg-card">
                  <div className="w-full h-2 bg-accent rounded mb-2"></div>
                  <div className="w-3/4 h-1 bg-muted rounded mb-1"></div>
                  <div className="w-1/2 h-1 bg-muted rounded"></div>
                </div>
                <div className="p-3 rounded border bg-card">
                  <div className="w-full h-2 bg-secondary rounded mb-2"></div>
                  <div className="w-3/4 h-1 bg-muted rounded mb-1"></div>
                  <div className="w-1/2 h-1 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Security',
      description: 'Manage your account security and privacy settings',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={systemSettings.twoFactorAuth}
                onCheckedChange={(checked) => 
                  setSystemSettings(prev => ({ ...prev, twoFactorAuth: checked }))
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) => 
                  setSystemSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 30 }))
                }
                className="w-32"
              />
              <p className="text-xs text-muted-foreground">
                Automatically log out after period of inactivity
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Lock className="w-4 h-4" />
              Change Password
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleExportData}>
              <Database className="w-4 h-4" />
              Export Data
            </Button>
          </div>
        </div>
      )
    }
  ];

  // System Settings section - only for super admin
  if (user?.role === 'super_admin') {
    settingSections.push({
      title: 'System Configuration',
      description: 'Global system settings and administrative controls',
      icon: SettingsIcon,
      content: (
        <div className="space-y-6">
          <Badge variant="outline" className="gap-2 px-3 py-1">
            <Shield className="w-4 h-4" />
            Super Admin Only
          </Badge>
          
          <div className="space-y-4">
            {[
              { 
                key: 'autoApproveReports', 
                label: 'Auto-Approve Reports', 
                description: 'Automatically approve low-priority reports' 
              },
              { 
                key: 'requireManagerApproval', 
                label: 'Require Manager Approval', 
                description: 'High-priority reports need manager approval' 
              },
              { 
                key: 'maintenanceMode', 
                label: 'Maintenance Mode', 
                description: 'Enable system maintenance mode' 
              }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">{setting.label}</h4>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch
                  checked={systemSettings[setting.key as keyof typeof systemSettings] as boolean}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, [setting.key]: checked }))
                  }
                />
              </div>
            ))}
            
            <div className="space-y-2">
              <Label>Max Reports Per Day</Label>
              <Input
                type="number"
                value={systemSettings.maxReportsPerDay}
                onChange={(e) => 
                  setSystemSettings(prev => ({ ...prev, maxReportsPerDay: parseInt(e.target.value) || 100 }))
                }
                className="w-32"
              />
            </div>
          </div>
          
          <Button onClick={handleSaveSystem} className="btn-luxury gap-2">
            <Save className="w-4 h-4" />
            Save System Settings
          </Button>
        </div>
      )
    });
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
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Settings</h1>
          <p className="text-muted-foreground text-lg">
            Manage your account preferences and system configuration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">
            {user?.role === 'super_admin' ? 'Super Administrator' : 'Administrator'}
          </Badge>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <section.icon className="w-5 h-5 text-accent" />
                  </div>
                  {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {section.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Device Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Monitor className="w-5 h-5 text-accent" />
              </div>
              Device & Browser Information
            </CardTitle>
            <CardDescription>Current session and device details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Browser</p>
                  <p className="text-muted-foreground">{navigator.userAgent.split(' ')[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Platform</p>
                  <p className="text-muted-foreground">{navigator.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Last Login</p>
                  <p className="text-muted-foreground">Today, 2:34 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;