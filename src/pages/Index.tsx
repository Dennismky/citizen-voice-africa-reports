import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AuthForm from "@/components/AuthForm";
import ReportCard from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, MapPin, TrendingUp } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-elegant bg-gradient-to-br from-primary/10 to-primary/20 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary/80 font-medium">Total Reports</p>
                    <p className="text-3xl font-bold text-primary">247</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant bg-gradient-to-br from-success/10 to-success/20 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-success/80 font-medium">Resolved</p>
                    <p className="text-3xl font-bold text-success">89</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant bg-gradient-to-br from-info/10 to-info/20 border-info/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-info/80 font-medium">Under Investigation</p>
                    <p className="text-3xl font-bold text-info">42</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-info/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant bg-gradient-to-br from-warning/10 to-warning/20 border-warning/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-warning/80 font-medium">Locations</p>
                    <p className="text-3xl font-bold text-warning">156</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-warning/20 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card className="shadow-elegant bg-gradient-to-br from-card to-card/50 border-primary/10">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Recent Reports</CardTitle>
                <Button variant="hero" size="sm" className="shadow-glow">
                  New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    {...report}
                    onEdit={() => toast({ title: "Edit functionality", description: "Coming soon!" })}
                    onDelete={() => toast({ title: "Delete functionality", description: "Coming soon!" })}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
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
