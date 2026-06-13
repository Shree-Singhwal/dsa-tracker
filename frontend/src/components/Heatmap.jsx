function Heatmap({ questions }) {
  const today = new Date()
  const days = []

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push(d.toISOString().split("T")[0])
  }

  const solvedDates = {}
  questions.forEach(q => {
    if (q.status === "Solved" && q.solvedAt) {
      const date = q.solvedAt.split("T")[0]
      solvedDates[date] = (solvedDates[date] || 0) + 1
    }
  })

  const getColor = (count) => {
    if (!count) return "bg-gray-800"
    if (count === 1) return "bg-green-900"
    if (count === 2) return "bg-green-700"
    if (count === 3) return "bg-green-500"
    return "bg-green-400"
  }

  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto">
      <h3 className="text-sm font-bold text-gray-300 mb-3">📅 Activity Heatmap</h3>
      <div className="flex gap-1 min-w-0">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div key={di} title={`${day}: ${solvedDates[day] || 0} solved`} className={`w-3 h-3 rounded-sm ${getColor(solvedDates[day])}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-1 mt-2 items-center">
        <span className="text-xs text-gray-500">Less</span>
        {["bg-gray-800", "bg-green-900", "bg-green-700", "bg-green-500", "bg-green-400"].map((c, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span className="text-xs text-gray-500">More</span>
      </div>
    </div>
  )
}

export default Heatmap