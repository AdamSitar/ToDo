import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { listSchema, ListSchemaType } from "../utils/schemas";
import ExpandBox from "./animation/ExpandBox";
import ErrorBox from "./ErrorBox";

interface IListFormProps {
  createList: (data: ListSchemaType) => Promise<void>;
}

const ListForm: React.FC<IListFormProps> = ({ createList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListSchemaType>({
    resolver: zodResolver(listSchema),
  });

  return (
    <ExpandBox title="Create a new list">
      <form
        onSubmit={handleSubmit(createList)}
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
