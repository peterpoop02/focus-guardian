"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type SensorData = {
  motion: number;
  light: number;
  focus_status: string;
  score: number;
};

type ChartData = {
  time: string;
  score: number;
};

type Todo = {
  id: number;
  text: string;
};

export default function Home() {
  const [data, setData] = useState<SensorData | null>(null);
  const [focusTime, setFocusTime] = useState(0);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isTracking, setIsTracking] = useState(true);

  const [message, setMessage] = useState("");

  const [modeType, setModeType] = useState<"custom" | "pomodoro">("custom");

  const [duration, setDuration] = useState(25);
  const [goalDuration, setGoalDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [goalTotal, setGoalTotal] = useState(120); // total goal
const [goalRemaining, setGoalRemaining] = useState(120); // decreases
  

  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [showBreakChoice, setShowBreakChoice] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sensor`);
      const json = await res.json();

      setData(json);

      if (json.focus_status === "Focused") {
        setFocusTime((prev) => prev + 2);
      }

      if (json.score < 40) setMessage("Take a short break");
      else if (json.score < 70) setMessage("Stay focused");
      else setMessage("Great focus!");

      setChartData((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          score: json.score,
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isTracking]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
  setTimeLeft((prev) => {
    if (prev <= 1) {
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );
      audio.play();

      if (modeType === "pomodoro") {
        setPomodoroCount((c) => c + 1);
        setShowBreakChoice(true);
      }

      setRunning(false);
      return 0;
    }

    // 🔥 SUBTRACT FROM GOAL ONLY IN CUSTOM MODE
    if (modeType === "custom") {
      setGoalRemaining((g) => Math.max(g - 1 / 60, 0));
    }
setGoalRemaining((g) => Math.max(g - 1 / 60, 0));
    return prev - 1;
  });
}, 1000);

    return () => clearInterval(interval);
  }, [running, modeType]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const startSession = (mins: number) => {
  setTimeLeft(mins * 60);
  setRunning(true);
  setShowBreakChoice(false);
};

  const resetTimer = () => {
  setRunning(false);

  const mins = modeType === "custom" ? duration : 25;

  setGoalDuration(mins);
  setTimeLeft(mins * 60);
 };
  
  const goalProgress =
  goalTotal > 0
    ? ((goalTotal - goalRemaining) / goalTotal) * 100
    : 0;

  const getLineColor = () => {
    if (!data) return "#451b1b";
    if (data.score < 40) return "#ef4444";
    if (data.score < 70) return "#f59e0b";
    return "#10b981";
  };

  // TODO
  const addTodo = () => {
    if (!todoInput.trim()) return;
    setTodos([...todos, { id: Date.now(), text: todoInput }]);
    setTodoInput("");
  };

  const deleteTodo = (id: number) => {
    const task = todos.find((t) => t.id === id);
    if (!task) return;

    setCompleted([...completed, task]);
    setTodos(todos.filter((t) => t.id !== id));
  };

  // 🆕 DELETE ALL
  const clearTodos = () => setTodos([]);
  const clearCompleted = () => setCompleted([]);

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">

      <h1 className="text-3xl font-bold text-center mb-6">
        FOCUS GUARDIAN
      </h1>
      <div className="text-center mb-6 text-sm text-gray-600 space-y-1">
  <p>Use 25-minute focus blocks + 5-minute breaks</p>
  <p>Progress matters more than perfect work!</p>
  <p>Remember to remove anything that will distract you!</p>
</div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsTracking(!isTracking)}
          className="px-5 py-2 bg-blue-500 text-white rounded-xl shadow-md"
        >
          {isTracking ? "Pause Tracking" : "Start Tracking"}
        </button>
      </div>

      <div className="flex justify-center gap-6 mb-6 flex-wrap">

  {/* 🍅 POMODORO COUNTER */}
  <div className="bg-white p-4 rounded-2xl shadow-md w-72 text-center">
    <p className="font-semibold text-lg">🍅 Pomodoro Sessions</p>
    <p className="text-3xl font-bold text-orange-500 mt-2">
      {pomodoroCount}
    </p>
  </div>

   {/* 🎯 DAILY GOAL */}
  <div className="bg-white p-4 rounded-2xl shadow-md w-72 text-center">
    <p className="font-semibold text-lg">🎯 Daily Goal</p>

    <input
      type="number"
      value={goalTotal}
      onChange={(e) => {
        const val = Number(e.target.value);
        setGoalTotal(val);
        setGoalRemaining(val);
      }}
      className="mt-2 border rounded-xl px-3 py-1 w-24 text-center"
    />

    <p className="text-sm mt-2 text-gray-600">
  {goalRemaining.toFixed(1)} min remaining
</p>

<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
  <div
    className="bg-blue-500 h-2 rounded-full"
    style={{ width: `${goalProgress}%` }}
  />
</div>

<p className="text-xs mt-1 text-gray-500">
  {goalProgress.toFixed(0)}% completed
</p>
  </div>

</div>

      <div className="flex justify-center gap-6 flex-wrap">

        {/* LEFT */}
        <div className="flex flex-col gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
            <p className="font-semibold mb-2">Status</p>
            <p className="text-xl text-green-500 font-bold">
              {data?.focus_status || "Loading"}
            </p>
            <p className="mt-3 text-sm">{message}</p>
            <p className="mt-2 text-sm">
              Focus Time: {focusTime}s
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">

  {/* MODE SWITCH */}
  <div className="flex justify-center gap-2 mb-3">
    <button
      onClick={() => setModeType("custom")}
      className={`px-3 py-1 rounded-xl ${
        modeType === "custom"
          ? "bg-blue-500 text-white"
          : "bg-gray-200"
      }`}
    >
      Custom
    </button>

    <button
      onClick={() => setModeType("pomodoro")}
      className={`px-3 py-1 rounded-xl ${
        modeType === "pomodoro"
          ? "bg-blue-500 text-white"
          : "bg-gray-200"
      }`}
    >
      Pomodoro
    </button>
  </div>

  {/* CUSTOM INPUT */}
{modeType === "custom" && !running && (
  <input
    type="number"
    value={duration}
    onChange={(e) => setDuration(Number(e.target.value))}
    className="border rounded-xl px-2 py-1 w-20 text-center mb-3"
  />
)}

  {/* TIMER */}
  <p className="text-3xl font-bold mb-3">
    {formatTime(timeLeft)}
  </p>

  {/* BUTTONS */}
  <div className="flex justify-center gap-2">
    <button
      onClick={() =>
  startSession(modeType === "custom" ? duration : 25)
}
      className="px-4 py-2 bg-green-500 text-white rounded-xl shadow-md"
    >
      Start
    </button>

    <button
      onClick={() => setRunning(false)}
      className="px-4 py-2 bg-red-500 text-white rounded-xl shadow-md"
    >
      Pause
    </button>

    <button
      onClick={resetTimer}
      className="px-4 py-2 bg-gray-500 text-white rounded-xl shadow-md"
    >
      Reset
    </button>
  </div>
</div>
        </div>

        {/* GRAPH */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <LineChart width={400} height={250} data={chartData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <CartesianGrid />
            <Line
              type="monotone"
              dataKey="score"
              stroke={getLineColor()}
              strokeWidth={3}
            />
          </LineChart>
        </div>

        {/* TODO + COMPLETED */}
        <div className="flex flex-col gap-4 w-80">

          {/* TODO */}
          <div className="bg-white p-6 rounded-2xl shadow-md">

            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold">📝 Todo List</h2>

              <button
                onClick={clearTodos}
                className="text-red-500 text-sm"
              >
                Delete All
              </button>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                className="border rounded-xl px-2 py-1 flex-1"
                placeholder="Add task..."
              />
              <button
                onClick={addTodo}
                className="bg-blue-500 text-white px-3 rounded-xl"
              >
                Add
              </button>
            </div>

            {todos.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center border-b py-1"
              >
                <span className="flex-1">{t.text}</span>

                <button
                  onClick={() => deleteTodo(t.id)}
                  className="text-red-500 font-bold px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* COMPLETED */}
          <div className="bg-white p-6 rounded-2xl shadow-md">

            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold">✅ Completed Tasks</h2>

              <button
                onClick={clearCompleted}
                className="text-red-500 text-sm"
              >
                Delete All
              </button>
            </div>

            {completed.length === 0 && (
              <p className="text-sm text-gray-400">
                No completed tasks yet
              </p>
            )}

            {completed.map((t) => (
              <div
                key={t.id}
                className="flex justify-between border-b py-1 text-gray-400 opacity-70"
              >
                <span>{t.text}</span>

                <button
                  onClick={() =>
                    setCompleted(
                      completed.filter((c) => c.id !== t.id)
                    )
                  }
                  className="text-red-400 font-bold px-2"
                >
                  ✕
                </button>
              </div>
            ))}

          </div>

        </div>
      </div>
    </main>
  );
}