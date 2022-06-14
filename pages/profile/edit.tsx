import useMutation from "libs/client/useMutation";
import useUser from "libs/client/useUser";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";

interface IEditForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface IEditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<IEditForm>();
  const [editProfile, { data, loading }] =
    useMutation<IEditProfileResponse>(`/api/users/me`);
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
  }, [user]);
  const onValid = async ({ email, phone, name, avatar }: IEditForm) => {
    if (loading) return;
    if (email === "" && phone === "") {
      setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      //get clouflare url
      const { id, uploadURL } = await (await fetch(`/api/files`)).json();
      //send file to the url
      const form = new FormData();
      form.append("file", avatar[0], user.id + "");
      await fetch(uploadURL, {
        //받아온 url로 form POST
        method: "POST",
        body: form,
      });
      return;
    } else {
      editProfile({ name, email, phone });
    }
  };
  useEffect(() => {
    if (data && !data.ok) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatarExist = watch("avatar");
  useEffect(() => {
    if (avatarExist && avatarExist.length > 0) {
      const file = avatarExist[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatarExist]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-5 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="text"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-bold text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
