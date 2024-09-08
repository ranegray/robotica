import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  try {
    // Check if the user is authenticated using getServerSession
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { method } = req;
    const userId = session.user.id;

    switch (method) {
      case "GET":
        // Read user profile
        try {
          const { data, error } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", userId)
            .single();

          if (error) throw error;
          return res.status(200).json(data);
        } catch (error) {
          console.error("GET Error:", error);
          return res.status(400).json({ error: error.message });
        }

      case "POST":
        // Create user profile
        try {
          const { data, error } = await supabase
            .from("user_profiles")
            .insert({ ...req.body, user_id: userId })
            .single();

          if (error) throw error;
          return res.status(201).json(data);
        } catch (error) {
          console.error("POST Error:", error);
          return res.status(400).json({ error: error.message });
        }

      case "PUT":
        // Update user profile
        try {
          const { data, error } = await supabase
            .from("user_profiles")
            .update(req.body)
            .eq("user_id", userId)
            .single();

          if (error) throw error;
          return res.status(200).json(data);
        } catch (error) {
          console.error("PUT Error:", error);
          return res.status(400).json({ error: error.message });
        }

      case "DELETE":
        // Delete user profile
        try {
          const { data, error } = await supabase
            .from("user_profiles")
            .delete()
            .eq("user_id", userId);

          if (error) throw error;
          return res
            .status(200)
            .json({ message: "Profile deleted successfully" });
        } catch (error) {
          console.error("DELETE Error:", error);
          return res.status(400).json({ error: error.message });
        }

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Unhandled Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
