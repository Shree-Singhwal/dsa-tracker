import { useState, useEffect } from "react"
import { db, auth } from "./firebase"
import { collection, getDocs, updateDoc, deleteDoc, doc, setDoc, getDoc, query, where } from "firebase/firestore"
import { onAuthStateChanged, signOut } from "firebase/auth"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import QuestionCard from "./components/QuestionCard"
import AddQuestion from "./components/AddQuestion"
import Dashboard from "./components/Dashboard"
import Heatmap from "./components/Heatmap"
import BottomNav from "./components/BottomNav"
import Login from "./components/Login"
import TeacherSetup from "./components/TeacherSetup"
import StudentJoin from "./components/StudentJoin"

function App() {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [classroomId, setClassroomId] = useState(null)
  const [classroomCode, setClassroomCode] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [activeTab, setActiveTab] = useState("All")
  const [activePlatform, setActivePlatform] = useState("All")
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u)
        const snap = await getDoc(doc(db, "users", u.uid))
        if (snap.exists()) {
          const data = snap.data()
          setUserRole(data.role)
          setClassroomId(data.classroomId || null)
          setClassroomCode(data.code || null)
        }
      } else {
        setUser(null)
        setUserRole(null)
        setClassroomId(null)
      }
      setAuthLoading(false)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!user || !classroomId) return
    const fetchQuestions = async () => {
      const q = query(collection(db, "questions"), where("classroomId", "==", classroomId))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      setQuestions(data)
      setLoading(false)
    }
    fetchQuestions()
  }, [user, classroomId])

  const updateStatus = async (id, status) => {
    const solvedAt = status === "Solved" ? new Date().toISOString() : null
    await updateDoc(doc(db, "questions", id), { status, solvedAt })
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status, solvedAt } : q))
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return
    await deleteDoc(doc(db, "questions", id))
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const handleAdd = (newQuestion) => {
    setQuestions(prev => [...prev, newQuestion])
    setShowForm(false)
  }

  const filtered = questions.filter(q => {
    const statusMatch = activeTab === "All" || q.status === activeTab
    const platformMatch = activePlatform === "All" || q.platform === activePlatform
    const searchMatch = q.title.toLowerCase().includes(search.toLowerCase())
    return statusMatch && platformMatch && searchMatch
  })

  const isTeacher = userRole === "teacher"

  if (authLoading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-green-400 text-xl">Loading...</p>
    </div>
  )

  if (!user) return <Login />

  if (isTeacher && !classroomId) return (
    <TeacherSetup user={user} onDone={(code, id) => { setClassroomCode(code); setClassroomId(id) }} />
  )

  if (!isTeacher && !classroomId) return (
    <StudentJoin user={user} onDone={(id) => setClassroomId(id)} />
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-16 md:pb-0">
      <Navbar isTeacher={isTeacher} user={user} onLogout={() => signOut(auth)} classroomCode={classroomCode} />
      <Dashboard questions={questions} />
      <div className="flex min-h-screen">
        <Sidebar active={activeTab} setActive={setActiveTab} activePlatform={activePlatform} setActivePlatform={setActivePlatform} />
        <main className="flex-1 p-4 flex flex-col gap-4 min-w-0">
          <Heatmap questions={questions} />
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <h2 className="text-lg font-bold text-gray-300">
              Questions ({filtered.length})
              {isTeacher && <span className="ml-2 text-xs bg-purple-600 px-2 py-1 rounded-lg">Teacher Mode</span>}
            </h2>
            <div className="flex gap-2 flex-wrap">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search questions..." className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500 w-56" />
              {isTeacher && (
                <button onClick={() => setShowForm(prev => !prev)} className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition">
                  {showForm ? "Cancel" : "+ Assign Question"}
                </button>
              )}
            </div>
          </div>
          {showForm && isTeacher && <AddQuestion onAdd={handleAdd} classroomId={classroomId} />}
          {loading ? (
            <p className="text-gray-400">Loading questions...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-400">No questions found.</p>
          ) : (
            filtered.map(q => (
              <QuestionCard key={q.id} question={q} onStatusChange={updateStatus} onDelete={handleDelete} isTeacher={isTeacher} />
            ))
          )}
        </main>
      </div>
      <BottomNav active={activeTab} setActive={setActiveTab} activePlatform={activePlatform} setActivePlatform={setActivePlatform} />
    </div>
  )
}

export default App