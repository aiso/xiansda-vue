import request from 'utils/request'
import store from 'store'

export function get(url){
	console.log(store.getters.auth)
	return request(url)
}

export function post(url, data){
	return request(url, { params:data })
}