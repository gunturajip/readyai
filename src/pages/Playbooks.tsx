import { useState } from 'react'
import { useAssessment, Playbook, PlaybookTask } from '../context/AssessmentContext'
import { BookOpen, Plus, MoreVertical, Calendar, Clock, CheckCircle, Circle, PlayCircle, Trash2, GripVertical } from 'lucide-react'

const samplePlaybook: Playbook = {
  id: '1',
  title: 'AI Chatbot Implementation',
  description: 'Deploy an AI-powered customer support chatbot to handle common inquiries 24/7.',
  createdAt: new Date().toISOString(),
  tasks: [
    { id: '1', title: 'Define chatbot scope and capabilities', description: 'Identify which customer inquiries the chatbot will handle', status: 'done', duration: '1 week' },
    { id: '2', title: 'Select AI chatbot platform', description: 'Research and choose between Dialogflow, IBM Watson, or custom solutions', status: 'in_progress', duration: '1 week' },
    { id: '3', title: 'Train chatbot with FAQ data', description: 'Upload existing FAQ documents and customer service logs for training', status: 'todo', duration: '2 weeks' },
    { id: '4', title: 'Integrate with website and messaging', description: 'Add chatbot to website, WhatsApp, and other channels', status: 'todo', duration: '1 week' },
    { id: '5', title: 'Test and refine responses', description: 'Run beta testing and iterate on responses based on feedback', status: 'todo', duration: '2 weeks' },
    { id: '6', title: 'Launch and monitor', description: 'Go live and track performance metrics', status: 'todo', duration: 'Ongoing' },
  ],
}

interface TaskCardProps {
  task: PlaybookTask
  onStatusChange: (taskId: string, status: PlaybookTask['status']) => void
  onDelete: (taskId: string) => void
}

