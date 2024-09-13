import { useRouter } from "next/router";
import useCurriculum from "@/hooks/useCurriculum";
import LessonPane from "@/components/ui/LessonPane";
import IDE from "@/components/ui/IDE";
import RoverCam from "@/components/ui/RoverCam";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useEffect } from "react";

export default function Exercise() {
  const { curriculum } = useCurriculum();
  const router = useRouter();
  const { missionId, lessonId, exerciseId } = router.query;

  const mission = curriculum?.missions.find((m) => m.id === missionId);
  const lesson = mission?.lessons.find((l) => l.id === lessonId);
  const exercise = lesson?.exercises.find((s) => s.id === exerciseId);

  useEffect(() => {
    if (missionId && lessonId && exerciseId) {
      async function updateProgress() {
        try {
          const response = await fetch("/api/progress/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              missionId,
              lessonId,
              exerciseId,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to update progress");
          }
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }

      updateProgress();
    }
  }, [missionId, lessonId, exerciseId]);

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
