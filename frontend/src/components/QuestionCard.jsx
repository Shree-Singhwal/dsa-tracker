import { useState } from "react"
import { db } from "../firebase"
import { updateDoc, doc } from "firebase/firestore"

function QuestionCard({ question, onStatusChange, onDelete, isTeacher }) {
  const [note, setNote] = useState(question.note || "")
  const [showNote, setShowNote] = useState(false)

  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400",
  }

  const saveNote = async () => {
    await updateDoc(doc(db, "questions", question.id), { note })
    setShowNote(false)
  }

  return (
    <div className={`bg-gray-800 border rounded-xl p-4 flex flex-col gap-2 transition ${isTeacher ? "border-purple-700 hover:border-purple-500" : "border-gray-700 hover:border-green-500"}`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <a href={question.link} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-green-400 transition">
            {question.title}
          </a>
          <div className="flex gap-2 mt-1 text-xs">
            <span className="text-gray-400">{question.platform}</span>
            <span className={difficultyColor[question.difficulty] || "text-blue-400"}>
              {question.difficulty}
            </span>
            {isTeacher && <span className="text-purple-400">● Assigned</span>}
          </div>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {["Todo", "Attempted", "Solved"].map(status => (
            <button key={status} onClick={() => onStatusChange(question.id, status)} className={`text-xs px-2 py-1 rounded-lg border ${question.status === status ? "bg-green-600 border-green-500 text-white" : "border-gray-600 text-gray-400 hover:bg-gray-700"}`}>
              {status}
            </button>
          ))}
          <button onClick={() => setShowNote(p => !p)} className="text-xs px-2 py-1 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700">
            📝
          </button>
          {isTeacher && (
            <button onClick={() => onDelete(question.id)} className="text-xs px-2 py-1 rounded-lg border border-red-700 text-red-400 hover:bg-red-900">
              Delete
            </button>
          )}
        </div>
      </div>
      {showNote && (
        <div className="flex gap-2 mt-1">
          <input value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note..." className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm outline-none focus:border-green-500" />
          <button onClick={saveNote} className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded-lg">Save</button>
        </div>
      )}
      {question.note && !showNote && (
        <p className="text-xs text-gray-400 mt-1">📝 {question.note}</p>
      )}
    </div>
  )
}

export default QuestionCard