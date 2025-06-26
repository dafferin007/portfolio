
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const technicalSkills = [
    { name: 'C', level: 85, category: 'Programming' },
    { name: 'C++', level: 80, category: 'Programming' },
    { name: 'Java', level: 75, category: 'Programming' },
    { name: 'Python', level: 90, category: 'Programming' },
    { name: 'HTML', level: 85, category: 'Web' },
    { name: 'Data Structures', level: 80, category: 'Computer Science' },
  ];

  const certifications = [
    {
      title: 'Joy of Computing Python',
      provider: 'NPTEL',
      year: '2024',
    },
    {
      title: 'Java Basics',
      provider: 'HackerRank',
      year: '2024',
    },
    {
      title: 'Programming with Java',
      provider: 'NPTEL',
      year: '2024',
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
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
          {/* Technical Skills */}
          <Card className="card-hover">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">Technical Skills</h3>
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-lg">{skill.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="skill-bar h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="card-hover">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">Certifications</h3>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="text-lg font-bold text-gray-800">{cert.title}</h4>
                    <p className="text-gray-600 mb-2">{cert.provider}</p>
                    <Badge variant="outline">{cert.year}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
