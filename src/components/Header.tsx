import { Button } from "@/components/ui/button";
import { Shield, Menu, User } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-card shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Jiseti</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Reports
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              My Account
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Report Issue
            </Button>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;