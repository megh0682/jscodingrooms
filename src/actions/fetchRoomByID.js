export default function fetchRoom(id) {
  const getroombyID =  fetch('/api/rooms/'+id).then(res => {
    return res.json()
  }).then(res => {
    return res
  })
  return {type: "GET_ROOM_BY_ID", payload: getroombyID}
}