function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const statusIcons = {
    todo: <Circle className="w-5 h-5 text-slate-400" />,
    in_progress: <PlayCircle className="w-5 h-5 text-amber-500" />,
    done: <CheckCircle className="w-5 h-5 text-green-500" />,
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <button className="cursor-grab text-slate-400 hover:text-slate-600">
          <GripVertical className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const nextStatus: Record<PlaybookTask['status'], PlaybookTask['status']> = {
              todo: 'in_progress',
              in_progress: 'done',
              done: 'todo',
            }
            onStatusChange(task.id, nextStatus[task.status])
          }}
        >
          {statusIcons[task.status]}
        </button>
        <div className="flex-1">
          <h4 className={`font-medium ${
            task.status === 'done' ? 'text-slate-400 line-through' : 'text-navy-900'
          }`}>
            {task.title}
          </h4>
          <p className="text-sm text-slate-500 mt-1">{task.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">{task.duration}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function Playbooks() {
  const { playbooks, setPlaybooks } = useAssessment()
  const [viewMode, setViewMode] = useState<'kanban' | 'timeline'>('kanban')
  const [showAddPlaybook, setShowAddPlaybook] = useState(false)
  const [newPlaybookTitle, setNewPlaybookTitle] = useState('')
  const [newPlaybookDesc, setNewPlaybookDesc] = useState('')

  const allPlaybooks = playbooks.length > 0 ? playbooks : [samplePlaybook]

  const handleStatusChange = (playbookId: string, taskId: string, status: PlaybookTask['status']) => {
    const updatedPlaybooks = allPlaybooks.map(playbook => {
      if (playbook.id === playbookId) {
        return {
          ...playbook,
          tasks: playbook.tasks.map(task =>
            task.id === taskId ? { ...task, status } : task
          ),
        }
      }
      return playbook
    })
    setPlaybooks(updatedPlaybooks)
  }

  const handleDeleteTask = (playbookId: string, taskId: string) => {
    const updatedPlaybooks = allPlaybooks.map(playbook => {
      if (playbook.id === playbookId) {
        return {
          ...playbook,
          tasks: playbook.tasks.filter(task => task.id !== taskId),
        }
      }
      return playbook
    })
    setPlaybooks(updatedPlaybooks)
  }

  const handleAddPlaybook = () => {
    if (!newPlaybookTitle.trim()) return

    const newPlaybook: Playbook = {
      id: Date.now().toString(),
      title: newPlaybookTitle,
      description: newPlaybookDesc,
      createdAt: new Date().toISOString(),
      tasks: [],
    }
    setPlaybooks([...playbooks, newPlaybook])
    setNewPlaybookTitle('')
    setNewPlaybookDesc('')
    setShowAddPlaybook(false)
  }

  const getColumnTasks = (playbook: Playbook, status: PlaybookTask['status']) => {
    return playbook.tasks.filter(task => task.status === status)
  }

  const getProgress = (playbook: Playbook) => {
    if (playbook.tasks.length === 0) return 0
    const doneTasks = playbook.tasks.filter(task => task.status === 'done').length
    return Math.round((doneTasks / playbook.tasks.length) * 100)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Implementation Playbooks
            </div>
            <h1 className="text-4xl font-display font-bold text-navy-900">
              Your AI Playbooks
            </h1>
            <p className="text-slate-600 mt-2">
              Track and manage your AI implementation tasks
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg p-1 border border-slate-200">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'kanban' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'timeline' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Timeline
              </button>
            </div>
            <button
              onClick={() => setShowAddPlaybook(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Playbook
            </button>
          </div>
        </div>

        {showAddPlaybook && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-display font-bold text-navy-900 mb-4">Create New Playbook</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Playbook Title</label>
                <input
                  type="text"
                  value={newPlaybookTitle}
                  onChange={(e) => setNewPlaybookTitle(e.target.value)}
                  placeholder="e.g., AI-Powered Marketing Automation"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Description</label>
                <textarea
                  value={newPlaybookDesc}
                  onChange={(e) => setNewPlaybookDesc(e.target.value)}
                  placeholder="Brief description of the AI project..."
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddPlaybook}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600"
                >
                  Create Playbook
                </button>
                <button
                  onClick={() => setShowAddPlaybook(false)}
                  className="px-4 py-2 border border-slate-300 text-navy-900 rounded-lg font-medium hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {allPlaybooks.map(playbook => (
          <div key={playbook.id} className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy-900">{playbook.title}</h2>
                  <p className="text-slate-600 mt-1">{playbook.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-500">{getProgress(playbook)}%</div>
                  <div className="text-sm text-slate-500">Complete</div>
                </div>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${getProgress(playbook)}%` }}
                />
              </div>
            </div>

            {viewMode === 'kanban' ? (
              <div className="grid md:grid-cols-3 gap-6">
                {(['todo', 'in_progress', 'done'] as const).map(status => (
                  <div key={status}>
                    <h3 className="font-semibold text-navy-900 mb-4 capitalize flex items-center gap-2">
                      {status === 'todo' && <Circle className="w-4 h-4 text-slate-400" />}
                      {status === 'in_progress' && <PlayCircle className="w-4 h-4 text-amber-500" />}
                      {status === 'done' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {status.replace('_', ' ')}
                      <span className="text-slate-400 text-sm">({getColumnTasks(playbook, status).length})</span>
                    </h3>
                    <div className="space-y-3">
                      {getColumnTasks(playbook, status).map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onStatusChange={(taskId, newStatus) => handleStatusChange(playbook.id, taskId, newStatus)}
                          onDelete={(taskId) => handleDeleteTask(playbook.id, taskId)}
                        />
                      ))}
                      {status === 'todo' && (
                        <button className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add Task
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-4">
                  {playbook.tasks.map((task, index) => (
                    <div key={task.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          task.status === 'done' ? 'bg-green-500 text-white' :
                          task.status === 'in_progress' ? 'bg-amber-500 text-white' :
                          'bg-slate-200 text-slate-500'
                        }`}>
                          {task.status === 'done' ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </div>
                        {index < playbook.tasks.length - 1 && (
                          <div className="w-0.5 h-8 bg-slate-200 mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className={`font-medium ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-navy-900'}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-400">{task.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
