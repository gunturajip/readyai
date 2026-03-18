import { Link } from 'react-router-dom'
import { Rocket, CheckCircle, ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react'

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Target,
    title: 'Digital Maturity Assessment',
    description: 'Understand where your business stands with our comprehensive 7-dimension evaluation.',
  },
  {
    icon: Sparkles,
    title: 'AI Use Case Generator',
    description: 'Get personalized AI opportunities tailored to your industry and maturity level.',
  },
  {
    icon: TrendingUp,
    title: 'ROI Simulator',
    description: 'Calculate the financial impact of AI adoption with precise projections.',
  },
  {
    icon: CheckCircle,
    title: 'Implementation Playbooks',
    description: 'Follow step-by-step guides to implement AI solutions in your business.',
  },
]

export default function Home() {
  return (
    <div>
      <section className="gradient-bg min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI Readiness Platform for Southeast Asia
              </div>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Transform Your Business with AI
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-lg">
                From "AI curiosity" to "executed use cases with measurable ROI." We guide SMEs through every step of their AI journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/assessment"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
                >
                  Start Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  View Demo
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Assessment Complete</div>
                        <div className="text-slate-400 text-sm">Maturity Level: Emerging</div>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <div className="text-amber-400 font-bold text-2xl">6</div>
                        <div className="text-slate-400 text-xs">Use Cases</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <div className="text-amber-400 font-bold text-2xl">340%</div>
                        <div className="text-slate-400 text-xs">12-Month ROI</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <div className="text-amber-400 font-bold text-2xl">8</div>
                        <div className="text-slate-400 text-xs">Weeks to Implement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-navy-900 mb-4">
              Everything You Need to Go AI-Ready
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive platform guides you from assessment to implementation, making AI accessible for every business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-navy-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-navy-900 mb-6">
                Why Southeast Asian Businesses Trust ReadyAI
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">Localized for SEA</h4>
                    <p className="text-slate-600">Built specifically for Indonesian and Southeast Asian businesses with relevant examples and currency support.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">No Technical Knowledge Required</h4>
                    <p className="text-slate-600">Jargon-free language and step-by-step guidance that anyone can follow.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">Proven ROI Framework</h4>
                    <p className="text-slate-600">Calculate real financial returns before investing a single dollar.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="text-sm text-slate-500 mb-2">Trusted by businesses across</div>
                <div className="text-2xl font-display font-bold text-navy-900">Indonesia, Singapore, Malaysia & More</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-amber-500">500+</div>
                  <div className="text-slate-600 text-sm">Assessments</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-500">200+</div>
                  <div className="text-slate-600 text-sm">Use Cases Generated</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-500">95%</div>
                  <div className="text-slate-600 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Take our free digital maturity assessment and discover your AI readiness in just 5 minutes.
          </p>
          <Link
            to="/assessment"
            className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
          >
            Start Your Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
