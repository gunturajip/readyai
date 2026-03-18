import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROISimulation } from '../context/AssessmentContext'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Calculator, DollarSign, Users, Clock, Save, Play, ArrowRight } from 'lucide-react'

interface SimulationInputs {
  monthlyHoursSaved: number
  averageHourlyRate: number
  employeesAffected: number
  implementationCost: number
  monthlySoftwareCost: number
}

export default function ROISimulator() {
  const navigate = useNavigate()
  const [simulationName, setSimulationName] = useState('')
  const [inputs, setInputs] = useState<SimulationInputs>({
    monthlyHoursSaved: 50,
    averageHourlyRate: 25,
    employeesAffected: 5,
    implementationCost: 5000,
    monthlySoftwareCost: 200,
  })

  const projections = useMemo(() => {
    const months = []
    const monthlySavings = inputs.monthlyHoursSaved * inputs.averageHourlyRate * inputs.employeesAffected
    const totalMonthlyValue = monthlySavings - inputs.monthlySoftwareCost

    for (let month = 1; month <= 12; month++) {
      const cumulativeSavings = (totalMonthlyValue * month) - inputs.implementationCost
      months.push({
        month,
        savings: Math.max(0, cumulativeSavings),
        monthly: totalMonthlyValue,
      })
    }
    return months
  }, [inputs])

  const total12MonthSavings = projections[11]?.savings || 0
  const monthlySavings = inputs.monthlyHoursSaved * inputs.averageHourlyRate * inputs.employeesAffected - inputs.monthlySoftwareCost
  const paybackPeriod = inputs.implementationCost / monthlySavings

  const handleSaveSimulation = () => {
    const simulation: ROISimulation = {
      id: Date.now().toString(),
      name: simulationName || `Simulation ${Date.now()}`,
      monthlyHoursSaved: inputs.monthlyHoursSaved,
      employeesAffected: inputs.employeesAffected,
      implementationCost: inputs.implementationCost,
      monthlySoftwareCost: inputs.monthlySoftwareCost,
      projections: projections.map(p => ({ month: p.month, savings: p.savings })),
      createdAt: new Date().toISOString(),
    }
    
    const saved = JSON.parse(localStorage.getItem('roiSimulations') || '[]')
    localStorage.setItem('roiSimulations', JSON.stringify([...saved, simulation]))
    
    setSimulationName('')
    alert('Simulation saved!')
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            ROI Simulator
          </div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-4">
            Calculate Your ROI
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See the financial impact of AI implementation with detailed projections.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-display font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-500" />
                Input Parameters
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Monthly Hours Saved
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={inputs.monthlyHoursSaved}
                    onChange={(e) => setInputs(prev => ({ ...prev, monthlyHoursSaved: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-amber-600 font-semibold">{inputs.monthlyHoursSaved} hours</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Average Hourly Rate ($)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={inputs.averageHourlyRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, averageHourlyRate: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-amber-600 font-semibold">${inputs.averageHourlyRate}/hour</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Employees Affected
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={inputs.employeesAffected}
                    onChange={(e) => setInputs(prev => ({ ...prev, employeesAffected: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-amber-600 font-semibold">{inputs.employeesAffected} employees</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    Implementation Cost ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.implementationCost}
                    onChange={(e) => setInputs(prev => ({ ...prev, implementationCost: Number(e.target.value) }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    Monthly Software Cost ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlySoftwareCost}
                    onChange={(e) => setInputs(prev => ({ ...prev, monthlySoftwareCost: Number(e.target.value) }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <button
                  onClick={handleSaveSimulation}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Simulation
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">${monthlySavings.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Monthly Net Savings</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600">${total12MonthSavings.toLocaleString()}</div>
                  <div className="text-sm text-amber-700">12-Month Projection</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">{paybackPeriod.toFixed(1)}</div>
                  <div className="text-sm text-blue-700">Payback Period (months)</div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projections}>
                    <defs>
                      <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#64748b' }}
                      tickFormatter={(value) => `M${value}`}
                    />
                    <YAxis 
                      tick={{ fill: '#64748b' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cumulative Savings']}
                      labelFormatter={(label) => `Month ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#f59e0b" 
                      fill="url(#savingsGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-xl p-6 text-white">
              <h3 className="font-display font-bold text-lg mb-4">Ready to implement?</h3>
              <p className="text-slate-300 mb-4">
                Create an implementation playbook to start executing your AI project.
              </p>
              <button
                onClick={() => navigate('/playbooks')}
                className="flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300"
              >
                Create Playbook
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
