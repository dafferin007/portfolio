import { Card, CardContent } from '@/components/ui/card';
import { Brain, Code, Users, Target, Lightbulb, Clock, Laptop } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
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
    { icon: Laptop, title: 'Software Development', color: 'text-blue-400' },
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
            Hello! I'm Dafferin S, an Electrical and Electronics Engineering student with a strong passion for software development and technology. While my academic background lies in core engineering, I've actively explored the world of programming through C, C++, Java, and Python, along with web development using HTML and CSS. I'm also well-versed in Git, GitHub, Linux, cloud computing, and computer networking.
          </p>
          <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed mt-6">
            I enjoy building practical solutions, learning new technologies, and working on projects that challenge me to grow. My interests lie at the intersection of hardware and software, and I'm constantly seeking opportunities to innovate. I'm currently exploring open-source contributions and looking forward to collaborating on impactful tech projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-16 mb-16">
          <div 
            ref={interestsRef}
            className={`slide-from-right ${interestsVisible ? 'active' : ''} max-w-2xl mx-auto`}
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
