import { useRouter } from "next/router";

export default function home(){
    const router = useRouter();
    return ( <>home:{router.query.slug}</> );
}