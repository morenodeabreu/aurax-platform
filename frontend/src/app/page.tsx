export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to AURAX Platform
          </h1>
          <p className="text-xl text-gray-300">
            Your Multi-LLM Chat Assistant
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Chat</h3>
            <p className="text-gray-300">Start chatting with multiple LLM providers</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Providers</h3>
            <p className="text-gray-300">Manage your LLM provider connections</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
            <p className="text-gray-300">Configure your account and preferences</p>
          </div>
        </div>
      </div>
    </div>
  )
}
