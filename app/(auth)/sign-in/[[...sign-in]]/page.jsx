import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-8 mr-10 ml-10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Welcome to <br /> AI Mock Interview
          </h2>
          <p className="text-base text-center">
            Sharpen your skills. Practice like it's real.
          </p>
        </div>
        
      <SignIn />
      </div>
    </div>
    
  )
}