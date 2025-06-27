
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Code, Users, Target, Lightbulb, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [profileRef, profileVisible] = useScrollAnimation();
  const [interestsRef, interestsVisible] = useScrollAnimation();
  const [skillsRef, skillsVisible] = useScrollAnimation();

  const personalSkills = [
    { icon: Clock, title: 'Time Management', description: 'Efficient task organization' },
    { icon: Users, title: 'Teamwork', description: 'Collaborative communication' },
    { icon: Brain, title: 'Critical Thinking', description: 'Analytical problem-solving' },
    { icon: Target, title: 'Leadership', description: 'Team guidance' },
    { icon: Lightbulb, title: 'Innovation', description: 'Creative solutions' },
  ];

  const interests = [
    { icon: Brain, title: 'Artificial Intelligence', color: 'text-purple-400' },
    { icon: Code, title: 'Web Development', color: 'text-indigo-400' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-20 scroll-reveal ${titleVisible ? 'active' : ''}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white text-glow">
            About Me
          </h2>
          <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
            I'm a dedicated Computer Science Engineering student at Mepco Schlenk Engineering College 
            with a passion for creating innovative technological solutions. My journey in technology 
            is driven by curiosity and a desire to make a positive impact through code.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Profile Picture Section */}
          <div 
            ref={profileRef}
            className={`flex justify-center lg:justify-start profile-slide ${profileVisible ? 'active' : ''}`}
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl overflow-hidden glow-effect border-4 border-purple-500/30 shadow-2xl">
                <img 
                  src="/lovable-uploads/ad9d9714-3c00-432b-a2ed-c9aac6b72ecf.png"
                  alt="Dafferin S - Computer Science Student"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-xl">
                <Code className="text-white" size={32} />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div 
            ref={interestsRef}
            className={`slide-from-right ${interestsVisible ? 'active' : ''}`}
          >
            <Card className="card-hover bg-gray-800/50 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-8 text-center text-white">Interests</h3>
                <div className="space-y-8">
                  {interests.map((interest, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-6 pop-in ${interestsVisible ? 'active' : ''} stagger-${index + 1}`}
                    >
                      <div className={`p-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 ${interest.color} border border-purple-500/30`}>
                        <interest.icon size={32} />
                      </div>
                      <span className="text-2xl font-semibold text-white">{interest.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Personal Skills - Smaller */}
        <div 
          ref={skillsRef}
          className={`scroll-reveal ${skillsVisible ? 'active' : ''}`}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white text-glow">Personal Skills</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {personalSkills.map((skill, index) => (
              <div 
                key={index}
                className={`pop-in ${skillsVisible ? 'active' : ''} stagger-${index + 1}`}
              >
                <Card className="card-hover text-center bg-gray-800/50 border-purple-500/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white mb-4 shadow-xl">
                      <skill.icon size={24} />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">{skill.title}</h4>
                    <p className="text-purple-200 text-sm">{skill.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
