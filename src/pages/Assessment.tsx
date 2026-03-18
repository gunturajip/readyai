import { useNavigate } from 'react-router-dom'
import { useAssessment, ASSESSMENT_STEPS, Answer } from '../context/AssessmentContext'
import { CheckCircle, ArrowRight, ArrowLeft, ClipboardCheck } from 'lucide-react'

interface Option {
  value: number
  label: string
  description: string
}

const OPTIONS: Record<string, Option[]> = {
  data: [
    { value: 0, label: 'Manual / No system', description: 'We collect data on paper or not at all' },
    { value: 1, label: 'Spreadsheets', description: 'We use Excel or Google Sheets for some data' },
    { value: 2, label: 'Basic software', description: 'We have basic software but data is siloed' },
    { value: 3, label: 'Integrated system', description: 'We have integrated tools with central storage' },
    { value: 4, label: 'Full data infrastructure', description: 'We have data warehouse and analytics ready' },
  ],
  tools: [
    { value: 0, label: 'Manual processes', description: 'We do everything manually' },
    { value: 1, label: 'Basic software', description: 'We use basic tools like email and spreadsheets' },
    { value: 2, label: 'Some SaaS tools', description: 'We use some modern software for specific tasks' },
    { value: 3, label: 'Integrated SaaS stack', description: 'Most tools are connected and cloud-based' },
    { value: 4, label: 'Full tech stack', description: 'Complete modern tech infrastructure' },
  ],
  team: [
    { value: 0, label: 'No tech expertise', description: 'No one with technical skills' },
    { value: 1, label: 'Limited skills', description: 'A few people with basic computer skills' },
    { value: 2, label: 'Some technical staff', description: 'We have IT support but limited' },
    { value: 3, label: 'Tech-capable team', description: 'Team can use and adapt to new tools' },
    { value: 4, label: 'Tech-forward team', description: 'Team embraces and learns new technology quickly' },
  ],
  budget: [
    { value: 0, label: 'No budget', description: 'No allocated budget for technology' },
    { value: 1, label: 'Minimal budget', description: 'Less than $500/month for tech' },
    { value: 2, label: 'Moderate budget', description: '$500-$2000/month for technology' },
    { value: 3, label: 'Good budget', description: '$2000-$5000/month available' },
    { value: 4, label: 'Strong budget', description: 'Over $5000/month for tech and innovation' },
  ],
  processes: [
    { value: 0, label: 'Not documented', description: 'No processes are documented' },
    { value: 1, label: 'Partially documented', description: 'Some key processes are written down' },
    { value: 2, label: 'Mostly documented', description: 'Most processes are documented' },
    { value: 3, label: 'Well documented', description: 'All processes are documented and standardized' },
    { value: 4, label: 'Digitally automated', description: 'Processes are automated with digital workflows' },
  ],
  integration: [
    { value: 0, label: 'No integration', description: 'Tools don\'t communicate with each other' },
    { value: 1, label: 'Manual transfers', description: 'We manually move data between tools' },
    { value: 2, label: 'Some automation', description: 'Some tools are connected via integrations' },
    { value: 3, label: 'Mostly integrated', description: 'Most tools share data automatically' },
    { value: 4, label: 'Fully integrated', description: 'Complete integration with unified data flow' },
  ],
  security: [
    { value: 0, label: 'No security', description: 'No data security measures in place' },
    { value: 1, label: 'Basic security', description: 'Basic password protection only' },
    { value: 2, label: 'Standard security', description: 'Standard security with backups' },
    { value: 3, label: 'Strong security', description: 'Multi-factor auth, encryption, regular backups' },
    { value: 4, label: 'Enterprise security', description: 'Full security suite with compliance' },
  ],
}

export default function Assessment() {
  const navigate = useNavigate()
  const { currentStep, answers, updateAnswer, nextStep, prevStep, calculateScores } = useAssessment()
  
  const step = ASSESSMENT_STEPS[currentStep]
  const currentOptions = OPTIONS[step.key] || []
  const currentAnswer = answers[step.key]
  const progress = ((currentStep + 1) / ASSESSMENT_STEPS.length) * 100

  const handleOptionSelect = (option: Option) => {
    const answer: Answer = {
      score: option.value,
      label: option.label,
      description: option.description,
    }
    updateAnswer(step.key, answer)
  }

  const handleNext = () => {
    if (currentStep === ASSESSMENT_STEPS.length - 1) {
      calculateScores()
      navigate('/assessment/result')
    } else {
      nextStep()
    }
  }

  const canProceed = currentAnswer !== null

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ClipboardCheck className="w-4 h-4" />
            Step {currentStep + 1} of {ASSESSMENT_STEPS.length}
          </div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-4">
            {step.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {step.description}
          </p>
        </div>

        <div className="mb-12">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4 mb-12">
          {currentOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-6 rounded-xl text-left transition-all duration-200 ${
                currentAnswer?.score === option.value
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white border-2 border-slate-200 hover:border-amber-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  currentAnswer?.score === option.value
                    ? 'border-white bg-white/20'
                    : 'border-slate-300'
                }`}>
                  {currentAnswer?.score === option.value && (
                    <CheckCircle className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className={`font-semibold text-lg ${
                    currentAnswer?.score === option.value ? 'text-white' : 'text-navy-900'
                  }`}>
                    {option.label}
                  </div>
                  <div className={`${
                    currentAnswer?.score === option.value ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-navy-900 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
              canProceed
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentStep === ASSESSMENT_STEPS.length - 1 ? 'View Results' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
