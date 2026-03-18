import { Link, useNavigate } from 'react-router-dom'
import { useAssessment, MATURITY_TIERS, UseCase } from '../context/AssessmentContext'
import { ClipboardCheck, Lightbulb, TrendingUp, BookOpen, ArrowRight, CheckCircle, DollarSign, Target, Zap } from 'lucide-react'

const quickActions = [
  { path: '/assessment', label: 'Take Assessment', icon: ClipboardCheck, color: 'bg-amber-500' },
  { path: '/use-cases', label: 'Generate Use Cases', icon: Lightbulb, color: 'bg-blue-500' },
  { path: '/roi', label: 'Calculate ROI', icon: TrendingUp, color: 'bg-green-500' },
  { path: '/playbooks', label: 'View Playbooks', icon: BookOpen, color: 'bg-purple-500' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { assessmentResult, savedUseCases, playbooks } = useAssessment()

  const tier = assessmentResult
    ? MATURITY_TIERS[assessmentResult.maturityTier as keyof typeof MATURITY_TIERS]
    : null

  const completedModules = [
    { name: 'Digital Maturity Assessment', completed: !!assessmentResult },
    { name: 'Use Case Generation', completed: savedUseCases.length > 0 },
    { name: 'ROI Simulation', completed: false },
    { name: 'Implementation Playbooks', completed: playbooks.length > 0 },
  ]

  const completionPercentage = Math.round(
    (completedModules.filter(m => m.completed).length / completedModules.length) * 100
  )

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">
            Welcome to ReadyAI
          </h1>
          <p className="text-slate-600">
            Your AI readiness journey starts here. Complete each module to transform your business.
          </p>
        </div>

        {assessmentResult ? (
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2 bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6" />
                <span className="font-medium">Your Current Status</span>
              </div>
              <div className="text-5xl font-bold mb-2">{tier?.name}</div>
              <p className="text-white/90 mb-6">{tier?.description}</p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{assessmentResult.totalScore}</div>
                  <div className="text-sm text-white/80">Total Score</div>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-white/80">Dimensions</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-display font-bold text-navy-900 mb-6">Module Progress</h3>
              <div className="space-y-4">
                {completedModules.map((module, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${module.completed ? 'bg-green-500' : 'bg-slate-200'
                      }`}>
                      {module.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={module.completed ? 'text-navy-900' : 'text-slate-500'}>
                      {module.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Overall Progress</span>
                  <span className="font-semibold text-amber-600">{completionPercentage}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 text-white mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-amber-400" />
              <span className="font-medium">Get Started</span>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">
              Take Your First Step
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Complete our digital maturity assessment to understand where your business stands and get personalized AI recommendations.
            </p>
            <button
              onClick={() => navigate('/assessment')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-1">{action.label}</h3>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {savedUseCases.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">Saved Use Cases</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedUseCases.slice(0, 3).map((useCase: UseCase) => (
                <div key={useCase.id} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-semibold text-navy-900 mb-2">{useCase.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{useCase.description}</p>
                  <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
                    <DollarSign className="w-4 h-4" />
                    {useCase.estimatedSavings}
                  </div>
                </div>
              ))}
            </div>
            {savedUseCases.length > 3 && (
              <Link
                to="/use-cases"
                className="inline-flex items-center gap-2 mt-4 text-amber-600 font-medium hover:text-amber-700"
              >
                View all {savedUseCases.length} use cases
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-navy-900">Assessment</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Understand your digital maturity level across 7 key dimensions.
            </p>
            <Link
              to="/assessment"
              className="text-amber-600 font-medium text-sm hover:text-amber-700 inline-flex items-center gap-1"
            >
              {assessmentResult ? 'Retake' : 'Take'} Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-navy-900">Use Cases</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Discover AI opportunities tailored to your industry and challenges.
            </p>
            <Link
              to="/use-cases"
              className="text-blue-600 font-medium text-sm hover:text-blue-700 inline-flex items-center gap-1"
            >
              Explore Use Cases <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-navy-900">ROI Simulator</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Calculate the financial impact and ROI of your AI initiatives.
            </p>
            <Link
              to="/roi"
              className="text-green-600 font-medium text-sm hover:text-green-700 inline-flex items-center gap-1"
            >
              Calculate ROI <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
