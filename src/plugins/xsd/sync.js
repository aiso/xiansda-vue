import Promise from 'nd-promise'
import store from 'store'
import api from './api'

import { 
  SET_WORKS, 
} from 'store/constants'

const entities = {
	works : () => {
		return api.get('user/works/all').then(data=>{
			store.commit(SET_WORKS, data.works)
			return data
        })
	}
}

export default {
	load: name=>{
		return (!!entities[name])?entities[name]():Promise.reject()
	},
	loadAll: ()=>{
		
	}

}