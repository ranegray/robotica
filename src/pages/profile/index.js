import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Profile() {
  const { user, isLoading, isError } = useUser();
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      alert("User deleted successfully");
      router.push("/");
    } catch (error) {
      alert("Error deleting user: " + error.message);
    }
  };
  return (
    <div className="m-auto max-w-screen-lg">
      <h1>User ID: {user.id}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Last login: {user.last_login}</p>
      <Link
        href={"/profile/edit"}
        className="rounded-full bg-blue-600 px-2 hover:bg-blue-500"
      >
        Edit profile
      </Link>
      <button
        onClick={handleDelete}
        className="mt-4 rounded-full bg-red-600 px-2 hover:bg-red-500"
      >
        Delete profile
      </button>
    </div>
  );
}
