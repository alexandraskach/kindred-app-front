import { useRouter } from 'next/router'

export default async function() {
    const JWT = (typeof window !== 'undefined' && localStorage.JWT) ? localStorage.JWT : null
    const router = useRouter()
    // console.log(router, JWT)
    if (!JWT && !['/register', '/login'].includes(router.asPath)) router.replace('/login')
}