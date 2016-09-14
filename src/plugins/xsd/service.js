
function XsdService(config){
	this.config = config
}

XsdService.prototype.surl = function(url){
	return 's'+ this.config.id +'/' + url
}

XsdService.prototype.routeItemService = function(id){
	return { name:this.surl('item/service'), params:{ id } }
}

let services = []

const init = configs => {
	services = configs.map(config=>new XsdService(config))
}

const all = () => services
const get = sid => services.find(s=>s.id=sid)
const cfg = sid => get(sid).config

export default {
	init,
	get,
	cfg,
	all
}