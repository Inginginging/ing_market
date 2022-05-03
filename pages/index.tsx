import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-10 grid gap-10 min-h-screen">
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
          <button
            className="mt-5 bg-blue-500 text-white p-3 
            text-center rounded-xl w-3/4 mx-auto block
          hover:bg-red-400 hover:text-black 
          active:bg-teal-500 focus:bg-yellow-500"
          >
            CheckOut
          </button>
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
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-5">
          <span className="font-semibold">←</span>
          <div className="space-x-3">
            <span className="text-yellow-600">★ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">❤</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5" />
        <div className="flex flex-col ">
          <span className="font-semibold text-xl">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button className="rounded-full w-4 h-4 bg-blue-500 focus:ring-2 ring-offset-2 ring-blue-500 transition" />
              <button className="rounded-full w-4 h-4 bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
              <button className="rounded-full w-4 h-4 bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition" />
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-sky-200 rounded-lg flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="bg-sky-200 rounded-lg flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-2xl">$450</span>
            <button className="bg-blue-500 py-2 px-8 text-xs text-white text-center rounded-lg">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
