import { useRouter } from "next/router";
import Link from "next/link";
import curriculum from "@/data/curriculum.json";

export default function Lesson() {
  const router = useRouter();
  const { missionId, lessonId, exerciseId } = router.query;

  const mission = curriculum.missions.find((m) => m.id === missionId);
  const lesson = mission?.lessons.find((l) => l.id === lessonId);
  const exercise = lesson?.exercises.find((s) => s.id === exerciseId);

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div>
      <h1>{mission.title}</h1>
      <h2>{lesson.title}</h2>
      {lesson.exercises.map((exercise) => (
        <li key={exercise.id}>
          <Link href={`/missions/${missionId}/${lesson.id}/${exercise.id}`}>
            {exercise.title}
          </Link>
        </li>
      ))}
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </div>
  );
}
