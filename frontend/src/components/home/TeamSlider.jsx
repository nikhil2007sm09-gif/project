// import { useState, useEffect } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// export default function TeamSlider() {
//   const [team, setTeam] = useState([])
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchTeam()
//   }, [])

//   const fetchTeam = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch('http://localhost:5000/api/team')
//       if (response.ok) {
//         const data = await response.json()
        
//         setTeam(data.slice(0, 10))
//       }
//     } catch (error) {
//       console.error('Error fetching team:', error)
      
//       setTeam([
//         {
//           _id: '1',
//           name: "Faizan Ayubi",
//           role: "Co-Founder & CEO",
//           description: "A supportive team is the foundation of a successful company.",
//           image: "https://randomuser.me/api/portraits/men/32.jpg"
//         },
//         {
//           _id: '2',
//           name: "Udit Verma",
//           role: "Co-Founder & CMO",
//           description: "Understanding 'why' before taking action helps us serve better.",
//           image: "https://randomuser.me/api/portraits/men/44.jpg"
//         },
//         {
//           _id: '3',
//           name: "Mukul Kaushik",
//           role: "Chief Revenue Officer",
//           description: "A growth mindset is essential in today's fast paced world.",
//           image: "https://randomuser.me/api/portraits/men/46.jpg"
//         },
//         {
//           _id: '4',
//           name: "Abhay Chauhan",
//           role: "Chief Technology Officer",
//           description: "Technology should make work easier, not complicated.",
//           image: "https://randomuser.me/api/portraits/men/50.jpg"
//         }
//       ])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % team.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + team.length) % team.length)
//   }

//   if (loading || team.length === 0) {
//     return null
//   }

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-6 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Team</h2>
//           <p className="text-gray-300 text-lg">Talented professionals dedicated to excellence</p>
//           <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
//         </div>

//         {/* Slider */}
//         <div className="relative">
//           {/* Main Slide */}
//           <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
//               {/* Image */}
//               <div className="flex items-center justify-center">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50"></div>
//                   <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
//                     <img
//                       src={team[currentSlide].imageData ? `data:image/jpeg;base64,${team[currentSlide].imageData}` : team[currentSlide].image}
//                       alt={team[currentSlide].name}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/288?text=' + team[currentSlide].name.charAt(0)
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="flex flex-col justify-center space-y-6">
//                 <div>
//                   <h3 className="text-4xl font-bold text-slate-900 mb-2">{team[currentSlide].name}</h3>
//                   <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-xl">{team[currentSlide].role}</p>
//                 </div>
//                 <p className="text-gray-700 leading-relaxed text-lg">{team[currentSlide].description}</p>
                
//                 {/* Slide Counter */}
//                 <div className="flex items-center gap-3 pt-6">
//                   <div className="flex gap-2 flex-wrap">
//                     {team.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentSlide(index)}
//                         className={`h-2 rounded-full transition-all duration-300 ${
//                           index === currentSlide ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 md:-translate-x-24 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 md:translate-x-24 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           {/* Slide Info */}
//           <div className="text-center mt-8 text-gray-300">
//             <p className="text-sm font-medium">
//               {currentSlide + 1} / {team.length}
//             </p>
//           </div>
//         </div>

//         {/* Thumbnails */}
//         <div className="flex justify-center gap-4 mt-16 flex-wrap">
//           {team.map((member, index) => (
//             <button
//               key={member._id || index}
//               onClick={() => setCurrentSlide(index)}
//               className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
//                 index === currentSlide ? 'ring-4 ring-gradient-to-r from-purple-500 to-pink-500 scale-110' : 'opacity-60 hover:opacity-100'
//               }`}
//             >
//               <img
//                 src={member.imageData ? `data:image/jpeg;base64,${member.imageData}` : member.image}
//                 alt={member.name}
//                 className="w-24 h-24 object-cover"
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/96?text=' + member.name.charAt(0)
//                 }}
//               />
//               <div className={`absolute inset-0 transition-all duration-300 ${
//                 index === currentSlide 
//                   ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30' 
//                   : 'bg-black bg-opacity-0 group-hover:bg-opacity-20'
//               }`} />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
