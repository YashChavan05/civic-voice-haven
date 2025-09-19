import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Map as MapIcon, 
  MapPin, 
  Filter, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface HeatmapPoint {
  id: string;
  lat: number;
  lng: number;
  intensity: number;
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
  category: string;
  title: string;
  reportCount: number;
}

const HeatMap = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [mapView, setMapView] = useState('heatmap');
  const [selectedPoint, setSelectedPoint] = useState<HeatmapPoint | null>(null);

  // Mock heatmap data
  const heatmapData: HeatmapPoint[] = [
    {
      id: '1',
      lat: 40.7128,
      lng: -74.0060,
      intensity: 0.8,
      status: 'open',
      category: 'Infrastructure',
      title: 'Downtown Area Issues',
      reportCount: 23
    },
    {
      id: '2',
      lat: 40.7589,
      lng: -73.9851,
      intensity: 0.6,
      status: 'in_progress',
      category: 'Transportation',
      title: 'Central Park vicinity',
      reportCount: 15
    },
    {
      id: '3',
      lat: 40.6892,
      lng: -74.0445,
      intensity: 0.9,
      status: 'escalated',
      category: 'Emergency',
      title: 'Brooklyn Bridge Area',
      reportCount: 31
    },
    {
      id: '4',
      lat: 40.7505,
      lng: -73.9934,
      intensity: 0.4,
      status: 'resolved',
      category: 'Waste Management',
      title: 'Times Square District',
      reportCount: 8
    },
    {
      id: '5',
      lat: 40.7282,
      lng: -73.7949,
      intensity: 0.7,
      status: 'open',
      category: 'Public Safety',
      title: 'Queens Boulevard',
      reportCount: 19
    },
    {
      id: '6',
      lat: 40.6501,
      lng: -73.9496,
      intensity: 0.5,
      status: 'in_progress',
      category: 'Infrastructure',
      title: 'Brooklyn Heights',
      reportCount: 12
    }
  ];

  const categories = ['Infrastructure', 'Transportation', 'Emergency', 'Waste Management', 'Public Safety', 'Parks & Recreation'];
  
  const filteredData = heatmapData.filter(point => {
    const categoryMatch = selectedCategory === 'all' || point.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || point.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#f59e0b';
      case 'in_progress': return '#3b82f6';
      case 'resolved': return '#10b981';
      case 'escalated': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 0.8) return '#dc2626';
    if (intensity >= 0.6) return '#ea580c';
    if (intensity >= 0.4) return '#f59e0b';
    return '#22c55e';
  };

  const stats = [
    {
      title: 'Total Hotspots',
      value: filteredData.length,
      icon: MapPin,
      color: 'text-primary'
    },
    {
      title: 'High Intensity',
      value: filteredData.filter(p => p.intensity >= 0.7).length,
      icon: AlertTriangle,
      color: 'text-destructive'
    },
    {
      title: 'Active Issues',
      value: filteredData.filter(p => p.status === 'open' || p.status === 'in_progress').length,
      icon: Clock,
      color: 'text-warning'
    },
    {
      title: 'Resolved Areas',
      value: filteredData.filter(p => p.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-success'
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
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Interactive Heat Map</h1>
          <p className="text-muted-foreground text-lg">
            Geographic visualization of civic issues and report density
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          <MapIcon className="w-4 h-4 mr-2" />
          Live Data
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          {/* Filters */}
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-accent" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
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
                <label className="text-sm font-medium">View Mode</label>
                <Select value={mapView} onValueChange={setMapView}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heatmap">Heat Map</SelectItem>
                    <SelectItem value="markers">Markers</SelectItem>
                    <SelectItem value="clusters">Clusters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </CardContent>
          </Card>

          {/* Map Controls */}
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent" />
                Map Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <ZoomIn className="w-4 h-4 mr-2" />
                Zoom In
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ZoomOut className="w-4 h-4 mr-2" />
                Zoom Out
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                Center Map
              </Button>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Intensity Levels</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-600"></div>
                    <span className="text-sm">Critical (0.8+)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-600"></div>
                    <span className="text-sm">High (0.6-0.8)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Medium (0.4-0.6)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm">Low (0.0-0.4)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Status</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Open</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Resolved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Escalated</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Map Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:col-span-3"
        >
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Civic Issues Heat Map</span>
                <Badge variant="outline">
                  {filteredData.length} Points Visible
                </Badge>
              </CardTitle>
              <CardDescription>
                Click on any hotspot to view detailed information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mock Map Display */}
              <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg border-2 border-dashed border-border/50 overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 800 600">
                    {/* Mock city streets */}
                    <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" strokeWidth="2" />
                    <line x1="0" y1="300" x2="800" y2="300" stroke="currentColor" strokeWidth="2" />
                    <line x1="0" y1="500" x2="800" y2="500" stroke="currentColor" strokeWidth="2" />
                    <line x1="200" y1="0" x2="200" y2="600" stroke="currentColor" strokeWidth="2" />
                    <line x1="400" y1="0" x2="400" y2="600" stroke="currentColor" strokeWidth="2" />
                    <line x1="600" y1="0" x2="600" y2="600" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                {/* Heatmap Points */}
                {filteredData.map((point, index) => (
                  <motion.div
                    key={point.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${((point.lng + 74.5) * 1000) % 80}%`,
                      top: `${((40.8 - point.lat) * 1000) % 60}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedPoint(point)}
                  >
                    {/* Heatmap Circle */}
                    <div
                      className="relative w-12 h-12 rounded-full opacity-70 group-hover:opacity-90 transition-all duration-300"
                      style={{
                        backgroundColor: getIntensityColor(point.intensity),
                        boxShadow: `0 0 ${point.intensity * 40}px ${getIntensityColor(point.intensity)}50`
                      }}
                    >
                      {/* Status indicator */}
                      <div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: getStatusColor(point.status) }}
                      />
                      
                      {/* Report count */}
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                        {point.reportCount}
                      </div>
                    </div>

                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
                      <p className="font-medium text-sm">{point.title}</p>
                      <p className="text-xs text-muted-foreground">{point.category}</p>
                      <p className="text-xs">
                        <Badge className={`text-xs ${point.status === 'open' ? 'bg-warning' : point.status === 'resolved' ? 'bg-success' : 'bg-primary'}`}>
                          {point.status.replace('_', ' ')}
                        </Badge>
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Map placeholder text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-muted-foreground">
                    <MapIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium opacity-50">Interactive Heat Map</p>
                    <p className="text-sm opacity-50">Click on hotspots to view details</p>
                    <p className="text-xs mt-2 opacity-30">
                      In production, this would integrate with Google Maps or Mapbox
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Point Details */}
              {selectedPoint && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-muted/50 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{selectedPoint.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedPoint(null)}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Category</p>
                      <p>{selectedPoint.category}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(selectedPoint.status)}>
                        {selectedPoint.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Reports</p>
                      <p>{selectedPoint.reportCount} issues</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Intensity</p>
                      <p>{Math.round(selectedPoint.intensity * 100)}%</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HeatMap;