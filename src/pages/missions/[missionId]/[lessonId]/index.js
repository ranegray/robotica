import { useRouter } from "next/router";
import Link from "next/link";
import curriculum from "@/data/curriculum.json";

export default function Lesson() {
  const router = useRouter();
  const { missionId, lessonId, stepId } = router.query;

  const mission = curriculum.missions.find((m) => m.id === parseInt(missionId));
  const lesson = mission?.lessons.find((l) => l.id === lessonId);
  const step = lesson?.steps.find((s) => s.id === stepId);

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div>
      <h1>{mission.title}</h1>
      <h2>{lesson.title}</h2>
      {lesson.steps.map((step) => (
        <li key={step.id}>
          <Link href={`/missions/${missionId}/${lesson.id}/${step.id}`}>
            {step.title}
          </Link>
        </li>
      ))}
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </div>
  );
}
