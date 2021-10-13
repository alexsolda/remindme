import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from 'utils/faunadb';
import { Collection, query as q } from 'faunadb';

export default async function editTask(req: NextApiRequest, res: NextApiResponse) {

    const response = await fauna.query(
        q.Update(
            q.Ref(Collection('todo_list'), String(req.body.ref)),
            {
                data: {
                    task: {
                        status: req.body.status
                    }
                }
            }
        )
    )

    return res.json(response)


}