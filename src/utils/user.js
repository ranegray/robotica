// utils/user.js
import { supabase } from "../lib/supabase";

export async function initializeUserData(userId) {
  try {
    // Initialize user_profiles
    await supabase
      .from("user_profiles")
      .insert({ id: userId, level: 1, xp: 0 });

    // Initialize lesson_progress
    // Assuming you have a 'lessons' table
    const { data: lessons } = await supabase.from("lessons").select("id");

    if (lessons) {
      await supabase.from("lesson_progress").insert(
        lessons.map((lesson) => ({
          user_id: userId,
          lesson_id: lesson.id,
          completed: false,
        })),
      );
    }

    console.log("User data initialized successfully");
  } catch (error) {
    console.error("Error initializing user data:", error);
  }
}
