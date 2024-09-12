import Link from "next/link";
import { useState } from "react";

export function EditorControls({ runCode, mission, lesson, exercise }) {
  const [stepIndex, setStepIndex] = useState(1);
  return (
    <div className="flex justify-between bg-slate-900 p-3">
      <button
        onClick={runCode}
        className="rounded-md bg-yellow-500 p-1.5 text-black"
      >
        Run Code
      </button>
      <p>{stepIndex} / {lesson.exercises.length}</p>
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
            onClick={() => setStepIndex(stepIndex + 1)}
            href={`/missions/${mission.id}/${lesson.id}/${exercise.nextExerciseId}`}
            className="rounded-md bg-yellow-500 p-1.5 text-black"
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
