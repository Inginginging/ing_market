import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <form className="flex flex-col space-y-2 p-5">
      <input
        type="text"
        required
        placeholder="username"
        className="border p-1 border-gray-400 rounded-md peer"
      />
      <span className="hidden peer-invalid:block peer-invalid:text-red-500">
        This username is invalid
      </span>
      <span className="hidden peer-valid:block peer-valid:text-blue-500">
        Awsome username!!!
      </span>
      <input type="submit" value="Log in" className="bg-white" />
    </form>
  );
};

export default Home;
