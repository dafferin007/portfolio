
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

  const technicalSkills = [
    { name: 'C', category: 'Programming', color: 'from-blue-500 to-purple-600' },
    { name: 'C++', category: 'Programming', color: 'from-purple-500 to-pink-600' },
    { name: 'Java', category: 'Programming', color: 'from-orange-500 to-red-600' },
    { name: 'Python', category: 'Programming', color: 'from-green-500 to-blue-600' },
    { name: 'HTML', category: 'Web', color: 'from-orange-500 to-yellow-600' },
    { name: 'Data Structures', category: 'Computer Science', color: 'from-indigo-500 to-purple-600' },
  ];

  const certifications = [
    {
      title: 'Joy of Computing Python',
      provider: 'NPTEL',
      year: '2024',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Java Basics',
      provider: 'HackerRank',
      year: '2024',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Programming with Java',
      provider: 'NPTEL',
      year: '2024',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const certRefs = [cert1Ref, cert2Ref, cert3Ref];
  const certVisibles = [cert1Visible, cert2Visible, cert3Visible];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and professional certifications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills - Floating Style */}
          <div ref={skillsRef} className={`scroll-reveal ${skillsVisible ? 'active' : ''}`}>
            <Card className="card-hover bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Technical Skills</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {technicalSkills.map((skill, index) => (
                    <div
                      key={index}
                      className={`pop-in ${skillsVisible ? 'active' : ''} stagger-${index + 1}`}
                    >
                      <div className={`group relative bg-gradient-to-r ${skill.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 cursor-pointer`}>
                        <div className="text-white text-center">
                          <h4 className="text-lg font-bold mb-2">{skill.name}</h4>
                          <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications - Sequential Appearance */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Certifications</h3>
            {certifications.map((cert, index) => (
              <div
                key={index}
                ref={certRefs[index]}
                className={`slide-from-right ${certVisibles[index] ? 'active' : ''}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <Card className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <ExternalLink className="text-white" size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 mb-1">{cert.title}</h4>
                        <p className="text-gray-600 mb-2">{cert.provider}</p>
                        <div className="flex items-center justify-between mt-4">
                          <Badge variant="outline" className="text-sm">{cert.year}</Badge>
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
