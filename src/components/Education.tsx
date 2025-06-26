
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, School, Award } from 'lucide-react';

const Education = () => {
  const educationData = [
    {
      degree: 'Bachelor of Engineering',
      institution: 'Mepco Schlenk Engineering College',
      location: 'Sivakasi',
      year: '2026',
      grade: 'CGPA: 7.94 (up to 6th sem)',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-600',
      status: 'In Progress',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Alphonsa Matric. Hr. Sec School',
      location: 'Nagercoil',
      year: '2022',
      grade: 'Percentage: 87.5%',
      icon: School,
      color: 'from-green-500 to-teal-600',
      status: 'Completed',
    },
    {
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: 'Alphonsa Matric. Hr. Sec School',
      location: 'Nagercoil',
      year: '2020',
      grade: 'Percentage: 86.2%',
      icon: Award,
      color: 'from-orange-500 to-red-600',
      status: 'Completed',
    },
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My academic journey and achievements in pursuit of excellence
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${edu.color} text-white shrink-0`}>
                      <edu.icon size={32} />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                          {edu.degree}
                        </h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">{edu.year}</Badge>
                          <Badge 
                            variant={edu.status === 'In Progress' ? 'default' : 'secondary'}
                          >
                            {edu.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-700">
                          {edu.institution}
                        </p>
                        <p className="text-gray-600">{edu.location}</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {edu.grade}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
