import type { NextPage } from "next";

const StreamDetail: NextPage = () => {
  return (
    <div className="py-10 px-4 space-y-4 ">
      <div className="w-full bg-slate-400 aspect-video rounded-md shadow-sm" />
      <h3 className="font-bold text-gray-700 text-xl">Let's try Potatos</h3>
      <div className="py-8 px-4 space-y-5 h-[55vh] overflow-y-scroll border-t-[1px] ">
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
            <p>I want ￦20,000</p>
          </div>
        </div>
      </div>
      <div className="fixed py-2 bg-white bottom-2 inset-x-0">
        <div className="flex items-center relative max-w-md w-full mx-auto">
          <input
            type="text"
            className="px-4 shadow-sm rounded-full w-full border-gray-400 focus:ring-orange-500 focus:outline-none focus:border-orange-500 pr-12"
          />
          <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
            <button className="flex items-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamDetail;