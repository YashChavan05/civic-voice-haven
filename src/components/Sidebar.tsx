import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Map, 
  Trophy, 
  Users, 
  Settings, 
  LogOut,
  Shield,
  Crown,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      roles: ['admin', 'super_admin']
    },
    {
      label: 'Reports Management',
      icon: FileText,
      path: '/reports',
      roles: ['admin', 'super_admin']
    },
    {
      label: 'Heat Map',
      icon: Map,
      path: '/heatmap',
      roles: ['admin', 'super_admin']
    },
    {
      label: 'Leaderboard',
      icon: Trophy,
      path: '/leaderboard',
      roles: ['admin', 'super_admin']
    },
    {
      label: 'Admin Management',
      icon: Users,
      path: '/admin-management',
      roles: ['super_admin']
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/settings',
      roles: ['admin', 'super_admin']
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'admin')
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        className="fixed left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-xl border-r border-border/50 shadow-luxury z-50 lg:relative lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                className="flex items-center gap-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gradient-gold">CivicVoice</h2>
                  <p className="text-xs text-muted-foreground">Admin Portal</p>
                </div>
              </motion.div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* User Info */}
            <motion.div
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                {user?.role === 'super_admin' ? (
                  <Crown className="w-5 h-5 text-accent" />
                ) : (
                  <Shield className="w-5 h-5 text-primary-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user?.name}</p>
                <Badge 
                  variant="outline" 
                  className="text-xs px-2 py-0"
                >
                  {user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'bg-accent text-accent-foreground shadow-lg'
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  isActive(item.path) ? 'text-accent-foreground' : 'group-hover:text-accent'
                }`} />
                <span className="font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-accent-foreground rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50 space-y-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
              )}
              <span className="text-muted-foreground group-hover:text-foreground font-medium">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </motion.button>

            {/* Logout */}
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;