import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatusBadge from "@/components/StatusBadge";
import AuthForm from "@/components/AuthForm";
import ReportCard from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, MapPin, TrendingUp, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "auth" | "dashboard">("home");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { toast } = useToast();

  // Sample data for demonstration
  const mockReports = [
    {
      id: "1",
      title: "Pothole on Main Street",
      description: "Large pothole causing vehicle damage on Main Street near the shopping center. Multiple accidents have occurred due to this road hazard.",
      type: "intervention" as const,
      status: "investigating" as const,
      location: "Lagos, Nigeria",
      createdAt: "2024-01-15",
    },
    {
      id: "2", 
      title: "Corrupt Traffic Officer",
      description: "Traffic officer demanding bribes from motorists at checkpoint. Multiple witnesses can confirm this ongoing issue.",
      type: "red-flag" as const,
      status: "pending" as const,
      location: "Abuja, Nigeria",
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      title: "School Building Collapse",
      description: "School building showing signs of structural failure. Immediate intervention needed to prevent casualties.",
      type: "intervention" as const,
      status: "resolved" as const,
      location: "Kano, Nigeria", 
      createdAt: "2024-01-10",
    },
  ];

  const handleAuth = (data: any) => {
    toast({
      title: authMode === "login" ? "Welcome back!" : "Account created!",
      description: authMode === "login" 
        ? "You have successfully signed in." 
        : "Your account has been created successfully.",
    });
    setCurrentView("dashboard");
  };

  if (currentView === "auth") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <AuthForm 
          mode={authMode} 
          onToggleMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
          onSubmit={handleAuth}
        />
      </div>
    );
  }

  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="absolute inset-0 bg-black/10"></div>
        <Header />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Your <span className="text-secondary">Dashboard</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Track your reports, monitor progress, and continue making a difference in your community
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="secondary" size="xl" className="group">
              <AlertTriangle className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              New Red Flag Report
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <MapPin className="h-5 w-5 mr-2" />
              Request Intervention
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
              <BarChart3 className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <div className="text-3xl font-bold text-white mb-2">247</div>
              <div className="text-white/80">Total Reports</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
              <TrendingUp className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <div className="text-3xl font-bold text-white mb-2">89</div>
              <div className="text-white/80">Resolved Cases</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
              <Users className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <div className="text-3xl font-bold text-white mb-2">42</div>
              <div className="text-white/80">Under Investigation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
              <MapPin className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <div className="text-3xl font-bold text-white mb-2">156</div>
              <div className="text-white/80">Active Locations</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* My Reports */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">My Recent Reports</h2>
                  <Button variant="secondary" size="sm">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {report.type === "red-flag" ? (
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                            ) : (
                              <MapPin className="h-4 w-4 text-secondary" />
                            )}
                            <h3 className="text-white font-semibold">{report.title}</h3>
                          </div>
                          <p className="text-white/70 text-sm mb-2 line-clamp-2">{report.description}</p>
                          <div className="flex items-center gap-4 text-xs text-white/60">
                            <span>{report.location}</span>
                            <span>{report.createdAt}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <StatusBadge status={report.status} size="sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Impact Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Reports Submitted</span>
                    <span className="text-white font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Cases Resolved</span>
                    <span className="text-secondary font-bold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Communities Helped</span>
                    <span className="text-white font-bold">5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Updates</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="text-white/90">Your report "Pothole on Main Street" was updated</div>
                    <div className="text-white/60 text-xs">2 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-white/90">New intervention request approved</div>
                    <div className="text-white/60 text-xs">1 day ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-white/90">Case marked as resolved</div>
                    <div className="text-white/60 text-xs">3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Call to Action */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of citizens working to build a corruption-free Africa
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => setCurrentView("auth")}
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => setCurrentView("dashboard")}
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
