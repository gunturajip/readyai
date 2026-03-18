import { useNavigate, Link } from 'react-router-dom'
import { useAssessment, MATURITY_TIERS, AssessmentScores } from '../context/AssessmentContext'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { CheckCircle, AlertCircle, ArrowRight, RefreshCw, Award, Target, Zap, Shield, Database, Users, Wallet, GitBranch, FileText, Lock } from 'lucide-react'

const dimensionLabels: Record<keyof AssessmentScores, string> = {
  data: 'Data Management',
  tools: 'Current Tools',
  team: 'Team Capabilities',
  budget: 'Budget',
  processes: 'Processes',
  integration: 'Integration',
  security: 'Security',
}

const dimensionIcons: Record<keyof AssessmentScores, React.ComponentType<{ className?: string }>> = {
  data: Database,
  tools: Target,
  team: Users,
  budget: Wallet,
  processes: FileText,
  integration: GitBranch,
  security: Lock,
}

export default function AssessmentResult() {
  const navigate = useNavigate()
  const { assessmentResult, resetAssessment } = useAssessment()

  if (!assessmentResult) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">No assessment results found.</p>
          <Link to="/assessment" className="btn-primary">
            Take Assessment
          </Link>
        </div>
      </div>
    )
  }

  const tier = MATURITY_TIERS[assessmentResult.maturityTier as keyof typeof MATURITY_TIERS]
  
  const radarData = Object.entries(assessmentResult.scores).map(([key, value]) => ({
    dimension: dimensionLabels[key as keyof AssessmentScores],
    score: value,
    fullMark: 4,
  }))

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Assessment Complete
          </div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-4">
            Your AI Readiness Results
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Based on your responses, here's your digital maturity assessment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div 
                className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 mx-auto"
                style={{ backgroundColor: `${tier.color}20` }}
              >
                <span className="text-5xl font-bold" style={{ color: tier.color }}>
                  {assessmentResult.totalScore}
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-navy-900">
                {tier.name}
              </h2>
              <p className="text-slate-600 mt-2">
                {tier.description}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Score: {tier.range[0]} - {tier.range[1]}
              </p>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="dimension" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 4]} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-display font-bold text-navy-900 mb-6">
                Dimension Breakdown
              </h3>
              <div className="space-y-4">
                {Object.entries(assessmentResult.scores).map(([key, value]) => {
                  const Icon = dimensionIcons[key as keyof AssessmentScores]
                  const percentage = (value / 4) * 100
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-navy-900">
                            {dimensionLabels[key as keyof AssessmentScores]}
                          </span>
                        </div>
                        <span className="text-slate-600">{value}/4</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {assessmentResult.blockers.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-display font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Key Blockers
                </h3>
                <ul className="space-y-3">
                  {assessmentResult.blockers.map((blocker, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      {blocker}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {assessmentResult.recommendations.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-display font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {assessmentResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetAssessment}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 text-navy-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Retake Assessment
          </button>
          <Link
            to="/use-cases"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 shadow-lg hover:shadow-xl transition-all"
          >
            Generate Use Cases
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
