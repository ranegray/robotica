import useUser from "@/hooks/useUser";

export default function Profile() {
  const { user, isLoading, isError } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div className="m-auto max-w-screen-lg">
      <form className="m-auto flex w-1/2 flex-col">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          defaultValue={user.username}
        />
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          placeholder="Full Name"
          defaultValue={user.full_name}
        />
        <label htmlFor="profile_picture_url">Profile Picture URL</label>
        <input
          type="url"
          id="profile_picture_url"
          name="profile_picture_url"
          placeholder="Profile Picture URL"
          defaultValue={user.profile_picture_url}
        />
        <button className="w-fit rounded-full bg-blue-600 px-2 hover:bg-blue-500">
          Save
        </button>
      </form>
    </div>
  );
}
