import { useState } from "react"
import { db } from "../firebase"
import { doc, setDoc } from "firebase/firestore"

function TeacherSetup({ user, onDone }) {
  const [className, setClassName] = useState("")
  const [loading, setLoading] = useState(false)

  const generateCode = () => {
    return "TCH-" + Math.random().toString(36).substring(2, 6).toUpperCase()
  }

  const handleCreate = async () => {
    if (!className.trim()) return alert("Please enter a class name!")
    setLoading(true)
    const code = generateCode()
    const classroomId = user.uid
    await setDoc(doc(db, "classrooms", classroomId), {
      teacherId: user.uid,
      teacherName: user.displayName,
      teacherPhoto: user.photoURL,
      className,
      code,
      createdAt: new Date().toISOString()
    })
    await setDoc(doc(db, "users", user.uid), { classroomId, code }, { merge: true })
    onDone(code, classroomId)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-purple-400">Setup Your Classroom 👨‍🏫</h1>
        <p className="text-gray-400 text-sm text-center">Create your class — students will join using your unique code</p>
        <input
          value={className}
          onChange={e => setClassName(e.target.value)}
          placeholder="Class name (e.g. DSA Batch 2025)"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-purple-500"
        />
        <button onClick={handleCreate} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition">
          {loading ? "Creating..." : "Create Classroom"}
        </button>
      </div>
    </div>
  )
}

export default TeacherSetup