import { Product } from "@prisma/client";
import Loading from "components/loading";
import useUser from "libs/client/useUser";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR, { SWRConfig } from "swr";
import FloatingButton from "../components/floating_button";
import Item from "../components/item";
import Layout from "../components/layout";
import client from "libs/server/client";

export interface ProductWithCount extends Product {
  _count: {
    fav: number;
  };
}

//"/api/products"에서 받아온 res type
interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");
  return (
    <Layout title="홈" hasTabBar seoTitle="Home">
      {data ? (
        <div className="flex flex-col space-y-5 divide-y">
          {data?.products?.map((product) => (
            <Item
              id={product.id}
              key={product.id}
              title={product.name}
              price={product.price}
              hearts={product._count?.fav || 0}
            />
          ))}
          <FloatingButton href="/products/upload">
            <svg
              className="h-6 w-6"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButton>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

//SSR 과 SWR의 장점들을 모두 사용하는 구조
const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  return (
    //캐쉬 정보 사용을 위해 fallback 사용
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};
//api를 거치지 않고 바로 db로 접근해서 정보 가져옴
export async function getServerSideProps() {
  const products = await client?.product.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;
