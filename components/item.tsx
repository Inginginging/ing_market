import Image from "next/image";
import Link from "next/link";

interface IItemProps {
  title: string;
  id: number;
  price: number;
  hearts: number;
  image: string;
}

export default function Item({ title, id, price, hearts, image }: IItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <a className="flex cursor-pointer justify-between px-4 pt-5">
        <div className="flex space-x-4">
          <div className="flex justify-center items-center">
            {image ? (
              <img src={image} className="w-20 h-20 bg-gray-400" />
            ) : (
              <div className="w-20 h-20 bg-gray-400" />
            )}
          </div>
          <div className="pt-2 flex flex-col">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            <span className="font-bold mt-1 text-gray-900">${price}</span>
          </div>
        </div>
        <div className="flex items-end justify-end space-x-2">
          <div className="flex items-center text-sm text-gray-600 space-x-0.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{hearts}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
