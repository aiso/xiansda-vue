import store from 'store'


function XsdAction(config){
	this.config = config
}

let actions = []

const init = configs => {
	actions = configs.map(config=>new XsdAction(config))
}

const all = () => actions
const get = aid => actions.find(s=>s.config.id==aid)
const config = aid => get(aid).config
const configs = () => actions.map(action=>action.config)

export default {
	init,
	all,
	get,
	config,
	configs,
}