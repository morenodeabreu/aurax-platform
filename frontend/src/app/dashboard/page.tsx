'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authManager } from '@/lib/auth'
import { MessageSquare, Settings, Users, Bot } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    if (\!authManager.isAuthenticated()) {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    authManager.logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">AURAX Platform</h1>
            <p className="text-gray-400">Multi-LLM Chat Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/chat" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Start Chat</h3>
            <p className="text-gray-300">Begin a new conversation</p>
          </Link>
          
          <Link href="/providers" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <Bot className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Providers</h3>
            <p className="text-gray-300">Manage LLM providers</p>
          </Link>
          
          <Link href="/users" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <Users className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Users</h3>
            <p className="text-gray-300">User management</p>
          </Link>
          
          <Link href="/settings" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <Settings className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
            <p className="text-gray-300">Account settings</p>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">0</div>
              <div className="text-gray-400">Total Messages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">2</div>
              <div className="text-gray-400">Active Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">1</div>
              <div className="text-gray-400">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
