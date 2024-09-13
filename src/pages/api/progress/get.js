import { supabase } from "@/lib/supabase";
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

    if (method === "GET") {
      try {
        const { data, error } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch progress" });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Unhandled Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
