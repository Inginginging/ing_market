import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-3">
      <details className="group">
        <summary className="select-none ">fav.food</summary>
        <span className="group-open:bg-indigo-500">햄버거</span>
      </details>
      <input
        type="file"
        className="file:bg-orange-500 file:text-white file:rounded-xl file:px-5 
        file:hover:bg-white file:hover:text-orange-500 file:hover:border-2 file:hover:border-orange-500"
      />
      <p className="first-letter:text-7xl first-letter:hover:text-purple-400">
        Hello everyone!
      </p>
    </div>
  );
};

export default Home;
