import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

function Dashboard({ questions }) {
  const solved = questions.filter(q => q.status === "Solved").length
  const attempted = questions.filter(q => q.status === "Attempted").length
  const todo = questions.filter(q => q.status === "Todo").length

  const barData = [
    { name: "Todo", count: todo },
    { name: "Attempted", count: attempted },
    { name: "Solved", count: solved },
  ]

  const pieData = [
    { name: "Todo", value: todo },
    { name: "Attempted", value: attempted },
    { name: "Solved", value: solved },
  ].filter(d => d.value > 0)

  const COLORS = ["#6b7280", "#f59e0b", "#22c55e"]

  let streak = 0
  const sortedDates = [...new Set(questions.filter(q => q.solvedAt).map(q => q.solvedAt.split("T")[0]))].sort().reverse()
  for (let i = 0; i < sortedDates.length; i++) {
    const expected = new Date()
    expected.setDate(expected.getDate() - i)
    if (sortedDates[i] === expected.toISOString().split("T")[0]) streak++
    else break
  }

  return (
    <div className="bg-gray-900 border-b border-gray-700 px-4 py-4 flex flex-col gap-4">
      <div className="flex gap-3 flex-wrap">
        <div className="bg-gray-800 rounded-xl px-4 py-3 text-center flex-1">
          <p className="text-2xl font-bold text-green-400">{solved}</p>
          <p className="text-xs text-gray-400">Solved</p>
        </div>
        <div className="bg-gray-800 rounded-xl px-4 py-3 text-center flex-1">
          <p className="text-2xl font-bold text-yellow-400">{attempted}</p>
          <p className="text-xs text-gray-400">Attempted</p>
        </div>
        <div className="bg-gray-800 rounded-xl px-4 py-3 text-center flex-1">
          <p className="text-2xl font-bold text-gray-400">{todo}</p>
          <p className="text-xs text-gray-400">Todo</p>
        </div>
        <div className="bg-gray-800 rounded-xl px-4 py-3 text-center flex-1">
          <p className="text-2xl font-bold text-orange-400">🔥 {streak}</p>
          <p className="text-xs text-gray-400">Streak</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <p className="text-xs text-gray-400 mb-1">Bar Chart</p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-48">
          <p className="text-xs text-gray-400 mb-1">Pie Chart</p>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[["Todo","Attempted","Solved"].indexOf(entry.name)]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }} />
             <Legend iconSize={8} wrapperStyle={{ fontSize: "10px", marginTop: "10px" }} verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard