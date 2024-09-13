import useUser from "@/hooks/useUser";

export default function Profile() {
  const { user, isLoading, isError } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div>
      <h1>User ID: {user.id}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
