import { Button } from "@chakra-ui/react";
import Link from "next/link";

export function BtCreateTask() {

    return (
        <Button
            alignSelf='flex-end'
            bg='transparent'
            color='blue.500'
            borderColor='blue.500'
            border='2px solid'
            _hover={{ bg: 'blue.500', color: 'white.900', borderColor: 'blue.500' }}
        >
            <Link href='/dashboard/newtask'>criar tarefa</Link>
        </Button>
    )
}