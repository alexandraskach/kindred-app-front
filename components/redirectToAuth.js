// import { useRouter } from 'next/router'

export default async function(session) {

    let response = await fetch( process.env.NEXT_PUBLIC_API_URL + `/api`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + session.token,
        }
    } )

    if (response.status == 401) return true
    
    response = await fetch( process.env.NEXT_PUBLIC_API_URL + `/api/users/${session.userId}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + session.token,
        }
    } )

    if (response.status !== 200) return true

    return false
}
