export default async function(session) {
    const response = await fetch( process.env.NEXT_PUBLIC_API_URL + `/api/users/${session.userId}/childrens`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + session.token
        }
      })

    const children = response.json()

    // if (children.length == 1) {
    //     session.currentChildId = children[0].id
    //     await session.save()
    // }

    return await children
}