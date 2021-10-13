import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from 'utils/faunadb'
import { query as q } from 'faunadb';

interface User {
    ref: {
        id: string;
    }
}

export default async function createNewTask(req: NextApiRequest, res: NextApiResponse) {

    const userRef = await fauna.query<User>(
        q.Get(
            q.Match(
                q.Index('user_by_email'),
                q.Casefold(req.body.user)
            )
        )
    )

    const result = await fauna.query(
        q.Create(
            q.Collection('todo_list'),
            {
                data:
                {
                    user:
                        { id: userRef.ref, email: req.body.user },
                    task: {
                        title: req.body.title,
                        description: req.body.description,
                        status: req.body.status,
                        createdAt: req.body.createdAt
                    }
                }
            }
        )
    )

    return res.json(result)


}