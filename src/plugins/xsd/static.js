
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
/*
let _actions = []
const initActions = actions => {
	_actions = actions
}
const actions = () => _actions
const action = id => _actions.find(a=>a.id==id)
*/
export default {
	img:'images/noimg.jpg',
	role,
	roleName,
/*
	initActions,
	actions,
	action,
*/
}