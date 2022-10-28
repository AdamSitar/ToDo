import React from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import IconButton from "./animation/IconButton";
import { useUser } from "../context/user";

interface IUserSectionProps {
  logout?: () => Promise<void>;
}

const UserSection: React.FC<IUserSectionProps> = ({ logout }) => {
  const { session } = useUser();
  return (
    <div className="flex flex-row justify-between w-full mb-4 p-2">
      <span>
        Welcome, <b>{session?.user.email}!</b>
      </span>
      <IconButton
        icon={<ArrowLeftOnRectangleIcon />}
        onClick={() => logout && logout()}
      />
    </div>
  );
};

export default UserSection;
