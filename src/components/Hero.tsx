import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Fight Corruption,
            <br />
            <span className="text-secondary">Build a Better Africa</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
            Jiseti empowers every citizen to report corruption and request government intervention. 
            Your voice matters in building transparent, accountable governance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="secondary" size="xl" className="group">
              <AlertTriangle className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Report Red Flag
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <MapPin className="h-5 w-5 mr-2" />
              Request Intervention
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <Shield className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Anonymous Reporting</h3>
              <p className="text-white/80">Report incidents safely and anonymously with full protection</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <MapPin className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Geolocation Tracking</h3>
              <p className="text-white/80">Precise location marking for accurate incident reporting</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <AlertTriangle className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
              <p className="text-white/80">Track your report status from submission to resolution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;