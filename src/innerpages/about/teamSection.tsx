import React, { useState } from "react";
// @ts-ignore: allow importing image assets when no module declaration is present
import demilade from '../../assets/demilade.png'
import samuel from '../../assets/sameul.png'
import sayo from '../../assets/sayo.png'
import jeff from '../../assets/jeff.png'
import delibe from '../../assets/delibe.png'
// Team Member Card Component
type TeamMember = {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
};

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-gray-200">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Overlay with Info */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {/* Name and Title */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-sm text-gray-300">{member.title}</p>
          </div>

          {/* Bio Badge */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-white border border-white/30 mb-3">
            {member.bio}
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            {/* LinkedIn Icon */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}

            {/* Twitter/X Icon */}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}

            {/* Portfolio/Website Icon */}
            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Team Section Component
const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Olumade Demilade",
      title: "Co-Founder & CEO",
      bio: "Former freelance graphics designer",
      image: demilade,
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
    {
      id: 2,
      name: "Ajayi Samuel O.",
      title: "Lead Designer",
      bio: "Sol Track design @Centre",
      image: samuel,
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
    {
      id: 3,
      name: "Showale Omobolaji",
      title: "COO & Product Designer",
      bio: "Sol Track design @Centre",
      image: delibe,
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
    {
      id: 4,
      name: "Fidelugwuowo Dilibe",
      title: "CTO & Backend Developer",
      bio: "Sol Track design @Centre",
      image: delibe,
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
    {
      id: 5,
      name: "Ogunyemi Sayo",
      title: "Product Designer",
      bio: "Sol Track design @Centre",
      image: sayo,
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
    {
      id: 6,
      name: "Jeffrey Chigozirim A.",
      title: "Frontend Developer",
      bio: "Sol Track design @Centre",
      image: jeff,
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            Meet The Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powered by People, Just Like You
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            We're freelancers, creators, and collaborators too, building a
            platform we'd actually want to use. Real people, helping real people
            succeed.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;