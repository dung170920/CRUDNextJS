import { CheckIcon } from "@heroicons/react/solid";
import React from "react";

const Success = ({ message }) => {
  return (
    <div className="succes container mx-auto">
      <div className="flex justify-center mx-auto border border-green-200 bg-green-400 w-3/6 text-gray-900 text-sm my-4 py-2 text-center bg-opacity-5">
        <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
        {message}
      </div>
    </div>
  );
};

export default Success;
