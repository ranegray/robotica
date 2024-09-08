import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="m-auto flex max-w-screen-sm items-center justify-between">
        <li>
          <Link href="/">Home</Link>
        </li>
        {status == "authenticated" ? (
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
        ) : (
          <div className="flex items-center gap-5">
            <li>
              <Link href="/auth/signin">Log in</Link>
            </li>
            <li className="border bg-purple-600 p-2">
              <Link href="/auth/new-user">Sign up</Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}
