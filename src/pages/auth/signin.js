import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>;
  }

  return (
    <div className="m-auto max-w-screen-lg">
      <label htmlFor="email">Email</label>
      <input
        className="rounded-lg border border-black"
        id="email"
        type="email"
        onChange={handleEmailChange}
      />
      <button
        className="rounded-full border bg-blue-500 px-3 font-bold uppercase text-white"
        onClick={() => signIn("email", { email })}
      >
        Submit
      </button>
    </div>
  );
}
