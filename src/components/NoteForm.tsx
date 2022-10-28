import React from "react";
import { useForm } from "react-hook-form";
import ExpandBox from "./animation/ExpandBox";
import { zodResolver } from "@hookform/resolvers/zod";

import ErrorBox from "./ErrorBox";
import { noteSchema, NoteSchemaType } from "../utils/schemas";

interface INoteFormProps {
  createNote: (data: any) => Promise<void>;
}

const NoteForm: React.FC<INoteFormProps> = ({ createNote }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteSchemaType>({
    resolver: zodResolver(noteSchema),
  });

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
        <div className="flex flex-col md:flex-row justify-between gap-2">
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

        <ErrorBox errors={errors} />

        <input type="submit" className="border" />
      </form>
    </ExpandBox>
  );
};

export default NoteForm;
