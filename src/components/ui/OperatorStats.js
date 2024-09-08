export default function OperatorStats({ user }) {
  return (
    <div className="text-center font-bold text-teal-400">
      <p>LEVEL {user?.level}</p>
      <progress
        max={user?.level * 1000}
        value={user?.xp}
        className="w-3/4 [&::-moz-progress-bar]:bg-red-500 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-slate-950 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-red-500"
      ></progress>
      <p>
        XP: {user?.xp} / {user?.level * 1000}
      </p>
      <p>MISSIONS COMPLETED: 0</p>
    </div>
  );
}
