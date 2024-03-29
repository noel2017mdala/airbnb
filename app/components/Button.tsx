"use client";
import React from "react";
import { IconType } from "react-icons";

type ButtonType = {
  label: string;
  onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

const Button: React.FC<ButtonType> = ({
  label,
  onclick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white"
      }
      ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold border-2"
      }
      `}
    >
      {Icon && <Icon size={24} className="absolute left top-3 ml-4" />}
      {label}
    </button>
  );
};

export default Button;
