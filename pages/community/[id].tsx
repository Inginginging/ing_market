import { Answer, Post, User } from "@prisma/client";
import Loading from "components/loading";
import useMutation from "libs/client/useMutation";
import useUser from "libs/client/useUser";
import { cls } from "libs/client/utils";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Button from "../../components/button";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

interface AnswerWithUser extends Answer {
  user: User;
}
interface PostWithRelation extends Post {
  user: User;
  answers: AnswerWithUser[];
  _count: {
    answers: number;
    curiosity: number;
  };
}

interface ISWRResponse {
  ok: boolean;
  post: PostWithRelation;
  isCuriosity: boolean;
}

interface IAnswerForm {
  answer: string;
}
interface IAnswerResponse {
  ok: boolean;
  response: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IAnswerForm>();
  const { data, mutate } = useSWR<ISWRResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [curiosity, { loading }] = useMutation(
    `/api/posts/${router.query.id}/curiosity`
  );
  const onCuriosityClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            //data는 해당 session의 user 정보도 갖고 있는 것.
            curiosity: data.isCuriosity
              ? data.post._count.curiosity - 1
              : data.post._count.curiosity + 1,
          },
        },
        isCuriosity: !data.isCuriosity,
      },
      false
    );
    if (!loading) {
      curiosity({});
    }
  };
  const [sendAnswer, { loading: answerLoading, data: answerData }] =
    useMutation<IAnswerResponse>(`/api/posts/${router.query.id}/answers`);
  const onValid = (form: IAnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form); //api로 form의 내용 보냄
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset(); //answer data가 정상이면 form reset
      mutate(); //just refetch
    }
  }, [answerData, reset, mutate]);
  return (
    <Layout canGoBack seoTitle={data?.post.question}>
      {data ? (
        <div>
          <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-300 text-gray-700">
            동네질문
          </span>
          <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
            {data.post.user.avatar ? (
              <img
                src={`https://imagedelivery.net/H_yIPSozL5v7ZLv9PjoVyA/${data.post.user.avatar}/avatar`}
                className="w-16 h-16 rounded-full bg-slate-300"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-300" />
            )}
            <div className="flex justify-between w-full">
              <p className="text-sm font-bold text-gray-700">
                {data.post.user.name}
              </p>
              <Link href={`/profile/${data.post.user.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div>
            <div className="mt-2 px-4 text-gray-700">
              <span className="text-gray-700 font-medium ">Q.</span>{" "}
              {data.post.question}
            </div>
            <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
              <button
                onClick={onCuriosityClick}
                className={cls(
                  "flex space-x-2 items-center text-sm",
                  data.isCuriosity ? "text-teal-600" : ""
                )}
              >
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 {data.post._count.curiosity}</span>
              </button>
              <span className="flex space-x-2 items-center text-sm">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>답변 {data.post._count.answers}</span>
              </span>
            </div>
          </div>
          <div className="px-4 my-5 space-y-5">
            {data.post.answers.map((answer) => (
              <div key={answer.id} className="flex items-start space-x-3">
                {answer.user.avatar ? (
                  <img
                    src={`https://imagedelivery.net/H_yIPSozL5v7ZLv9PjoVyA/${answer.user.avatar}/avatar`}
                    className="w-8 h-8 rounded-full bg-slate-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-300" />
                )}
                <div>
                  <span className="text-sm block font-bold text-gray-700">
                    {answer.user.name}
                  </span>
                  <span className="text-xs text-gray-500 block ">
                    {answer.createdAt
                      .toString()
                      .replace("T", " ")
                      .substring(0, 16)}
                  </span>
                  <p className="text-gray-700 mt-2">{answer.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit(onValid)} className="px-4">
            <TextArea
              name="description"
              placeholder="Answer this Question"
              required
              register={register("answer", { required: true })}
            />
            <Button text={answerLoading ? "Loading..." : "Reply"} />
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default CommunityPostDetail;
