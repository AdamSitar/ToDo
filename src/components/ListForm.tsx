import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";
import ExpandBox from "./animation/ExpandBox";

const ListForm = () => {
  const { session } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log("data", data);
    const { error } = await supabase.from("list").insert([
      {
        title: data.title,
        created_by: session?.user.email,
      },
    ]);
    error && console.log("error", error);
  };
  return (
    <ExpandBox title="Create a new list">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 before:content-['']"
      >
        <input
          placeholder="title"
          {...register("title", { required: true })}
          className="border p-1"
        />

        {errors.title && (
          <span className="self-center">This field is required</span>
        )}

        <input type="submit" className="border" />
      </form>
    </ExpandBox>
  );
};

export default ListForm;
