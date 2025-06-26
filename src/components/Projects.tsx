
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Camera, Navigation, Users, Palette, ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'IoT Based Assist System for Blind People',
      year: '2025',
      description: 'An innovative IoT solution designed to assist visually impaired individuals with navigation and obstacle detection.',
      features: ['Face Recognition', 'Navigation', 'Obstacle Detection'],
      technologies: ['Python CV', 'Image Processing', 'Raspberry Pi'],
      icon: Eye,
      color: 'from-blue-500 to-purple-600',
      status: 'Award Winner',
    },
    {
      title: 'Multi-Agent Travel Planner',
      year: '2025',
      description: 'A sophisticated travel planning system utilizing multiple AI agents working together to create personalized travel itineraries.',
      features: ['Multi-Agent System', 'AI Planning', 'Tool Integration'],
      technologies: ['Python', 'LangChain', 'Ollama', 'Groqcloud'],
      icon: Navigation,
      color: 'from-green-500 to-teal-600',
      status: 'Completed',
    },
    {
      title: 'Fashion Detect App',
      year: '2025',
      description: 'An AI-powered application that detects and analyzes fashion items using computer vision and machine learning.',
      features: ['Fashion Detection', 'Image Analysis', 'Style Recognition'],
      technologies: ['Python', 'Computer Vision', 'Machine Learning'],
      icon: Palette,
      color: 'from-pink-500 to-rose-600',
      status: 'In Development',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Innovative solutions combining AI, IoT, and modern technologies to solve real-world problems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="card-hover h-full">
              <CardHeader>
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${project.color} text-white mb-4 w-fit`}>
                  <project.icon size={32} />
                </div>
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{project.year}</Badge>
                  <Badge 
                    variant={project.status === 'Award Winner' ? 'default' : 'secondary'}
                    className={project.status === 'Award Winner' ? 'bg-yellow-500 text-white' : ''}
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Github className="mr-2" size={16} />
                    Code
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="mr-2" size={16} />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
