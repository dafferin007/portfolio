
import { ArrowDown, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            Dafferin S
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 fade-in-up stagger-1">
            Computer Science Engineering Student
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-2">
            Passionate about Artificial Intelligence, Web Development, and creating innovative solutions 
            that make a difference in people's lives.
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 fade-in-up stagger-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Mail size={16} />
              <span>dafferin007@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Phone size={16} />
              <span>8610707637</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin size={16} />
              <span>Sivakasi, Tamil Nadu</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12 fade-in-up stagger-4">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
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
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
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
            className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 fade-in-up stagger-4"
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
        <ArrowDown className="text-white/70" size={24} />
      </div>
    </section>
  );
};

export default Hero;
