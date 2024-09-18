import { supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { userId } = req.body;
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { data, error } = await supabaseAdmin
      .schema("next_auth")
      .from("users")
      .delete()
      .eq("id", userId)
      .select();

    if (error) {
      console.error("Error deleting user:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
}
