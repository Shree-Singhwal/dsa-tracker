function Sidebar({ active, setActive, activePlatform, setActivePlatform }) {
  const tabs = ["All", "Todo", "Attempted", "Solved"]
  const platforms = ["All", "LeetCode", "Codeforces", "CodeChef", "GFG"]

  return (
    <aside className="hidden md:flex w-44 bg-gray-900 border-r border-gray-700 p-4 flex-col gap-6 min-h-screen shrink-0">
      <div>
        <p className="text-xs text-gray-400 uppercase mb-2">Status</p>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActive(tab)} className={`block w-full text-left px-3 py-2 rounded-lg mb-1 text-sm ${active === tab ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}>
            {tab}
          </button>
        ))}
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase mb-2">Platform</p>
        {platforms.map(p => (
          <button key={p} onClick={() => setActivePlatform(p)} className={`block w-full text-left px-3 py-2 rounded-lg mb-1 text-sm ${activePlatform === p ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}>
            {p}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar