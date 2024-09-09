import { useRouter } from "next/router";
import curriculum from "@/data/curriculum.json";
import LessonPane from "@/components/ui/LessonPane";
import IDE from "@/components/ui/IDE";
import RoverCam from "@/components/ui/RoverCam";

export default function Step() {
  const router = useRouter();
  const { missionId, lessonId, stepId } = router.query;

  const mission = curriculum.missions.find((m) => m.id === parseInt(missionId));
  const lesson = mission?.lessons.find((l) => l.id === lessonId);
  const step = lesson?.steps.find((s) => s.id === stepId);

  if (!step) return <div>Step not found</div>;

  return (
    <div className="flex h-full">
      <LessonPane lesson={step} />
      <IDE />
      <RoverCam />
    </div>
  );
}
