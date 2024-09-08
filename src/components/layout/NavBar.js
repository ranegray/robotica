import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-slate-800 p-4 text-white">
      <ul className="m-auto flex max-w-screen-lg items-center justify-between">
        {status == "authenticated" ? (
          <>
            <li>
              <Link href="/learn">Robotica</Link>
            </li>
            <div className="flex items-center gap-5">
              <li>
                <Link href="/learn">{session.user.email}</Link>
              </li>
              <li>
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign out
                </button>
              </li>
            </div>
          </>
        ) : (
          <>
            <li>
              <Link href="/">Robotica</Link>
            </li>
            <div className="flex items-center gap-5">
              <li>
                <Link href="/auth/signin">Log in</Link>
              </li>
              <li className="border bg-purple-600 p-2">
                <Link href="/auth/new-user">Sign up</Link>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}
