import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Star, 
  Calendar, 
  Clock, 
  DollarSign,
  FileText,
  Wrench,
  CheckCircle2,
  CalendarDays,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { sampleProjects } from './data/projects';

const WorkHistoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = sampleProjects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-white p-8">
        <button
          onClick={() => navigate('/applicants/work-history')}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to work history</span>
        </button>
        <p className="text-gray-600">Project not found</p>
      </div>
    );
  }

  const skills = ['Web Design', 'UX Writing', 'User Research', 'Figma', 'Adobe XD'];
  
  const deliverables = [
    'Responsive website design',
    'Payment gateway integration',
    'Admin dashboard',
    'Mobile app prototype',
    'Seo optimization',
    'Performance testing report'
  ];

  const milestones = [
    { title: 'Initial Design Mockups', date: 'Jan 15' },
    { title: 'Initial Design Mockups', date: 'Feb 10' },
    { title: 'Initial Design Mockups', date: 'Feb 25' },
    { title: 'Initial Design Mockups', date: 'Mar 15' }
  ];

  const performanceMetrics = [
    { label: 'On-Time Delivery', value: 100 },
    { label: 'Client Satisfaction', value: 98 },
    { label: 'Quality Score', value: 96 },
    { label: 'Budget Adherence', value: 95 }
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-16 mt-20">
      {/* Back Button */}
      <button
        onClick={() => navigate('/applicants/work-history')}
        className="flex items-center gap-2 text-red-500 hover:text-red-600 mb-8 ml-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to work history</span>
      </button>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* PART 1: Main Info Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-lg border border-green-200">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Client and Rating */}
            <div className="flex items-center gap-3 mb-6">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700 font-medium">{project.client}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-2" />
              <span className="text-sm text-gray-700 font-medium">4.9</span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-4 gap-8 mb-6">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-semibold text-gray-900">2 Months</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Timeline</p>
                  <p className="text-sm font-semibold text-gray-900">Jan 2024 - Mar 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="text-sm font-semibold text-gray-900">$2,600</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Rating</p>
                  <p className="text-sm font-semibold text-gray-900">5/5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900">Project Description</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-sm text-gray-700 leading-relaxed">
                We started with a clean, modern aesthetic, using Spotify's signature dark backdrop to make vibrant gradients and album artwork pop. The hero section features a bold call-to-action, encouraging users to explore personalized playlists or dive into podcasts with a single click. Interactive elements, like animated hover effects and subtle micro-animations, create a lively yet polished feel, mirroring the rhythm of music itself. Accessibility was a priority—high-contrast text, screen-reader compatibility, and responsive layouts ensure inclusivity across devices. The typography, a blend of sleek sans-serif fonts, feels approachable yet premium, aligning with Spotify's brand identity. Strategic content hierarchy guides users effortlessly from discovery to sign-up, with modular sections showcasing trending artists, curated playlists, and podcast highlights.
              </p>
            </div>
          </div>

          {/* Skills and Tools */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900">Skills and Tools</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg border border-purple-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PART 2: Deliverables and Milestones */}
        <div className="grid grid-cols-2 gap-6">
          {/* Deliverables */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900">Deliverables</h2>
            </div>
            <div className="space-y-2.5">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-grey-800 shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Milestones */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-4 h-4 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900">Project Milestones</h2>
            </div>
            <div className="space-y-2.5">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-800 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 font-medium">{milestone.title}</p>
                    <p className="text-xs text-gray-500">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PART 3: Performance Metrics and Client Feedback */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          {/* Performance Metrics */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900">Performance Metrics</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-5">
              {performanceMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700 font-medium">{metric.label}</span>
                    <span className="text-sm text-gray-900 font-semibold">{metric.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 rounded-full transition-all"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Feedback */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="w-4 h-4 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900">Client Feedback</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?img=12" 
                    alt="Mark Brun" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Mark Brun, CTO</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "Exceptional work! The new website exceeded our expectations. The design is modern, user-friendly, and the performance improvements are remarkable. Communication was excellent throughout the project."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryDetails;