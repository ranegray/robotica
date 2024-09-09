import { useRouter } from "next/router";
import curriculum from "@/data/curriculum.json";
import LessonPane from "@/components/ui/LessonPane";
import IDE from "@/components/ui/IDE";
import RoverCam from "@/components/ui/RoverCam";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Step() {
  const router = useRouter();
  const { missionId, lessonId, stepId } = router.query;

  const mission = curriculum.missions.find((m) => m.id === parseInt(missionId));
  const lesson = mission?.lessons.find((l) => l.id === lessonId);
  const step = lesson?.steps.find((s) => s.id === stepId);

  if (!step) return <div>Step not found</div>;

  return (
    <PanelGroup direction="horizontal">
      <Panel className="flex" minSize={1}>
        <LessonPane lesson={step} />
      </Panel>
      <PanelResizeHandle className="w-0.5 bg-slate-600 transition-colors hover:bg-slate-700" />
      <Panel className="flex" minSize={20}>
        <IDE
          mission={mission}
          lesson={lesson}
          step={step}
          router={router}
          code={step.code}
        />
      </Panel>
      <PanelResizeHandle className="w-0.5 bg-slate-600 transition-colors hover:bg-slate-700" />
      <Panel className="flex" minSize={20}>
        <RoverCam />
      </Panel>
    </PanelGroup>
  );
}
