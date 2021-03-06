import { Stream } from "@prisma/client";
import Loading from "components/loading";
import useMutation from "libs/client/useMutation";
import useUser from "libs/client/useUser";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Layout from "../../components/layout";
import Message from "../../components/message";

interface StreamMessage {
  message: string;
  id: number;
  user: {
    id: number;
    avatar?: string;
  };
}
interface StreamWithMessage extends Stream {
  messages: StreamMessage[];
}
interface IStreamResponse {
  ok: boolean;
  stream: StreamWithMessage;
}

interface IFormData {
  message: string;
}

const StreamDetail: NextPage = () => {
  const { user } = useUser(); //login user와 message user를 비교하기 위해
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IFormData>();
  const { data, mutate } = useSWR<IStreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    { refreshInterval: 1000 }
  );
  const [messageSender, { loading, data: messageSenderData }] = useMutation(
    `/api/streams/${router.query.id}/message`
  );
  const onValid = (form: IFormData) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    ); //backend로 post되기전에 mutate (눈속임임)
    messageSender(form);
  };
  return (
    <Layout canGoBack seoTitle={data?.stream.name}>
      {data ? (
        <div className="py-10 px-4  space-y-4">
          {data.stream.cloudflareId ? (
            <iframe
              className="w-full aspect-video  rounded-md shadow-sm"
              src={`https://iframe.videodelivery.net/${data?.stream.cloudflareId}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            ></iframe>
          ) : null}
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.stream.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              ${data?.stream.price}
            </span>
            <p className=" my-6 text-gray-700">{data?.stream.description}</p>
            <div className="bg-orange-400 p-3 rounded-md overflow-scroll flex flex-col space-y-3">
              <span>Stream Keys (secret)</span>
              <span className="text-white">
                <span className="font-medium text-gray-800">URL: </span>
                {data?.stream.cloudflareUrl}
              </span>
              <span className="text-white">
                <span className="font-medium text-gray-800">Key: </span>
                <span className="text-sm">{data?.stream.cloudflareKey}</span>
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
            <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
              {data?.stream.messages.map((message) => (
                <Message
                  key={message.id}
                  message={message.message}
                  reversed={message.user.id === user?.id}
                />
              ))}
            </div>
            <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
              <form
                onSubmit={handleSubmit(onValid)}
                className="flex relative max-w-md items-center  w-full mx-auto"
              >
                <input
                  {...register("message", { required: true })}
                  type="text"
                  className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
                />
                <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                  <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                    &rarr;
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default StreamDetail;
