
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Code, Users, Target, Lightbulb, Clock } from 'lucide-react';

const About = () => {
  const personalSkills = [
    { icon: Clock, title: 'Time Management', description: 'Efficiently organizing and prioritizing tasks' },
    { icon: Users, title: 'Teamwork', description: 'Collaborative problem-solving and communication' },
    { icon: Brain, title: 'Critical Thinking', description: 'Analytical approach to complex challenges' },
    { icon: Target, title: 'Leadership', description: 'Guiding teams towards successful outcomes' },
    { icon: Lightbulb, title: 'Innovation', description: 'Creative solutions to real-world problems' },
  ];

  const interests = [
    { icon: Brain, title: 'Artificial Intelligence', color: 'text-purple-600' },
    { icon: Code, title: 'Web Development', color: 'text-blue-600' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm a dedicated Computer Science Engineering student at Mepco Schlenk Engineering College 
            with a passion for creating innovative technological solutions. My journey in technology 
            is driven by curiosity and a desire to make a positive impact through code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Interests */}
          <Card className="card-hover">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Interests</h3>
              <div className="space-y-6">
                {interests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-gray-100 ${interest.color}`}>
                      <interest.icon size={24} />
                    </div>
                    <span className="text-lg font-medium">{interest.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="card-hover">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Languages</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">English</span>
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div className="skill-bar w-full h-3"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Tamil</span>
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div className="skill-bar w-full h-3"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Skills */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Personal Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalSkills.map((skill, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4">
                    <skill.icon size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{skill.title}</h4>
                  <p className="text-gray-600">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
