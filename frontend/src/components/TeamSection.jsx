import { useState, useEffect } from 'react'
import { Heart, Mail, Phone, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react'

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
        // Limit to 10 team members
        setTeam(data.slice(0, 10))
        setError('')
      } else {
        throw new Error('Failed to fetch team')
      }
    } catch (error) {
      console.error('Error fetching team:', error)
      setError('Failed to load team members')
      // Use default team data if API fails
      setTeam([
        {
          _id: '1',
          name: "Faizan Ayubi",
          role: "Co-Founder & CEO",
          description: "A supportive team is the foundation of a successful company. At Trackier, we foster an environment where respect, collaboration, and growth come naturally.",
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
          description: "Technology should make work easier, not complicated. At Trackier, we focus on building reliable systems that help teams work faster and smarter.",
          image: "https://randomuser.me/api/portraits/men/50.jpg"
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-[#f3f6fb] py-24 px-6">
        <div className="text-center">
          <p className="text-gray-500">Loading team members...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-6">Our Values Define Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Meet our amazing team who bring ideas to life with passion and creativity.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={member._id || index} 
              className="group relative"
            >
              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Card */}
              <div className="relative bg-white rounded-3xl pt-20 pb-8 px-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={member.imageData ? `data:image/jpeg;base64,${member.imageData}` : member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/128?text=' + member.name.charAt(0)
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{member.description}</p>

                  {/* Contact Info */}
                  <div className="flex justify-center gap-3 pt-4">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full">
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.twitter && (
                      <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.instagram && (
                      <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.facebook && (
                      <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full">
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full rounded-b-3xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
