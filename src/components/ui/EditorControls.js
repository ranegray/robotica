import Link from "next/link";

export function EditorControls({ runCode, mission, lesson, exercise }) {
  return (
    <div className="flex justify-between bg-slate-900 p-3">
      <button
        onClick={runCode}
        className="rounded-md bg-yellow-500 p-1.5 text-black"
      >
        Run Code
      </button>
      <div className="flex items-center gap-2">
        {exercise.prev && (
          <Link
            href={`/missions/${mission.id}/${lesson.id}/${exercise.prev}`}
            className="rounded-md bg-yellow-500 p-1.5 text-black"
          >
            Back
          </Link>
        )}
        {exercise.next && (
          <Link
            href={`/missions/${mission.id}/${lesson.id}/${exercise.next}`}
            className="rounded-md bg-yellow-500 p-1.5 text-black"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
