import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function NewUser() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>;
  }

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" onChange={handleEmailChange} />
      <button onClick={() => signIn("email", { email })}>Sign up</button>
    </div>
  );
}
