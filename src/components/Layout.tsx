import { Link, useLocation } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Lightbulb, 
  TrendingUp, 
  BookOpen,
  Menu,
  X,
  Rocket
} from 'lucide-react'
import { useState, ReactNode } from 'react'

interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/assessment', label: 'Assessment', icon: ClipboardCheck },
  { path: '/use-cases', label: 'Use Cases', icon: Lightbulb },
  { path: '/roi', label: 'ROI Simulator', icon: TrendingUp },
  { path: '/playbooks', label: 'Playbooks', icon: BookOpen },
]

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { assessmentResult } = useAssessment()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAssessmentComplete = assessmentResult !== null

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="gradient-bg sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">ReadyAI</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                const isLocked = !isAssessmentComplete && item.path !== '/dashboard' && item.path !== '/assessment'
                
                return (
                  <Link
                    key={item.path}
                    to={isLocked ? '#' : item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : isLocked
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {isLocked && <span className="ml-1 text-xs">🔒</span>}
                  </Link>
                )
              })}
            </nav>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-900 border-t border-white/10">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                const isLocked = !isAssessmentComplete && item.path !== '/dashboard' && item.path !== '/assessment'
                
                return (
                  <Link
                    key={item.path}
                    to={isLocked ? '#' : item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : isLocked
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                    {isLocked && <span className="ml-auto text-xs">🔒</span>}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-navy-950 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold">ReadyAI</span>
              </div>
              <p className="text-slate-400 text-sm">
                Helping Southeast Asian SMEs transform with AI — from curiosity to execution.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/assessment" className="hover:text-amber-400">Assessment</Link></li>
                <li><Link to="/use-cases" className="hover:text-amber-400">Use Cases</Link></li>
                <li><Link to="/roi" className="hover:text-amber-400">ROI Simulator</Link></li>
                <li><Link to="/playbooks" className="hover:text-amber-400">Playbooks</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400">Blog</a></li>
                <li><a href="#" className="hover:text-amber-400">Case Studies</a></li>
                <li><a href="#" className="hover:text-amber-400">Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400">About</a></li>
                <li><a href="#" className="hover:text-amber-400">Contact</a></li>
                <li><a href="#" className="hover:text-amber-400">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
            © 2024 ReadyAI. Built for Southeast Asian SMEs.
          </div>
        </div>
      </footer>
    </div>
  )
}
