import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/user";
import { listSchema, ListSchemaType } from "../utils/schemas";
import { supabase } from "../utils/supabase";
import ExpandBox from "./animation/ExpandBox";
import ErrorBox from "./ErrorBox";

const ListForm = () => {
  const { session } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListSchemaType>({
    resolver: zodResolver(listSchema),
  });

  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("list").insert([
      {
        title: data.title,
        created_by: session?.user.email,
      },
    ]);
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

        <ErrorBox errors={errors} />

        <input type="submit" className="border" />
      </form>
    </ExpandBox>
  );
};

export default ListForm;
