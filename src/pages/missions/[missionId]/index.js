import { useRouter } from "next/router";
import curriculum from "@/data/curriculum.json";
import Link from "next/link";

export default function Mission() {
  const router = useRouter();
  const { missionId } = router.query;

  console.log(curriculum);
  const mission = curriculum.missions.find((m) => m.id === parseInt(missionId));

  if (!mission) return <div>Mission not found</div>;
  console.log(mission);
  return (
    <div>
      <h1>{mission.title}</h1>
      <ul>
        {mission.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/missions/${missionId}/${lesson.id}`}
            >
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
