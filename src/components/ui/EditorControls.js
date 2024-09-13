import Link from "next/link";
import { useState } from "react";

export function EditorControls({
  runCode,
  mission,
  lesson,
  exercise,
  completed,
  setCompleted,
  isRunning,
}) {
  const [stepIndex, setStepIndex] = useState(
    lesson.exercises.findIndex((e) => e.id === exercise.id) + 1,
  );
  return (
    <div className="flex justify-between bg-slate-900 p-3">
      <button
        onClick={runCode}
        disabled={isRunning}
        className="rounded-md bg-yellow-500 p-1.5 text-black disabled:pointer-events-none disabled:opacity-50"
      >
        {!isRunning ? "Run Code" : "Running..."}
      </button>
      <p>
        {stepIndex} / {lesson.exercises.length}
      </p>
      <div className="flex items-center gap-2">
        {exercise.previousExerciseId && (
          <Link
            onClick={() => setStepIndex(stepIndex - 1)}
            href={`/missions/${mission.id}/${lesson.id}/${exercise.previousExerciseId}`}
            className="rounded-md bg-yellow-500 p-1.5 text-black"
          >
            Back
          </Link>
        )}
        {exercise.nextExerciseId ? (
          <Link
            onClick={(e) => {
              if (!completed) {
                e.preventDefault();
              } else {
                setStepIndex(stepIndex + 1);
                setCompleted(false);
              }
            }}
            href={`/missions/${mission.id}/${lesson.id}/${exercise.nextExerciseId}`}
            className={`rounded-md bg-yellow-500 p-1.5 text-black ${!completed && "pointer-events-none opacity-50"}`}
          >
            Next
          </Link>
        ) : (
          <Link
            href={`/missions/${mission.nextMissionId ? mission.nextMissionId : mission.id}`}
            className="rounded-md bg-yellow-500 p-1.5 text-black"
          >
            Finish
          </Link>
        )}
      </div>
    </div>
  );
}
