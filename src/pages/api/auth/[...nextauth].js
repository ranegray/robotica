import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import EmailProvider from "next-auth/providers/email";
import { initializeUserData } from "@/utils/user";
import { supabase } from "@/lib/supabase";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // ...add more providers here
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    async signIn({ user }) {
      console.log("signIn", user);
      if (user.emailVerified) {
        // Check if user is already initialized
        const { data, error } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (error || !data) {
          // User not initialized, so initialize now
          await initializeUserData(user.id);
        }
      }
      return true;
    },
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/", // Redirect to home page after sign out
    newUser: "/auth/new-user", 
  },
};

export default NextAuth(authOptions);
