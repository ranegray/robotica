import { useSession } from "next-auth/react";
import Link from "next/link";
import OperatorStats from "@/components/ui/OperatorStats";
import useCurriculum from "../hooks/useCurriculum";
import { useGetProgress } from "@/hooks/useProgress";
import useUser from "@/hooks/useUser";

export default function Learn() {
  const { data: session, status } = useSession();
  const { user } = useUser();
  const { curriculum } = useCurriculum();
  const { progress } = useGetProgress();

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
        {curriculum && curriculum.missions && (
          <div className="rounded-lg bg-slate-900 p-10">
            <h2 className="font-extrabold uppercase text-red-500">
              Mars Learning Journey
            </h2>
            <div className="mx-4 flex justify-between rounded-full bg-cyan-800">
              {curriculum.missions.map((_, index) => (
                <div
                  key={index}
                  className="rounded-full bg-cyan-900 px-4 py-4"
                ></div>
              ))}
            </div>
            <div>
              <h3>Mars Rover Simulator Curriculum</h3>
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
        )}
        <div className="flex gap-5">
          {progress && curriculum && (
            <div className="w-1/2 rounded-lg bg-slate-900 p-4 text-teal-400">
              <h2 className="text-center font-extrabold uppercase text-red-500">
                Current Mission
              </h2>
              <h3 className="mt-2 text-lg font-bold">
                {progress.mission_id
                  ? curriculum.missions.find(
                      (m) => m.id == progress?.mission_id,
                    ).title
                  : "No mission in progress"}
              </h3>
              <div className="flex justify-between">
                <p className="mt-1">
                  {progress.exercise_id
                    ? curriculum.missions[0].lessons[0].exercises.find(
                        (e) => e.id == progress.exercise_id,
                      ).title
                    : "Get started!"}
                </p>
                <p className="mt-1">
                  Status:{" "}
                  {progress?.exercise_id ? "In progress" : "Not started"}
                </p>
              </div>
              <Link
                href={`${progress.mission_id ? `/missions/${progress.mission_id}/${progress.lesson_id}/${progress.exercise_id}` : `/missions/${curriculum.missions[0].id}/${curriculum.missions[0].lessons[0].id}/${curriculum.missions[0].lessons[0].exercises[0].id}`}`}
                className="mt-2 block w-full rounded bg-red-500 p-2 text-center text-sm font-bold uppercase text-white hover:bg-red-600"
              >
                {progress.mission_id ? "Continue Mission" : "Get Started"}
              </Link>
            </div>
          )}
          {user && (
            <div className="w-1/2 rounded-lg bg-slate-900 p-4">
              <h2 className="text-center font-extrabold uppercase text-red-500">
                Operator Stats
              </h2>
              <OperatorStats user={user} />
            </div>
          )}
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
