
const role = {
	client:10,
	supplier:20,
	station:30,
}

const roleName = rid => {
	const names = Object.keys(role)
	const rids = Object.values(role)
	const idx = rids.findIndex(id=>id==rid)
	return (idx>=0)?names[idx]:null
}

export default {
	img:'images/noimg.jpg',
	role,
	roleName
}