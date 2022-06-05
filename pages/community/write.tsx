import { Post } from "@prisma/client";
import useCoords from "libs/client/useCoords";
import useMutation from "libs/client/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

//Form에 들어오는 type
interface IForm {
  question: string;
}
//useMutation의 반환값 type
interface IPost {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<IForm>();
  const [post, { loading, data }] = useMutation<IPost>("/api/posts");
  const onValid = (data: IForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea
          register={register("question", { required: true })}
          required
          placeholder="Ask Question!"
        />
        <Button text={loading ? "Loading..." : "Save"} />
      </form>
    </Layout>
  );
};

export default Write;
