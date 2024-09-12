import { useRouter } from "next/router";
import curriculum from "@/data/curriculum.json";
import LessonPane from "@/components/ui/LessonPane";
import IDE from "@/components/ui/IDE";
import RoverCam from "@/components/ui/RoverCam";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Exercise() {
  const router = useRouter();
  const { missionId, lessonId, exerciseId } = router.query;

  const mission = curriculum.missions.find((m) => m.id === missionId);
  const lesson = mission?.lessons.find((l) => l.id === lessonId);
  const exercise = lesson?.exercises.find((s) => s.id === exerciseId);

  if (!exercise) return <div>exercise not found</div>;

  return (
    <PanelGroup direction="horizontal">
      <Panel className="flex" minSize={1}>
        <LessonPane exercise={exercise} />
      </Panel>
      <PanelResizeHandle className="w-0.5 bg-slate-600 transition-colors hover:bg-slate-700" />
      <Panel className="flex" minSize={20}>
        <IDE
          mission={mission}
          lesson={lesson}
          exercise={exercise}
          router={router}
          code={exercise.code}
        />
      </Panel>
      <PanelResizeHandle className="w-0.5 bg-slate-600 transition-colors hover:bg-slate-700" />
      <Panel className="flex" minSize={20}>
        <RoverCam />
      </Panel>
    </PanelGroup>
  );
}
