import connectMongo from "../../../data/connection";
import {
  deleteUser,
  getUser,
  postUser,
  putUser,
} from "../../../data/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  const { method } = req;

  switch (method) {
    case "POST":
      postUser(req, res);
      break;

    case "GET":
      getUser(req, res);
      break;

    case "PUT":
      putUser(req, res);
      break;

    case "DELETE":
      deleteUser(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
