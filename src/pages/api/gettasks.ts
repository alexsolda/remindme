import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from 'utils/faunadb'
import { query as q } from 'faunadb';
import { getSession } from 'next-auth/client';

export const getAllData = async (email: string) => {
    return await fauna.query(
        q.Map(
            q.Paginate(
                q.Match(
                    q.Index('tasks_by_user'),
                    email
                ), { size: 50 }
            ),
            q.Lambda(x => q.Get(x))
        )
    )
}

export default async function getData(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession({ req });

    let tasks = {}

    if (session) {
        tasks = await getAllData(session.user?.email);
    }

    res.json(tasks)
}