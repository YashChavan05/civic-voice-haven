import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Shield, Crown, Moon, Sun, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'super_admin' | 'admin'>('admin');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password, role);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: `Welcome to CivicVoice ${role === 'super_admin' ? 'Super Admin' : 'Admin'} Panel`,
          className: "bg-success text-success-foreground"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials or account not approved",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-luxury-animated flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-full bg-card/60 backdrop-blur-xl border border-border/50 shadow-luxury hover:shadow-gold transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-accent" />
        ) : (
          <Moon className="w-5 h-5 text-primary" />
        )}
      </motion.button>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="card-luxury">
          <CardHeader className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold"
            >
              <Shield className="w-8 h-8 text-accent-foreground" />
            </motion.div>
            
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-gradient-gold">
                CivicVoice
              </CardTitle>
              <CardDescription className="text-base">
                Administrative Portal Access
              </CardDescription>
            </div>

            {/* Role Selection */}
            <div className="flex gap-2 justify-center">
              <Badge 
                variant={role === 'admin' ? "default" : "secondary"}
                className={`cursor-pointer px-4 py-2 transition-all duration-300 ${
                  role === 'admin' 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-secondary/80'
                }`}
                onClick={() => setRole('admin')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Badge>
              <Badge 
                variant={role === 'super_admin' ? "default" : "secondary"}
                className={`cursor-pointer px-4 py-2 transition-all duration-300 ${
                  role === 'super_admin' 
                    ? 'bg-accent text-accent-foreground shadow-lg' 
                    : 'hover:bg-secondary/80'
                }`}
                onClick={() => setRole('super_admin')}
              >
                <Crown className="w-4 h-4 mr-2" />
                Super Admin
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="h-12 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold btn-luxury"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Demo Credentials */}
            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center mb-3">
                Demo Credentials:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-muted/50 p-2 rounded">
                  <div className="font-medium text-accent">Super Admin</div>
                  <div>superadmin / admin123</div>
                </div>
                <div className="bg-muted/50 p-2 rounded">
                  <div className="font-medium text-primary">Admin</div>
                  <div>admin1 / admin123</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Registration Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-muted-foreground">
            Need admin access?{' '}
            <button
              onClick={() => navigate('/admin-registration')}
              className="text-accent hover:text-accent/80 font-medium transition-colors underline"
            >
              Register here
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;