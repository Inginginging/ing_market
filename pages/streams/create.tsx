import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <div className="py-10 px-4 space-y-5">
      <div>
        <label
          htmlFor="name"
          className="text-sm text-gray-700 font-medium mb-1 block"
        >
          Name
        </label>
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id="name"
            type="email"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="price"
          className="text-sm text-gray-700 font-medium mb-1 block"
        >
          Price
        </label>
        <div className="relative rounded-md shadow-sm flex items-center">
          <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id="price"
            type="text"
            placeholder="0.00"
            className="pl-7 appearance-none w-full px-4 py-2 border border-gray-300 rounded-md shodow-sm placeholder-gray-500 focus:ouline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="text-sm text-gray-700 font-medium mb-1 block"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="mt-1 shadow-sm w-full focus:ring-orange-500 focus:border-orange-500 rounded-md border-gray-300 resize-none"
        />
      </div>
      <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium border border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
        Start Live
      </button>
    </div>
  );
};

export default Create;
