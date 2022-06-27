export default async function(token, path) {
    let response = await fetch( process.env.NEXT_PUBLIC_API_URL + path, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        } )
        
    return response.status == 200 ? await response.json() : null
}
