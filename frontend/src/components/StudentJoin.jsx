import { useState } from "react"
import { db } from "../firebase"
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore"

function StudentJoin({ user, onDone }) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleJoin = async () => {
    if (!code.trim()) return setError("Please enter a classroom code!")
    setLoading(true)
    setError("")
    try {
      const q = query(collection(db, "classrooms"), where("code", "==", code.toUpperCase()))
      const snapshot = await getDocs(q)
      if (snapshot.empty) {
        setError("Invalid code! Please check with your teacher.")
        setLoading(false)
        return
      }
      const classroom = snapshot.docs[0]
      const classroomId = classroom.id
      await setDoc(doc(db, "users", user.uid), { classroomId, joinedCode: code.toUpperCase() }, { merge: true })
      onDone(classroomId)
    } catch (e) {
      setError("Something went wrong. Try again!")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-green-400">Join Your Class 🎓</h1>
        <p className="text-gray-400 text-sm text-center">Enter the code your teacher gave you</p>
        <input
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="e.g. TCH-AB12"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-green-500 uppercase tracking-widest"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button onClick={handleJoin} disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition">
          {loading ? "Joining..." : "Join Classroom"}
        </button>
      </div>
    </div>
  )
}

export default StudentJoin