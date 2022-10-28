import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/user";
import { INote } from "../Layout";
import { supabase } from "../utils/supabase";
import ExpandBox from "./animation/ExpandBox";

interface INoteFormProps {
  createNote: (data: any) => Promise<void>;
}

const NoteForm: React.FC<INoteFormProps> = ({ createNote }) => {
  const { session } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    createNote(data);
    reset();
  };

  return (
    <ExpandBox title="Create a new note">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 before:content-['']"
      >
        <div className="flex flex-row justify-between gap-2">
          <input
            placeholder="title"
            {...register("title", { required: true })}
            className="rounded border p-1 flex-grow"
          />

          <input
            {...register("deadline", { required: true })}
            className="rounded border p-1 text-gray-400 flex-grow"
            type="datetime-local"
          />
        </div>

        <input
          placeholder="description"
          {...register("description", { required: true })}
          className="border p-1"
        />

        {(errors.title || errors.description) && (
          <span className="self-center">This field is required</span>
        )}

        <input type="submit" className="border" />
      </form>
    </ExpandBox>
  );
};

export default NoteForm;
