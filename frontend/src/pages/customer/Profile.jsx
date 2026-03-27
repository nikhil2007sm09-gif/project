import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Profile = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <div className="container mx-auto px-4 py-16 text-center">Please login</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Name:</label>
            <p className="text-gray-700">{user.name}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div>
            <label className="font-semibold">Role:</label>
            <p className="text-gray-700 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
