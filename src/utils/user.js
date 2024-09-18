// utils/user.js
import { supabase } from "../lib/supabase";

export async function initializeUserData(user) {
  try {
    await supabase
      .from("user_profiles")
      .upsert({
        id: user.id,
        username: user.email.split("@")[0],
        level: 1,
        xp: 0,
        last_login: new Date(),
      });

    console.log("User data initialized successfully");
  } catch (error) {
    console.error("Error initializing user data:", error);
  }
}

export async function updateUserProgress(
  userId,
  missionId,
  lessonId,
  exerciseId,
) {
  const { data, error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      mission_id: missionId,
      lesson_id: lessonId,
      exercise_id: exerciseId,
    },
    {
      onConflict: "user_id",
    },
  );

  if (error) throw error;
  return data;
}
