import Promise from 'nd-promise'
import store from 'store'
import api from './api'
import service from './service'
import action from './action'

import { 
  SET_WORKS, 
} from 'store/constants'

const entities = {
	base : () => {
		return api.get('static/default').then(data=>{
		    service.init(data.services)
		    action.init(data.actions)
			return data
        })
	},
	works : () => {
		if(!!store.getters.user){
			return api.get('user/works/all').then(data=>{
				store.commit(SET_WORKS, data.works)
				return data
	        })
		}else
			Promise.resolve()
	}
}

const loadEntity = (...names) => {
	if(names.length == 0)
		return Promise.reject('name error!')
	else if(names.length == 1)
		return (!!entities[names[0]])?entities[names[0]]():Promise.reject('name error!')
	else
		return Promise.all(names.map(name=>loadEntity(name)))
}

export default {
	load : loadEntity,
	loadAll: ()=>{
		const names = Object.keys(entities)
		return Promise.all(names.map(name=>loadEntity(name)))
	}

}