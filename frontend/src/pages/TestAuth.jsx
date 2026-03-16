import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const TestAuth = () => {
  const { user, loading } = useContext(AuthContext)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Auth Test Page</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Current Auth State</h2>
        
        <div className="space-y-4">
          <div>
            <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
          </div>
          
          <div>
            <strong>User Logged In:</strong> {user ? 'Yes' : 'No'}
          </div>
          
          {user && (
            <>
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Role:</strong> {user.role}
              </div>
              <div>
                <strong>Approved:</strong> {user.approved ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>User ID:</strong> {user.id || user._id}
              </div>
            </>
          )}
          
          <div className="mt-6">
            <strong>LocalStorage Token:</strong>
            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
              {localStorage.getItem('token') || 'No token found'}
            </pre>
          </div>
          
          <div className="mt-6">
            <strong>Full User Object:</strong>
            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestAuth
