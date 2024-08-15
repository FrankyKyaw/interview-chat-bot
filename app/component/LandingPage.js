import { useRouter } from 'next/navigation'
import React from 'react'

const LandingPage = () => {
    const router = useRouter();

    const handleStartChat = () => {
        router.push('/chatbot');
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700">
      <h1 className="text-5xl font-bold text-white mb-6">
        Welcome to Interview AI
      </h1>
      <p className="text-lg text-white mb-8 text-center max-w-md">
        Prepare for your software engineering interviews with our AI-powered
        chatbot. Get personalized advice, practice questions, and more.
      </p>
      <button
        onClick={handleStartChat}
        className="bg-white text-indigo-800 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 font-semibold"
      >
        Start Chatting
      </button>
    </div>
  )
}

export default LandingPage