

let _actions = []

const init = actions => {
	_actions = actions
}

const all = () => _actions
const get = id => _actions.find(a=>a.id==id)

export default {
	init,
	get,
	all
}