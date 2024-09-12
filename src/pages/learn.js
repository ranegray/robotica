import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import curriculum from "../data/curriculum.json";
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
      <div className="m-4 flex flex-col items-center justify-center">
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
    <div className="h-full overflow-auto">
      <div className="m-auto flex max-w-screen-lg flex-col gap-5">
        <div>
          <h1 className="text-3xl font-extrabold uppercase text-red-500">
            Operator Dashboard
          </h1>
        </div>
        <div className="rounded-lg bg-slate-900 p-10">
          <h2 className="font-extrabold uppercase text-red-500">
            mars learning journey
          </h2>

          <div className="mx-4 flex justify-between rounded-full bg-cyan-800">
            {[0, 1, 2, 3, 4].map((mission, index) => (
              <div
                key={mission}
                className={`rounded-full bg-cyan-900 px-4 py-4`}
              ></div>
            ))}
          </div>
          <div>
            <h1>Mars Rover Simulator Curriculum</h1>
            <ul>
              {curriculum.missions.map((mission) => (
                <li key={mission.id}>
                  <Link
                    href={`/missions/${mission.id}`}
                    className="text-blue-500 underline hover:text-blue-400"
                  >
                    {mission.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="w-1/2 rounded-lg bg-slate-900 p-4 text-teal-400">
              <h2 className="text-center font-extrabold uppercase text-red-500">
                current mission
              </h2>
              <h3 className="mt-2 text-lg font-bold">
                Mission 0: Getting Started
              </h3>
              <div className="flex justify-between">
                <p className="text-md mt-1">
                  Lesson 1: Introduction to Mars Exploration
                </p>
                <p className="text-md mt-1">Status: Not started</p>
              </div>
              <button className="mt-2 w-full rounded bg-red-500 p-2 text-sm font-bold uppercase text-white hover:bg-red-600">
                Launch Mission
              </button>
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
  );
}
