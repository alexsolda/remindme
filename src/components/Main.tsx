import Link from 'next/link';

export function Main() {

    return (
        <>
            <div>Olá mundo</div>
            <button>Nova atividade</button>

            <Link passHref href='/mytodolist'>Todo lists</Link>
        </>
    )
}