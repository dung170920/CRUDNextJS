import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import Success from "./success";
import Error from "./error";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../utils/helpers";

const AddUserForm = ({ formData, setFormData }) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    let { firstname, lastname, email, salary, date, status } = formData;

    const model = {
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`,
      email,
      salary,
      date,
      status: status ?? "Active",
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError)
    return <Error message={addMutation.error.message}></Error>;
  if (addMutation.isSuccess)
    return <Success message={"Added Successfully"}></Success>;

  return (
    <form
      className="grid lg:grid-cols-2 w-4/6 gap-4 py-5"
      onSubmit={handleSubmit}
    >
      <div className="input-type">
        <input
          type="text"
          placeholder="First name"
          name="firstname"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          placeholder="Last name"
          name="lastname"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          placeholder="Salary"
          name="salary"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          placeholder="Birthday"
          name="birthday"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            name="status"
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-full cursor-pointer checked:bg-green-500 focus:outline-none transition duration-300 mt-1 mr-2"
            value="Active"
            id="active"
            onChange={setFormData}
          />
          <label
            htmlFor="active"
            className="cursor-pointer text-sm text-gray-600"
          >
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="status"
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-full cursor-pointer checked:bg-green-500  focus:outline-none transition duration-300 mt-1 mr-2"
            value="Inactive"
            id="inActive"
            onChange={setFormData}
          />
          <label
            htmlFor="inActive"
            className="cursor-pointer text-sm text-gray-600"
          >
            Inactive
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-x-1 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 w-2/6"
      >
        <PlusIcon className="w-5 h-5" />
        Add
      </button>
    </form>
  );
};

export default AddUserForm;
