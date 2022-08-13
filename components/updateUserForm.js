import { PencilIcon } from "@heroicons/react/solid";
import React from "react";
import { getUser, getUsers, updateUser } from "../utils/helpers";
import { useQuery, useMutation, useQueryClient } from "react-query";

const UpdateUserForm = ({ formId, formData, setFormData }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
    getUser(formId)
  );
  const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      // queryClient.setQueryData('users', (old) => [data])
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;

  const { name, salary, date, email, status } = data;
  const [firstname, lastname] = name ? name.split(" ") : formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;
    let updated = Object.assign({}, data, formData, { name: userName });
    await UpdateMutation.mutate(updated);
  };

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
          defaultValue={firstname}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          placeholder="Last name"
          name="lastname"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
          defaultValue={lastname}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
          defaultValue={email}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          placeholder="Salary"
          name="salary"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
          defaultValue={salary}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          placeholder="Birthday"
          name="birthday"
          className="px-4 py-2 border w-full outline-none rounded-md"
          onChange={setFormData}
          defaultValue={date}
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
            defaultChecked={status == "Active"}
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
            defaultChecked={status !== "Active"}
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
        <PencilIcon className="w-5 h-5" />
        Update
      </button>
    </form>
  );
};

export default UpdateUserForm;
