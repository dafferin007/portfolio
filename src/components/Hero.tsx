
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Name and content sliding from left with emergence effect */}
          <div className="slide-from-left active">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up text-glow emerge-text">
              Dafferin S
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-purple-100 fade-in-up stagger-1 font-medium emerge-text">
              Computer Science Engineering Student
            </p>
            <p className="text-lg md:text-xl mb-8 leading-relaxed fade-in-up stagger-2 text-indigo-100 emerge-text">
              Passionate about Artificial Intelligence, Web Development, and creating innovative solutions 
              that make a difference in people's lives.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-6 mb-8 fade-in-up stagger-3 emerge-text">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2" size={20} />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2" size={20} />
                  LinkedIn
                </a>
              </Button>
            </div>
            
            <Button
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 hover:scale-105 transition-all duration-300 fade-in-up stagger-4 px-8 py-4 text-lg font-semibold shadow-2xl emerge-text"
              asChild
            >
              <a href="#about">
                Explore My Work
                <ArrowDown className="ml-2" size={20} />
              </a>
            </Button>
          </div>

          {/* Right side - Profile picture sliding from right */}
          <div className="slide-from-right active flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl overflow-hidden glow-effect border-4 border-white/20 shadow-2xl">
                <img 
                  src="/lovable-uploads/ad9d9714-3c00-432b-a2ed-c9aac6b72ecf.png"
                  alt="Dafferin S - Computer Science Student"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Animation Element */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 float-animation">
        <ArrowDown className="text-white/70" size={28} />
      </div>
    </section>
  );
};

export default Hero;
