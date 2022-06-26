export default async function(session) {
    let responseWallet = await fetch( process.env.NEXT_PUBLIC_API_URL + `/api/users/${session.currentChild.id}/contract`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session.token,
            }
        } ),
        wallet = await responseWallet.json()

    return wallet
}
