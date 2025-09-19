import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderPageContent = () => {
    switch (location.pathname) {
      case '/dashboard':
        return <Dashboard />;
      case '/reports':
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gradient-gold mb-4">Reports Management</h1>
            <p className="text-muted-foreground">Coming soon - Advanced report filtering and management</p>
          </div>
        );
      case '/heatmap':
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gradient-gold mb-4">Interactive Heat Map</h1>
            <p className="text-muted-foreground">Coming soon - Geographic visualization of civic issues</p>
          </div>
        );
      case '/leaderboard':
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gradient-gold mb-4">Citizen Leaderboard</h1>
            <p className="text-muted-foreground">Coming soon - Top contributing citizens</p>
          </div>
        );
      case '/admin-management':
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gradient-gold mb-4">Admin Management</h1>
            <p className="text-muted-foreground">Coming soon - Manage admin accounts and permissions</p>
          </div>
        );
      case '/settings':
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gradient-gold mb-4">Settings</h1>
            <p className="text-muted-foreground">Coming soon - System configuration</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-animated flex">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <motion.header
          className="lg:hidden flex items-center justify-between p-4 border-b border-border/50 bg-card/60 backdrop-blur-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="gap-2"
          >
            <Menu className="w-5 h-5" />
            Menu
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-accent-foreground">CV</span>
            </div>
            <span className="font-bold text-gradient-gold">CivicVoice</span>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {renderPageContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;