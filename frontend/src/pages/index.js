/**
 * AURAX Platform - Home Page
 * Next.js landing page with modern design
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ChatBubbleLeftRightIcon, 
  CpuChipIcon, 
  LightBulbIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const features = [
    {
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      title: "Multi-LLM Chat",
      description: "Acesse OpenAI, Claude, Gemini e Ollama em uma única interface"
    },
    {
      icon: <CpuChipIcon className="w-6 h-6" />,
      title: "API Unificada",
      description: "Uma API para todos os provedores com roteamento inteligente"
    },
    {
      icon: <LightBulbIcon className="w-6 h-6" />,
      title: "Developer First",
      description: "Construído por desenvolvedores, para desenvolvedores"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mês",
      features: [
        "1,000 tokens/mês",
        "1 LLM provider",
        "Chat básico",
        "Community support"
      ],
      cta: "Começar Grátis",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/mês",
      features: [
        "100K tokens/mês",
        "Todos LLM providers",
        "Chat history",
        "Email support",
        "API access"
      ],
      cta: "Upgrade Pro",
      popular: true
    },
    {
      name: "Team",
      price: "$99",
      period: "/mês",
      features: [
        "500K tokens/mês",
        "Team collaboration",
        "Advanced analytics",
        "Priority support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <>
      <Head>
        <title>AURAX Platform - Multi-LLM para Desenvolvedores</title>
        <meta name="description" content="Plataforma completa para acessar múltiplos modelos de linguagem através de uma interface unificada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AURAX</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900">Pricing</a>
              <a href="#docs" className="text-gray-500 hover:text-gray-900">Docs</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-500 hover:text-gray-900">
                Login
              </Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Multi-LLM Platform
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                  para Desenvolvedores
                </span>
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
                Acesse OpenAI, Claude, Gemini e Ollama através de uma interface unificada. 
                Simplifique seu desenvolvimento com IA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center">
                  Começar Grátis
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/demo" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
                  Ver Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Recursos Principais
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tudo que você precisa para trabalhar com IA em um só lugar
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Preços Simples e Transparentes
              </h3>
              <p className="text-lg text-gray-600">
                Escolha o plano ideal para suas necessidades
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`bg-white p-8 rounded-xl shadow-lg ${plan.popular ? 'ring-2 ring-blue-600 relative' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {plan.name}
                    </h4>
                    <div className="flex items-end justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Junte-se a milhares de desenvolvedores que já usam AURAX
            </p>
            <Link href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center">
              Criar Conta Gratuita
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">AURAX</h5>
              <p className="text-gray-400">
                Multi-LLM Platform para Desenvolvedores
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Produto</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Recursos</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentação</a></li>
                <li><a href="#" className="hover:text-white">Guias</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Empresa</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Suporte</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AURAX Platform. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;