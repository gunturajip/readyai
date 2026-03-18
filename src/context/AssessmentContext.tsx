import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface Answer {
  score: number
  label: string
  description?: string
}

export interface AssessmentScores {
  data: number
  tools: number
  team: number
  budget: number
  processes: number
  integration: number
  security: number
}

export interface AssessmentResult {
  scores: AssessmentScores
  totalScore: number
  maturityTier: 'FOUNDATIONAL' | 'EMERGING' | 'CONNECTED' | 'AI_READY'
  blockers: string[]
  recommendations: string[]
  completedAt: string
}

export interface UseCase {
  id: string
  title: string
  description: string
  department: string
  industry: string
  painPoints: string[]
  estimatedSavings: string
  complexity: 'Low' | 'Medium' | 'High'
}

export interface ROISimulation {
  id: string
  name: string
  monthlyHoursSaved: number
  employeesAffected: number
  implementationCost: number
  monthlySoftwareCost: number
  projections: { month: number; savings: number }[]
  createdAt: string
}

export interface PlaybookTask {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  duration: string
}

export interface Playbook {
  id: string
  title: string
  description: string
  tasks: PlaybookTask[]
  createdAt: string
}

interface AssessmentContextType {
  currentStep: number
  answers: Record<string, Answer | null>
  assessmentResult: AssessmentResult | null
  savedUseCases: UseCase[]
  roiSimulations: ROISimulation[]
  playbooks: Playbook[]
  updateAnswer: (stepKey: string, value: Answer) => void
  calculateScores: () => AssessmentResult
  nextStep: () => void
  prevStep: () => void
  resetAssessment: () => void
  setAssessmentResult: (result: AssessmentResult | null) => void
  setSavedUseCases: (useCases: UseCase[]) => void
  setRoiSimulations: (simulations: ROISimulation[]) => void
  setPlaybooks: (playbooks: Playbook[]) => void
}

const AssessmentContext = createContext<AssessmentContextType | null>(null)

export const ASSESSMENT_STEPS = [
  { key: 'data', title: 'Data Management', description: 'How do you collect and store data?' },
  { key: 'tools', title: 'Current Tools', description: 'What software do you use?' },
  { key: 'team', title: 'Team Capabilities', description: 'How tech-savvy is your team?' },
  { key: 'budget', title: 'Budget', description: 'What\'s your tech spending?' },
  { key: 'processes', title: 'Processes', description: 'How are your processes documented?' },
  { key: 'integration', title: 'Integration', description: 'Do your tools work together?' },
  { key: 'security', title: 'Security', description: 'Do you have data policies?' },
]

export const MATURITY_TIERS = {
  FOUNDATIONAL: { name: 'Foundational', range: [0, 8], color: '#ef4444', description: 'Manual processes, limited digital tools' },
  EMERGING: { name: 'Emerging', range: [9, 16], color: '#f59e0b', description: 'Partially digital, some automation' },
  CONNECTED: { name: 'Connected', range: [17, 22], color: '#22c55e', description: 'Integrated tools, data-driven decisions' },
  AI_READY: { name: 'AI-Ready', range: [23, 28], color: '#0F1B2D', description: 'Fully automated, data-driven, prepared for AI' },
}

const INITIAL_ANSWERS: Record<string, Answer | null> = {
  data: null,
  tools: null,
  team: null,
  budget: null,
  processes: null,
  integration: null,
  security: null,
}

interface AssessmentProviderProps {
  children: ReactNode
}

export function AssessmentProvider({ children }: AssessmentProviderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer | null>>(INITIAL_ANSWERS)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [savedUseCases, setSavedUseCases] = useState<UseCase[]>([])
  const [roiSimulations, setRoiSimulations] = useState<ROISimulation[]>([])
  const [playbooks, setPlaybooks] = useState<Playbook[]>([])

  const updateAnswer = useCallback((stepKey: string, value: Answer) => {
    setAnswers(prev => ({ ...prev, [stepKey]: value }))
  }, [])

  const calculateScores = useCallback((): AssessmentResult => {
    const scores: AssessmentScores = {
      data: 0,
      tools: 0,
      team: 0,
      budget: 0,
      processes: 0,
      integration: 0,
      security: 0,
    }

    Object.keys(answers).forEach(key => {
      const answer = answers[key]
      if (answer !== null && 'score' in answer) {
        scores[key as keyof AssessmentScores] = answer.score
      }
    })

    const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0)

    let maturityTier: AssessmentResult['maturityTier'] = 'FOUNDATIONAL'
    if (totalScore >= 23) maturityTier = 'AI_READY'
    else if (totalScore >= 17) maturityTier = 'CONNECTED'
    else if (totalScore >= 9) maturityTier = 'EMERGING'

    const blockers: string[] = []
    const recommendations: string[] = []

    if (scores.data < 3) {
      blockers.push('Limited data collection and storage')
      recommendations.push('Implement a centralized data collection system')
    }
    if (scores.tools < 3) {
      blockers.push('Basic or manual tools')
      recommendations.push('Upgrade to modern SaaS tools for your core operations')
    }
    if (scores.team < 3) {
      blockers.push('Limited technical expertise')
      recommendations.push('Invest in team training or hire tech support')
    }
    if (scores.processes < 3) {
      blockers.push('Undocumented processes')
      recommendations.push('Document your key business processes')
    }
    if (scores.integration < 3) {
      blockers.push('Disconnected tools')
      recommendations.push('Integrate your tools via APIs or automation')
    }
    if (scores.security < 3) {
      blockers.push('Weak data security')
      recommendations.push('Implement basic data security policies')
    }

    const result: AssessmentResult = {
      scores,
      totalScore,
      maturityTier,
      blockers: blockers.slice(0, 3),
      recommendations: recommendations.slice(0, 3),
      completedAt: new Date().toISOString(),
    }

    setAssessmentResult(result)
    return result
  }, [answers])

  const nextStep = useCallback(() => {
    if (currentStep < ASSESSMENT_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const resetAssessment = useCallback(() => {
    setCurrentStep(0)
    setAnswers(INITIAL_ANSWERS)
    setAssessmentResult(null)
  }, [])

  const value: AssessmentContextType = {
    currentStep,
    answers,
    assessmentResult,
    savedUseCases,
    roiSimulations,
    playbooks,
    updateAnswer,
    calculateScores,
    nextStep,
    prevStep,
    resetAssessment,
    setAssessmentResult,
    setSavedUseCases,
    setRoiSimulations,
    setPlaybooks,
  }

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment(): AssessmentContextType {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}

export default AssessmentContext
