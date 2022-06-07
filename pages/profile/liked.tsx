import ProductList from "components/product-list";
import type { NextPage } from "next";
import Layout from "../../components/layout";

const Liked: NextPage = () => {
  return (
    <Layout title="좋아요" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Liked;
