import type { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <div className="px-4 py-10 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-14 h-14 rounded-full bg-slate-400" />
        <label
          htmlFor="image"
          className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-bold focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700  "
        >
          Change
          <input id="image" type="file" className="hidden" accept="image/*" />
        </label>
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm text-gray-700 font-medium">
          E-mail Address
        </label>
        <input
          id="email"
          type="email"
          className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md shodow-sm placeholder-gray-500 focus:ouline-none focus:ring-orange-500 focus:border-orange-500"
          required
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="phone" className="text-sm text-gray-700 font-medium">
          Phone Number
        </label>
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            id="input"
            type="number"
            className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md rounded-l-none shodow-sm placeholder-gray-500 focus:ouline-none focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
      </div>
      <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium border border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
        Update Profile
      </button>
    </div>
  );
};

export default EditProfile;
