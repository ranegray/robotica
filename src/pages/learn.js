import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Learn() {
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/user-profile");
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to your Mission Hub</h1>
        <p className="text-lg">
          This page will serve as the mission hub for learning everything about
          robotics. From here you can accept missions (new learning objectives)
          work on your rover robot, upgrade your base, view
          level/stats/achievements, and more.
        </p>
        <Link
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          href="/login"
        >
          Log in
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">
            Welcome to your Mission Hub, {session.user.email}
          </h1>
          <p className="text-lg">
            This page will serve as the mission hub for learning everything
            about robotics. From here you can accept missions (new learning
            objectives) work on your rover robot, upgrade your base, view
            level/stats/achievements, and more.
          </p>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center justify-center gap-5">
            <h2 className="text-2xl font-bold">Mission Log</h2>
            <p className="text-lg">
              Here you can view and accept missions. Missions are learning
              objectives that you can complete to earn rewards.
            </p>
            <h3 className="text-xl font-bold">Current Mission</h3>
            <p className="text-lg">
              You currently have no missions. In the meantime, feel free to work
              mess around with the rover control center.
            </p>

            <Link
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              href="/rover"
            >
              Rover Control Center
            </Link>

            <h3 className="text-xl font-bold">Completed Missions</h3>
            <p className="text-lg">
              You have completed 0 missions. Check back later for new missions.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Rover Workshop</h2>
            <p className="text-lg">
              Here you can work on your rover robot. You can upgrade its parts,
              view its stats, and more.
            </p>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Work on Rover
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Base</h2>
            <p className="text-lg">
              Here you can upgrade your base. Upgrading your base will unlock
              new features and abilities.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Stats</h2>
            <p className="text-lg">
              Here you can view your level, stats, and achievements.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
