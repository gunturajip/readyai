import { useState } from 'react'
import { useAssessment, UseCase } from '../context/AssessmentContext'
import { Lightbulb, Building2, Users, DollarSign, AlertTriangle, Check, Filter, Save } from 'lucide-react'

const industries = [
  'Retail & E-commerce',
  'Manufacturing',
  'Services & Consulting',
  'Finance & Banking',
  'Healthcare',
  'Education',
  'Food & Beverage',
  'Logistics',
]

const departments = [
  'Marketing',
  'Sales',
  'Operations',
  'Finance',
  'HR',
  'Customer Service',
  'IT',
  'Admin',
]

const painPoints = [
  'High operational costs',
  'Manual data entry',
  'Poor customer response time',
  'Inventory management issues',
  'Limited marketing reach',
  'Inefficient processes',
  'Lack of data insights',
  'High employee turnover',
  'Compliance challenges',
  'Cash flow management',
]

const sampleUseCases: UseCase[] = [
  {
    id: '1',
    title: 'AI-Powered Customer Support Chatbot',
    description: 'Implement an AI chatbot to handle common customer inquiries 24/7, reducing support costs by up to 60%.',
    department: 'Customer Service',
    industry: 'Retail & E-commerce',
    painPoints: ['Poor customer response time', 'High operational costs'],
    estimatedSavings: '$15,000-50,000/year',
    complexity: 'Medium',
  },
  {
    id: '2',
    title: 'Automated Inventory Forecasting',
    description: 'Use ML algorithms to predict inventory needs, reducing stockouts and overstock by 30%.',
    department: 'Operations',
    industry: 'Retail & E-commerce',
    painPoints: ['Inventory management issues', 'High operational costs'],
    estimatedSavings: '$20,000-100,000/year',
    complexity: 'High',
  },
  {
    id: '3',
    title: 'AI-Driven Lead Scoring & Prioritization',
    description: 'Automatically score and prioritize leads based on conversion probability, improving sales efficiency.',
    department: 'Sales',
    industry: 'Services & Consulting',
    painPoints: ['Manual data entry', 'Limited marketing reach'],
    estimatedSavings: '$25,000-80,000/year',
    complexity: 'Low',
  },
  {
    id: '4',
    title: 'Smart Financial Forecasting',
    description: 'AI-powered cash flow predictions and financial planning to make better business decisions.',
    department: 'Finance',
    industry: 'Finance & Banking',
    painPoints: ['Cash flow management', 'Lack of data insights'],
    estimatedSavings: '$30,000-150,000/year',
    complexity: 'High',
  },
  {
    id: '5',
    title: 'Automated Document Processing',
    description: 'Extract and process data from invoices, contracts, and receipts automatically.',
    department: 'Operations',
    industry: 'Manufacturing',
    painPoints: ['Manual data entry', 'Inefficient processes'],
    estimatedSavings: '$10,000-40,000/year',
    complexity: 'Low',
  },
  {
    id: '6',
    title: 'Personalized Marketing Campaigns',
    description: 'AI-powered customer segmentation and personalized campaign creation for higher conversion.',
    department: 'Marketing',
    industry: 'Retail & E-commerce',
    painPoints: ['Limited marketing reach', 'Lack of data insights'],
    estimatedSavings: '$20,000-75,000/year',
    complexity: 'Medium',
  },
]

const complexityColors = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-red-100 text-red-700',
}

export default function UseCaseGenerator() {
  const { savedUseCases, setSavedUseCases, assessmentResult } = useAssessment()
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredUseCases = sampleUseCases.filter(useCase => {
    if (selectedIndustry && useCase.industry !== selectedIndustry) return false
    if (selectedDepartment && useCase.department !== selectedDepartment) return false
    if (selectedPainPoints.length > 0) {
      const hasMatchingPainPoint = useCase.painPoints.some(p => selectedPainPoints.includes(p))
      if (!hasMatchingPainPoint) return false
    }
    return true
  })

  const handleSaveUseCase = (useCase: UseCase) => {
    const isAlreadySaved = savedUseCases.some(u => u.id === useCase.id)
    if (isAlreadySaved) {
      setSavedUseCases(savedUseCases.filter(u => u.id !== useCase.id))
    } else {
      setSavedUseCases([...savedUseCases, useCase])
    }
  }

  const togglePainPoint = (painPoint: string) => {
    setSelectedPainPoints(prev => 
      prev.includes(painPoint)
        ? prev.filter(p => p !== painPoint)
        : [...prev, painPoint]
    )
  }

  const isSaved = (id: string) => savedUseCases.some(u => u.id === id)

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            AI Use Case Generator
          </div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-4">
            Discover AI Opportunities
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Based on your industry and challenges, we've curated relevant AI use cases for your business.
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-navy-900 hover:bg-slate-50"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>

          {showFilters && (
            <div className="mt-4 bg-white rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    Industry
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">All Industries</option>
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    Pain Points
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {painPoints.map(point => (
                      <button
                        key={point}
                        onClick={() => togglePainPoint(point)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          selectedPainPoints.includes(point)
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {point}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {assessmentResult && (
          <div className="mb-8 bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-2">Based on your assessment: {assessmentResult.maturityTier} level</h3>
            <p className="text-sm opacity-90">
              We recommend focusing on {assessmentResult.recommendations[0]?.toLowerCase() || 'AI opportunities'} 
              {' '}that align with your current digital maturity.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUseCases.map(useCase => (
            <div key={useCase.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${complexityColors[useCase.complexity]}`}>
                  {useCase.complexity} Complexity
                </span>
                <button
                  onClick={() => handleSaveUseCase(useCase)}
                  className={`p-2 rounded-lg transition-colors ${
                    isSaved(useCase.id)
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {isSaved(useCase.id) ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                </button>
              </div>

              <h3 className="text-xl font-display font-bold text-navy-900 mb-3">
                {useCase.title}
              </h3>

              <p className="text-slate-600 text-sm mb-4">
                {useCase.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {useCase.painPoints.map((point, idx) => (
                  <span key={idx} className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded">
                    {point}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                  <Building2 className="w-4 h-4" />
                  {useCase.industry}
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                  <Users className="w-4 h-4" />
                  {useCase.department}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-amber-600 font-semibold">
                <DollarSign className="w-4 h-4" />
                {useCase.estimatedSavings}
              </div>
            </div>
          ))}
        </div>

        {filteredUseCases.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No use cases match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
