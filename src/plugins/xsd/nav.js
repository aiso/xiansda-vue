import Promise from 'nd-promise'
import store from 'store'


export function home(){
	const user = store.getters.auth
	if(!!user){
		if(user.role == 10)
			return 'client/home';	
		else if(user.role == 20)
			return 'supplier/businesses';	
	}
	return '/';
}
