
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Skills = () => {
  const [skillsRef, skillsVisible] = useScrollAnimation(0.2);
  const [cert1Ref, cert1Visible] = useScrollAnimation(0.3);
  const [cert2Ref, cert2Visible] = useScrollAnimation(0.3);
  const [cert3Ref, cert3Visible] = useScrollAnimation(0.3);
  const [cert4Ref, cert4Visible] = useScrollAnimation(0.3);

  const technicalSkills = [
    { name: 'C', category: 'Programming', color: 'from-purple-600 to-indigo-700' },
    { name: 'C++', category: 'Programming', color: 'from-indigo-600 to-purple-700' },
    { name: 'Java', category: 'Programming', color: 'from-blue-600 to-purple-600' },
    { name: 'Python', category: 'Programming', color: 'from-purple-700 to-blue-700' },
    { name: 'HTML', category: 'Web', color: 'from-indigo-700 to-purple-800' },
    { name: 'CSS', category: 'Web', color: 'from-purple-800 to-indigo-800' },
    { name: 'Git', category: 'Technologies', color: 'from-purple-600 to-blue-700' },
    { name: 'GitHub', category: 'Technologies', color: 'from-indigo-600 to-purple-600' },
    { name: 'Computer Networking', category: 'Computer Science', color: 'from-blue-700 to-purple-700' },
    { name: 'Cloud Computing', category: 'Computer Science', color: 'from-purple-700 to-indigo-700' },
    { name: 'Linux OS', category: 'Computer Science', color: 'from-indigo-700 to-blue-700' },
    { name: 'Data Structures', category: 'Computer Science', color: 'from-purple-800 to-indigo-800' },
  ];

  const certifications = [
    {
      title: 'Joy of Computing Python',
      provider: 'NPTEL',
      year: '2024',
      color: 'from-purple-600 to-indigo-700',
    },
    {
      title: 'Java Basics',
      provider: 'HackerRank',
      year: '2024',
      color: 'from-indigo-600 to-purple-700',
    },
    {
      title: 'Programming with Java',
      provider: 'NPTEL',
      year: '2024',
      color: 'from-blue-600 to-purple-600',
    },
    {
      title: 'Problem Solving Certificate',
      provider: 'HackerRank',
      year: '2024',
      color: 'from-purple-700 to-blue-700',
    },
  ];

  const certRefs = [cert1Ref, cert2Ref, cert3Ref, cert4Ref];
  const certVisibles = [cert1Visible, cert2Visible, cert3Visible, cert4Visible];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-glow">
            Skills & Expertise
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and professional certifications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills - Hexagonal Boxes */}
          <div ref={skillsRef} className={`scroll-reveal ${skillsVisible ? 'active' : ''}`}>
            <Card className="card-hover bg-gray-800/50 backdrop-blur-sm border-purple-500/30 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-center text-white">Technical Skills</h3>
                <div className="grid grid-cols-2 gap-6">
                  {technicalSkills.map((skill, index) => (
                    <div
                      key={index}
                      className={`pop-in ${skillsVisible ? 'active' : ''} stagger-${Math.min(index + 1, 6)}`}
                    >
                      <div className={`group relative bg-gradient-to-br ${skill.color} p-6 rounded-2xl border border-purple-400/30 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 cursor-pointer backdrop-blur-sm`}>
                        <div className="text-white text-center">
                          <h4 className="text-lg font-bold mb-3">{skill.name}</h4>
                          <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications - Sequential Appearance */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-white mb-8">Certifications</h3>
            {certifications.map((cert, index) => (
              <div
                key={index}
                ref={certRefs[index]}
                className={`slide-from-right ${certVisibles[index] ? 'active' : ''}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <Card className="card-hover bg-gray-800/50 backdrop-blur-sm border-purple-500/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center shadow-lg border border-purple-400/30`}>
                        <ExternalLink className="text-white" size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{cert.title}</h4>
                        <p className="text-purple-200 mb-2">{cert.provider}</p>
                        <div className="flex items-center justify-between mt-4">
                          <Badge variant="outline" className="text-sm text-purple-200 border-purple-400/30">{cert.year}</Badge>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <ExternalLink size={16} className="mr-2" />
                            View Certificate
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default Skills;
