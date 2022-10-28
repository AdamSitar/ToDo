import React from "react";

const IconButton: React.FC<{
  icon: JSX.Element;
  onClick: any;
}> = ({ icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 flex flex-row justify-center items-center"
    >
      {icon}
    </button>
  );
};

export default IconButton;
