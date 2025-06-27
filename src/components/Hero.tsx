
import { ArrowDown, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 fade-in-up text-glow">
            Dafferin S
          </h1>
          <p className="text-xl md:text-3xl mb-8 text-purple-100 fade-in-up stagger-1 font-medium">
            Computer Science Engineering Student
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-2 text-indigo-100">
            Passionate about Artificial Intelligence, Web Development, and creating innovative solutions 
            that make a difference in people's lives.
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 fade-in-up stagger-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Mail size={18} />
              <span className="font-medium">dafferin007@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Phone size={18} />
              <span className="font-medium">8610707637</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <MapPin size={18} />
              <span className="font-medium">Sivakasi, Tamil Nadu</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12 fade-in-up stagger-4">
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
            className="bg-white text-purple-700 hover:bg-gray-100 hover:scale-105 transition-all duration-300 fade-in-up stagger-4 px-8 py-4 text-lg font-semibold shadow-2xl"
            asChild
          >
            <a href="#about">
              Explore My Work
              <ArrowDown className="ml-2" size={20} />
            </a>
          </Button>
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
