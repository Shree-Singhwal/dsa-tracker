import { useState } from "react"
import { auth, googleProvider, db } from "../firebase"
import { signInWithPopup } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

function Login() {
  const [role, setRole] = useState(null)

  const handleLogin = async (selectedRole) => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: selectedRole,
          createdAt: new Date().toISOString()
        })
      }
    } catch (e) {
      alert("Login failed: " + e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-green-400">DSA Tracker 🚀</h1>
        <p className="text-gray-400 text-sm text-center">Track your DSA journey</p>

        {!role ? (
          <>
            <p className="text-gray-300 text-sm font-medium">I am a...</p>
            <div className="flex gap-4 w-full">
              <button onClick={() => setRole("student")} className="flex-1 bg-gray-800 hover:bg-green-600 border border-gray-600 hover:border-green-500 text-white py-4 rounded-xl transition flex flex-col items-center gap-2">
                <span className="text-2xl">🎓</span>
                <span className="text-sm font-medium">Student</span>
              </button>
              <button onClick={() => setRole("teacher")} className="flex-1 bg-gray-800 hover:bg-purple-600 border border-gray-600 hover:border-purple-500 text-white py-4 rounded-xl transition flex flex-col items-center gap-2">
                <span className="text-2xl">👨‍🏫</span>
                <span className="text-sm font-medium">Teacher</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{role === "student" ? "🎓 Student" : "👨‍🏫 Teacher"}</span>
              <button onClick={() => setRole(null)} className="text-xs text-gray-500 hover:text-gray-300 underline">Change</button>
            </div>
            <button onClick={() => handleLogin(role)} className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
              Continue with Google
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Login