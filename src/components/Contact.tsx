
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'dafferin007@gmail.com',
      href: 'mailto:dafferin007@gmail.com',
      color: 'text-red-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8610707637',
      href: 'tel:+918610707637',
      color: 'text-green-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sivakasi, Tamil Nadu, India',
      href: '#',
      color: 'text-blue-500',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: '#',
      color: 'hover:text-gray-800',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: '#',
      color: 'hover:text-blue-600',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, and innovative projects
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you're interested in collaboration, have a project in mind, or just want to say hello, 
                  I'd love to hear from you. Let's create something amazing together!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-gray-100 ${contact.color}`}>
                      <contact.icon size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{contact.label}</p>
                      <a 
                        href={contact.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Send size={32} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Ready to Start a Project?</h3>
                    <p className="text-gray-600 mb-8">
                      I'm currently available for new opportunities and excited to work on innovative projects 
                      that make a difference. Let's discuss how we can bring your ideas to life!
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                      asChild
                    >
                      <a href="mailto:dafferin007@gmail.com">
                        <Mail className="mr-2" size={20} />
                        Send Email
                      </a>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      asChild
                    >
                      <a href="tel:+918610707637">
                        <Phone className="mr-2" size={20} />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
