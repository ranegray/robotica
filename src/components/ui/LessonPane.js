export default function LessonPane({ lesson }) {
  return (
    <div className="w-full bg-white text-black">
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
    </div>
  );
}
