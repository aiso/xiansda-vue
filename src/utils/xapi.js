import Promise from 'nd-promise'
import request from './request'
import base64 from './base64'
import store from 'store'

function chkAuth(){
	const user = store.getters.auth
	if(!!user){
		return  { mutate: options => {
			//console.log(user);
			options['headers']['Authorization'] = base64.encode(user.id + ":" + user.token);
			return Promise.resolve(options)
		} }
	}

	return null
}

export function get(url){
	return request(Object.assign({ url }, chkAuth()))
}

export function post(url, data){
	return request(Object.assign({ url, method:'POST', params:data }, chkAuth()))
}

export function remove(url){
	return request(Object.assign({ url, method:'DELETE' }, chkAuth()))
}