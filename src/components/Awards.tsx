
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Medal } from 'lucide-react';

const Awards = () => {
  const awards = [
    {
      title: 'Best Project Award - IoT-Based Assist System for Blind People',
      event: 'IITM PALS INNOWAH\'25',
      organization: 'IIT Madras',
      prize: '₹10,000 Cash Prize',
      description: 'Received recognition for innovative IoT solution helping visually impaired individuals',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-600',
      rank: 'Winner',
    },
    {
      title: 'First Prize & Project Funding',
      event: 'TECHNO INNOVATIVE\'25',
      organization: 'Mepco Schlenk Engineering College',
      prize: 'Project Funding',
      description: 'Secured first position and funding for IoT-Based Assist System for Blind People',
      icon: Award,
      color: 'from-blue-500 to-purple-600',
      rank: '1st Place',
    },
    {
      title: 'Second Prize - IoT Project',
      event: 'CEREBRIA\'24',
      organization: 'Bannari Amman Institute Of Technology',
      prize: 'Runner-up',
      description: 'Won second place for innovative IoT-based project presentation',
      icon: Medal,
      color: 'from-green-500 to-teal-600',
      rank: '2nd Place',
    },
  ];

  return (
    <section id="awards" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Awards & Recognition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recognition for innovation and excellence in technology competitions
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {awards.map((award, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${award.color} text-white shrink-0 self-start`}>
                      <award.icon size={40} />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                            {award.title}
                          </h3>
                          <div className="space-y-1">
                            <p className="text-lg font-semibold text-blue-600">
                              {award.event}
                            </p>
                            <p className="text-gray-600">{award.organization}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col lg:items-end gap-2">
                          <Badge 
                            variant="default" 
                            className={`${award.rank === 'Winner' ? 'bg-yellow-500' : award.rank === '1st Place' ? 'bg-blue-500' : 'bg-green-500'} text-white`}
                          >
                            {award.rank}
                          </Badge>
                          <Badge variant="outline" className="font-medium">
                            {award.prize}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">
                        {award.description}
                      </p>
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

export default Awards;
