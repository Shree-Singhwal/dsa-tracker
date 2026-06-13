import { useState } from "react"

function BottomNav({ active, setActive, activePlatform, setActivePlatform }) {
  const [showDrawer, setShowDrawer] = useState(false)
  const tabs = ["All", "Todo", "Attempted", "Solved"]
  const platforms = ["All", "LeetCode", "Codeforces", "CodeChef", "GFG"]

  return (
    <>
      {showDrawer && (
        <div className="fixed inset-0 z-40 flex items-end md:hidden">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowDrawer(false)} />
          <div className="relative w-full bg-gray-900 border-t border-gray-700 rounded-t-2xl p-6 z-50 pb-24">
            <h3 className="text-sm font-bold text-gray-300 mb-4">Filter by Platform</h3>
            <div className="flex flex-wrap gap-4">
              {platforms.map(p => (
                <button key={p} onClick={() => { setActivePlatform(p); setShowDrawer(false) }} className={`px-5 py-3 rounded-lg text-sm ${activePlatform === p ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex md:hidden z-50">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActive(tab)} className={`flex-1 py-3 text-xs font-medium ${active === tab ? "text-green-400 border-t-2 border-green-400" : "text-gray-400"}`}>
            {tab}
          </button>
        ))}
        <button onClick={() => setShowDrawer(p => !p)} className={`px-3 py-3 text-xs font-medium ${activePlatform !== "All" ? "text-blue-400 border-t-2 border-blue-400" : "text-gray-400"}`}>
          ⚙️
        </button>
      </div>
    </>
  )
}

export default BottomNav