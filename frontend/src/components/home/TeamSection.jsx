import { useState, useEffect } from 'react'
import { Mail, Phone, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react'

export default function TeamSection() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/team')
      if (response.ok) {
        const data = await response.json()
        setTeam(data.slice(0, 10))
        setError('')
      } else {
        throw new Error('Failed to fetch team')
      }
    } catch (error) {
      console.error('Error fetching team:', error)
      setError('Failed to load team members')
      setTeam([
        {
          _id: '1',
          name: "Faizan Ayubi",
          role: "Co-Founder & CEO",
          description: "A supportive team is the foundation of a successful company. At ELVORA, we foster an environment where respect, collaboration, and growth come naturally.",
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          _id: '2',
          name: "Udit Verma",
          role: "Co-Founder & CMO",
          description: "Understanding 'why' before taking action helps us serve our customers better. We strive to anticipate their needs and deliver solutions that exceed expectations.",
          image: "https://randomuser.me/api/portraits/men/44.jpg"
        },
        {
          _id: '3',
          name: "Mukul Kaushik",
          role: "Chief Revenue Officer",
          description: "A growth mindset is essential in today's fast paced world. We encourage our team to keep learning, adapting, and striving for excellence.",
          image: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        {
          _id: '4',
          name: "Abhay Chauhan",
          role: "Chief Technology Officer",
          description: "Technology should make work easier, not complicated. At ELVORA, we focus on building reliable systems that help teams work faster and smarter.",
          image: "https://randomuser.me/api/portraits/men/50.jpg"
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-[#f3f2ee] font-sans py-24 px-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500 font-medium animate-pulse tracking-wider">Loading Team Members...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f3f2ee] font-sans selection:bg-orange-200 py-20 px-4 md:px-8 relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-200/40 rounded-full filter blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-200/30 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-300/60 pb-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#f97316] uppercase block mb-2">Our Experts</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1a2e40] tracking-tight"
            
            >
              Meet Our Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a2e40] to-[#c29d70]">Team</span>
            </h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-md md:text-right leading-relaxed font-medium">
            A collective of tech-driven professionals and design innovators shaping the future of ELVORA Fashion.
          </p>
        </div>

        {/* Horizontal Swipe/Scroll Container (No Buttons, No Dots) */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {team.map((member) => (
            <div 
              key={member._id} 
              className="w-[290px] sm:w-[320px] flex-shrink-0 snap-start snap-always"
            >
              {/* Premium Card Structure */}
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(26,46,64,0.1)] transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full group">
                
                {/* Image Section inside a styled layout Frame */}
                <div className="relative pt-8 px-6 flex justify-center">
                  <div className="relative">
                    {/* Glowing Aura Effect on Card Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#f97316]/20 to-[#c29d70]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative w-28 h-28 rounded-full border-[6px] border-[#f3f2ee] shadow-sm overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105 bg-gray-50">
                      <img
                        src={member.imageData ? `data:image/jpeg;base64,${member.imageData}` : member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/112?text=' + member.name.charAt(0)
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Info and Content Details */}
                <div className="flex-1 p-6 text-center flex flex-col justify-between mt-2">
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-[#f97316] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-black tracking-widest text-[#c29d70] uppercase mt-1 mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium line-clamp-3 px-2">
                      {member.description}
                    </p>
                  </div>

                  {/* Clean, Non-intrusive Minimal Social Links */}
                  <div className="flex justify-center items-center gap-1.5 pt-5 mt-6 border-t border-gray-100/80">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-white hover:bg-[#1a2e40] transition-all duration-300 p-2 rounded-xl">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-white hover:bg-[#1a2e40] transition-all duration-300 p-2 rounded-xl">
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:bg-[#1a2e40] transition-all duration-300 p-2 rounded-xl">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.twitter && (
                      <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:bg-[#1a2e40] transition-all duration-300 p-2 rounded-xl">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.instagram && (
                      <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:bg-[#1a2e40] transition-all duration-300 p-2 rounded-xl">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.facebook && (
                      <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:bg-[#1a2e40] transition-all duration-300 p-2 rounded-xl">
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}