import { Box, Flex, Spinner } from "@chakra-ui/react";
import { BtCreateTask } from "components/BtCreateTask";
import { EmptyInfo } from "components/EmptyInfo";
import { Header } from "components/Header";
import { LoginNotFound } from "components/LoginNotFound";
import { SearchArea } from "components/SearchArea";
import { Task } from 'components/Task';
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";
import { fetcher } from "services/api";
import useSWR from "swr";

interface Task {
    ref: {
        '@ref': {
            id: string
        }
    },
    data: {
        task: {
            title: string;
            description: string;
            createdAt: string;
            status: string;
        }
    }
}

interface Tasks {
    data: Task[]
}

export default function Dashboard() {

    const router = useRouter();
    const [session] = useSession();

    useEffect(() => {

        if (!session) {
            router.push('/login')
            return
        }
    }, [session])


    const { data } = useSWR<Tasks>('/api/gettasks', fetcher);
    const [task, setTask] = useState<Task[]>([]);

    useEffect(() => {
        if (data && session) {
            const newData = data.data.slice(0).reverse();
            setTask(newData)
        }
    }, [data])


    return (
        <>
            <Head>
                <title>Dashboard | rem!nd me</title>
            </Head>
            <Header />
            {session && data ? (
                <Box maxW='1120px' m='0 auto' mt='150px' pr='5' pl='5'>
                    <SearchArea tasks={data} tasksSetter={setTask} />
                    <BtCreateTask />
                    <Flex mt='10' flexDir='column'>
                        {task && (
                            task.map(task => (
                                <Task key={task.ref["@ref"].id} data={task} />
                            ))
                        )}
                        {task.length < 1 && <EmptyInfo />}
                    </Flex>
                </Box>
            ) : (
                <></>
            )}
        </>
    )
}
