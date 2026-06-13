import { useState } from "react"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

function AddQuestion({ onAdd, classroomId }) {
  const [form, setForm] = useState({ title: "", platform: "LeetCode", difficulty: "Easy", link: "", status: "Todo" })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)

  const difficulties = {
    LeetCode: ["Easy", "Medium", "Hard"],
    Codeforces: ["800", "1000", "1200", "1400", "1600", "1800", "2000"],
    CodeChef: ["Easy", "Medium", "Hard"],
    GFG: ["School", "Basic", "Easy", "Medium", "Hard"]
  }

  const fetchLeetCode = async (link) => {
    const match = link.match(/leetcode\.com\/problems\/([\w-]+)/)
    if (!match) return
    const slug = match[1]
    setFetching(true)
    try {
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Referer": "https://leetcode.com" },
        body: JSON.stringify({
          query: `{ question(titleSlug: "${slug}") { title difficulty } }`
        })
      })
      const data = await res.json()
      const q = data?.data?.question
      if (q) {
        setForm(prev => ({ ...prev, title: q.title, difficulty: q.difficulty }))
      } else {
        const titleFromSlug = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        setForm(prev => ({ ...prev, title: titleFromSlug }))
      }
    } catch (e) {
      const titleFromSlug = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      setForm(prev => ({ ...prev, title: titleFromSlug }))
    }
    setFetching(false)
  }

  const fetchCodeforces = async (link) => {
    const match = link.match(/codeforces\.com\/problemset\/problem\/(\d+)\/(\w+)/)
    const match2 = link.match(/codeforces\.com\/contest\/(\d+)\/problem\/(\w+)/)
    const m = match || match2
    if (!m) return
    setFetching(true)
    try {
      const res = await fetch(`https://codeforces.com/api/problemset.problems`)
      const data = await res.json()
      const problem = data.result.problems.find(p => String(p.contestId) === m[1] && p.index === m[2])
      if (problem) {
        setForm(prev => ({ ...prev, title: problem.name, difficulty: String(problem.rating || "Unrated") }))
      }
    } catch (e) {}
    setFetching(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "platform") {
      setForm(prev => ({ ...prev, platform: value, difficulty: difficulties[value][0] }))
    } else if (name === "link") {
      setForm(prev => ({ ...prev, link: value }))
      if (value.includes("leetcode.com")) {
        setForm(prev => ({ ...prev, link: value, platform: "LeetCode" }))
        fetchLeetCode(value)
      } else if (value.includes("codeforces.com")) {
        setForm(prev => ({ ...prev, link: value, platform: "Codeforces" }))
        fetchCodeforces(value)
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.link) return alert("Title and Link are required!")
    setLoading(true)
    const docRef = await addDoc(collection(db, "questions"), { ...form, classroomId })
    onAdd({ id: docRef.id, ...form, classroomId })
    setForm({ title: "", platform: "LeetCode", difficulty: "Easy", link: "", status: "Todo" })
    setLoading(false)
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-3">
      <h2 className="text-green-400 font-bold text-lg">+ Add Question</h2>
      <input name="link" autoComplete="off" value={form.link} onChange={handleChange} placeholder="Paste question link here..." className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500" />
      {fetching && <p className="text-xs text-yellow-400">🔍 Fetching question details...</p>}
      <input name="title" autoComplete="off" value={form.title} onChange={handleChange} placeholder="Question Title" className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500" />
      <div className="flex gap-3">
        <select name="platform" value={form.platform} onChange={handleChange} className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500 flex-1">
          {["LeetCode", "Codeforces", "CodeChef", "GFG"].map(p => <option key={p}>{p}</option>)}
        </select>
        <select name="difficulty" value={form.difficulty} onChange={handleChange} className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500 flex-1">
          {difficulties[form.platform].map(d => <option key={d}>{d}</option>)}
        </select>
      </div>
      <button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold py-2 rounded-lg transition">
        {loading ? "Adding..." : "Add Question"}
      </button>
    </div>
  )
}

export default AddQuestion