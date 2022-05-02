import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-10 grid gap-10 ">
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div>
          <span className="font-semibold text-2xl">Select Item</span>
          <div className="flex justify-between my-2">
            <span className="text-gray-500">Grey Chair</span>
            <span className="font-semibold">$29</span>
          </div>
          <div className="flex justify-between ">
            <span className="text-gray-500">Grey Chair</span>
            <span className="font-semibold">$29</span>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
            <span>Grey Chair</span>
            <span className="font-semibold">$29</span>
          </div>
          <div className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-2/4 mx-auto">
            CheckOut
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-blue-500 text-white p-6 pb-14">
          <span className="text-2xl">Profile</span>
        </div>
        <div className="bg-white rounded-3xl relative -top-6 p-6">
          <div className="flex justify-between items-end relative -top-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="rounded-full w-24 h-24 bg-red-400" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-10 -mb-5">
            <span className="text-lg font-medium">Ing</span>
            <span className="text-sm text-gray-500">한국</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-6"></div>
      <div className="bg-white rounded-3xl shadow-xl p-6"></div>
    </div>
  );
};

export default Home;
