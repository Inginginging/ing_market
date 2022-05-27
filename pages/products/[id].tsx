import { Product, User } from "@prisma/client";
import Loading from "components/loading";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "../../components/button";
import Layout from "../../components/layout";

interface ProductWithUser extends Product {
  user: User;
}
interface ProductDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter(); //router의 query를 받아오기 위함
  const { data } = useSWR<ProductDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  return (
    <Layout canGoBack>
      {data ? (
        <div className="px-4 py-4">
          <div className="mb-8">
            <div className="h-96 bg-slate-300" />
            <div className="flex items-center space-x-3 py-3 border-b">
              <div className="w-12 h-12 rounded-full bg-slate-300 cursor-pointer" />
              <div>
                <p className="text-sm font-bold text-gray-700 cursor-pointer">
                  {data.product.user.name}
                </p>
                <Link href={`/users/profiles/${data.product.user.id}`}>
                  <a className="text-xs font-bold text-gray-500 cursor-pointer">
                    View profile &rarr;
                  </a>
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-extrabold text-gray-900">
                {data.product.name}
              </h1>
              <span className="text-3xl font-bold mt-1.5 text-gray-900 block">
                ${data.product.price}
              </span>
              <p className="text-base my-6 text-gray-700">
                {data.product.description}
              </p>
              <div className="flex items-center justify-between space-x-2">
                <Button isBig text="Talk to Seller" />
                <button className="p-3 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-md">
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {data.relatedProducts.map((product) => (
                <Link href={`/products/${product.id}`}>
                  <a key={product.id}>
                    <div className="h-56 w-full bg-slate-300 mb-2" />
                    <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                    <span className="text-sm font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default ItemDetail;
