import { ProductWithCount } from "pages";
import useSWR from "swr";
import Item from "./item";

interface IProductListProps {
  kind: "sales" | "favs" | "purchases";
}
interface Record {
  id: number;
  product: ProductWithCount;
}
interface IResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: IProductListProps) {
  const { data } = useSWR<IResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind].map((record) => (
        <Item
          image={record.product.image}
          key={record.id}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.fav}
        />
      ))}
    </>
  ) : null;
}
