import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../utils/helpers";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../redux/reducer";

const Table = () => {
  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  if (isLoading) return <div>Employee is Loading...</div>;
  if (isError) return <div>Got Error {error}</div>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="text-gray-200 bg-gray-800">
          <th className="px-16 py-2">
            <span>Name</span>
          </th>
          <th className="px-16 py-2">
            <span>Email</span>
          </th>
          <th className="px-16 py-2">
            <span>Salary</span>
          </th>
          <th className="px-16 py-2">
            <span>Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span>Status</span>
          </th>
          <th className="px-16 py-2">
            <span>Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
};

function Tr({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
    console.log(visible);
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex items-center">
        <img
          src={avatar}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="ml-2 font-semibold">{name || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>${salary || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <button
          className={`${
            status === "Active" ? "bg-green-500" : "bg-red-500"
          } text-white px-5 py-1 rounded-full text-sm`}
        >
          {status || "Unknown"}
        </button>
      </td>
      <td className="px-16 py-2">
        <button onClick={onUpdate}>
          <PencilIcon className="w-5 h-5 text-yellow-500 mr-5" />
        </button>
        <button onClick={onDelete}>
          <TrashIcon className="w-5 h-5 text-red-500" />
        </button>
      </td>
    </tr>
  );
}

export default Table;
