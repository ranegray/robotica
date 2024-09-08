import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import OperatorStats from "@/components/ui/OperatorStats";

export default function Learn() {
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();

  async function fetchData() {
    const response = await fetch("/api/user-profile");
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center">
        <Link
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          href="/login"
        >
          Log in
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen bg-slate-800 text-white">
        <div className="m-auto flex max-w-screen-lg flex-col gap-5">
          <div>
            <h1 className="text-3xl font-extrabold uppercase text-red-500">
              Operator Dashboard
            </h1>
          </div>
          <div className="rounded-lg bg-slate-900 p-10">
            <h2 className="font-extrabold uppercase">mars learning journey</h2>

            <div className="mx-4 flex justify-between rounded-full bg-cyan-800">
              {[1, 2, 3, 4, 5].map((mission, index) => (
                <div
                  key={mission}
                  className={`rounded-full px-4 py-4 ${
                    index === 1
                      ? "bg-red-600"
                      : index < 1
                        ? "bg-green-600"
                        : "bg-black"
                  }`}
                ></div>
              ))}
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-sm font-bold uppercase text-gray-400">
                Mission 0
              </p>
              <p className="text-sm font-bold uppercase text-gray-400">
                Mission 1
              </p>
              <p className="text-sm font-bold uppercase text-gray-400">
                Mission 2
              </p>
              <p className="text-sm font-bold uppercase text-gray-400">
                Mission 3
              </p>
              <p className="text-sm font-bold uppercase text-gray-400">
                Mission 4
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-1/2 rounded-lg bg-slate-900 p-4">
                <h2 className="text-center font-extrabold uppercase text-red-500">
                  current mission
                </h2>
                <h3 className="mt-2 text-lg font-bold">
                  Mission 1: First Steps on Mars
                </h3>
                <p className="mt-1 text-sm">
                  Move the rover in a simple pattern (square or figure-eight)
                </p>
                <div className="mt-2 h-4 w-full rounded-full bg-gray-700">
                  <div className="h-full w-1/3 rounded-full bg-green-500"></div>
                </div>
                <p className="mt-1 text-right text-sm">Progress: 33%</p>
              </div>
              <div className="w-1/2 rounded-lg bg-slate-900 p-4">
                <h2 className="text-center font-extrabold uppercase text-red-500">
                  Operator Stats
                </h2>
                <OperatorStats user={user} />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2 rounded-lg bg-slate-900 p-4">
                <h2 className="text-center font-extrabold uppercase text-red-500">
                  available missions
                </h2>
                {[
                  "MAIN: Escape Mars",
                  "SIDE: Analyze Martian soil samples",
                  "SIDE: Program Rover to collect valuable resources",
                ].map((mission, index) => (
                  <button
                    key={index}
                    className="mt-2 w-full rounded bg-cyan-800 p-2 text-left hover:bg-cyan-700"
                  >
                    {mission}
                  </button>
                ))}
              </div>
              <div className="w-1/2 rounded-lg bg-slate-900 p-4">
                <h2 className="text-center font-extrabold uppercase text-red-500">
                  badges earned
                </h2>
                <div className="mt-4 flex justify-center space-x-4">
                  {["🚀", "🔬", "🤖", "🔋"].map((badge, index) => (
                    <div
                      key={index}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-2xl"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-slate-900 p-4">
            <h2 className="text-center font-extrabold uppercase text-red-500">
              objectives
            </h2>
            <div className="flex gap-5">
              {[
                {
                  progress: "X",
                  text: "Complete 5 side missions",
                  completed: true,
                },
                { progress: "1", text: "Reach level 5", completed: false },
                {
                  progress: "32",
                  text: "Collect 50 rock samples",
                  completed: false,
                },
              ].map((objective, index) => (
                <div
                  key={index}
                  className={`flex w-1/3 bg-cyan-800 p-4 ${objective.completed ? "opacity-50" : ""}`}
                >
                  <div className="bg-slate-800 px-2">{objective.progress}</div>
                  <p className={objective.completed ? "line-through" : ""}>
                    {objective.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
