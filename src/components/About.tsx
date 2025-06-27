
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Code, Users, Target, Lightbulb, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [profileRef, profileVisible] = useScrollAnimation();
  const [interestsRef, interestsVisible] = useScrollAnimation();
  const [languagesRef, languagesVisible] = useScrollAnimation();
  const [skillsRef, skillsVisible] = useScrollAnimation();

  const personalSkills = [
    { icon: Clock, title: 'Time Management', description: 'Efficiently organizing and prioritizing tasks' },
    { icon: Users, title: 'Teamwork', description: 'Collaborative problem-solving and communication' },
    { icon: Brain, title: 'Critical Thinking', description: 'Analytical approach to complex challenges' },
    { icon: Target, title: 'Leadership', description: 'Guiding teams towards successful outcomes' },
    { icon: Lightbulb, title: 'Innovation', description: 'Creative solutions to real-world problems' },
  ];

  const interests = [
    { icon: Brain, title: 'Artificial Intelligence', color: 'text-purple-600' },
    { icon: Code, title: 'Web Development', color: 'text-indigo-600' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-20 scroll-reveal ${titleVisible ? 'active' : ''}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text text-glow">
            About Me
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            I'm a dedicated Computer Science Engineering student at Mepco Schlenk Engineering College 
            with a passion for creating innovative technological solutions. My journey in technology 
            is driven by curiosity and a desire to make a positive impact through code.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Profile Picture Section */}
          <div 
            ref={profileRef}
            className={`flex justify-center lg:justify-start profile-slide ${profileVisible ? 'active' : ''}`}
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl overflow-hidden glow-effect border-4 border-gradient-to-r from-purple-500 to-indigo-500 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face"
                  alt="Dafferin S - Computer Science Student"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                <Code className="text-white" size={32} />
              </div>
            </div>
          </div>

          {/* Interests & Languages */}
          <div className="space-y-8">
            <div 
              ref={interestsRef}
              className={`slide-from-right ${interestsVisible ? 'active' : ''}`}
            >
              <Card className="card-hover glow-effect border-purple-200">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-8 text-center gradient-text">Interests</h3>
                  <div className="space-y-8">
                    {interests.map((interest, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-6 pop-in ${interestsVisible ? 'active' : ''} stagger-${index + 1}`}
                      >
                        <div className={`p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 ${interest.color}`}>
                          <interest.icon size={32} />
                        </div>
                        <span className="text-2xl font-semibold text-gray-800">{interest.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div 
              ref={languagesRef}
              className={`slide-from-right stagger-2 ${languagesVisible ? 'active' : ''}`}
            >
              <Card className="card-hover glow-effect border-indigo-200">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-8 text-center gradient-text">Languages</h3>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-semibold text-gray-800">English</span>
                      <div className="w-40 bg-gray-200 rounded-full h-4 shadow-inner">
                        <div className="skill-bar w-full h-4 shadow-lg"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-semibold text-gray-800">Tamil</span>
                      <div className="w-40 bg-gray-200 rounded-full h-4 shadow-inner">
                        <div className="skill-bar w-full h-4 shadow-lg"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Personal Skills */}
        <div 
          ref={skillsRef}
          className={`scroll-reveal ${skillsVisible ? 'active' : ''}`}
        >
          <h3 className="text-4xl font-bold text-center mb-16 gradient-text text-glow">Personal Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalSkills.map((skill, index) => (
              <div 
                key={index}
                className={`pop-in ${skillsVisible ? 'active' : ''} stagger-${index + 1}`}
              >
                <Card className="card-hover text-center glow-effect border-purple-200 bg-gradient-to-br from-white to-purple-50">
                  <CardContent className="p-8">
                    <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white mb-6 shadow-2xl">
                      <skill.icon size={40} />
                    </div>
                    <h4 className="text-2xl font-bold mb-4 gradient-text">{skill.title}</h4>
                    <p className="text-gray-600 text-lg leading-relaxed">{skill.description}</p>
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
