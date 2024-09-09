import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <header className="flex-shrink-0">
      <nav className="bg-slate-800 p-4 text-white">
        <ul className="m-auto flex max-w-screen-lg items-center justify-between">
          {status == "authenticated" ? (
            <>
              <div className="flex gap-5 uppercase">
                <li>
                  <Link href="/learn" className="font-extrabold">
                    Robotica
                  </Link>
                </li>
                <li>
                  <Link href="/learn" className="text-sm font-bold">
                    Home
                  </Link>
                </li>
              </div>
              <div className="flex items-center gap-5 text-sm font-bold">
                <li>
                  <Link href="/profile" className="underline">
                    {session.user.email}
                  </Link>
                </li>
                <li>
                  <button
                    className="uppercase"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </button>
                </li>
              </div>
            </>
          ) : (
            <>
              <li>
                <Link href="/" className="font-extrabold uppercase">
                  Robotica
                </Link>
              </li>
              <div className="flex items-center gap-5 text-sm font-bold uppercase">
                <li>
                  <Link href="/auth/signin">Log in</Link>
                </li>
                <li className="border bg-blue-600 p-2">
                  <Link href="/auth/new-user">Sign up</Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
