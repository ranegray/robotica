export default function LessonPane({ exercise }) {
  return (
    <div className="w-full bg-white text-black">
      <div className="bg-slate-800 font-bold uppercase text-slate-500">
        Exercise
      </div>
      <h2 className="text-xl uppercase font-bold">{exercise.title}</h2>
      <p><span className="font-bold uppercase">Objective:</span> {exercise.exerciseDescription}</p>
      <p><span className="font-bold uppercase">Concepts:</span> {exercise.concept}</p>
      <div className="mt-5">
        <h3 className="text-lg uppercase font-bold">Instructions</h3>
        <ol className="list-inside list-decimal">
          {exercise.stepByStep.map((step, index) => (
            <li key={index}>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <details className="mt-5">
        <summary className="font-bold uppercase">Hints</summary>
        <ul>
          {exercise.hints.map((hint, index) => (
            <li key={index}>
              {hint}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
