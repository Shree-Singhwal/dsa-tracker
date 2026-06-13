function Navbar({ isTeacher, user, onLogout, classroomCode }) {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold text-green-400">DSA Tracker 🚀</h1>
      <div className="flex gap-2 items-center">
        {isTeacher && classroomCode && (
          <div className="hidden md:flex items-center gap-2 bg-gray-800 border border-purple-700 rounded-lg px-3 py-1">
            <span className="text-xs text-gray-400">Class Code:</span>
            <span className="text-sm font-bold text-purple-400 tracking-widest">{classroomCode}</span>
          </div>
        )}
        {user && (
          <div className="flex items-center gap-2 ml-2">
            <img src={user.photoURL} className="w-8 h-8 rounded-full border border-gray-600" />
            <span className="text-xs text-gray-400 hidden md:block">{user.displayName?.split(" ")[0]}</span>
            <button onClick={onLogout} className="text-xs text-gray-400 hover:text-red-400 transition">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar