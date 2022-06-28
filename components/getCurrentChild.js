export default async function(session) {

  if (!session.currentChildId && session.children && session.children.length > 0) {
    return session.children[0]
  }

  const response = await fetch( process.env.NEXT_PUBLIC_API_URL + `/api/users/${session.currentChildId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + session.token
      }
    })

  return response.status == 200 ? await response.json() : null
}