import { updateUserProgress } from "@/utils/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { method } = req;
    const userId = session.user.id;

    if (method === "POST") {
      console.log(req.body)
      const { missionId, lessonId, exerciseId } = req.body;
      try {
        if (!userId || !missionId || !lessonId || !exerciseId) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const data = await updateUserProgress(
          userId,
          missionId,
          lessonId,
          exerciseId,
        );
        res.status(200).json(data);
      } catch (error) {
        console.error("Error in /api/progress/update:", error);
        res
          .status(500)
          .json({ error: "Failed to update progress", details: error.message });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Unhandled Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
