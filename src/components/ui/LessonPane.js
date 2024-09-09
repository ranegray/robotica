export default function LessonPane({ lesson }) {
  return (
    <div className="w-1/3 bg-white text-black">
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
    </div>
  );
}
