import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from "utils/faunadb";
import { Collection, query as q } from "faunadb";

export default async function deletetask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fauna.query(
    q.Delete(q.Ref(Collection("todo_list"), String(req.body.ref)))
  );

  return res.json(response);
}