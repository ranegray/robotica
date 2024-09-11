export default function LessonPane({ lesson }) {
  return (
    <div className="w-full bg-white text-black">
      <div className="uppercase font-bold text-slate-500 bg-slate-800">Exercise</div>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
    </div>
  );
}
