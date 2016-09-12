
let _data
const staticData = { }

export function initStaticData(arr){
	_data = arr
	for (const name of _data.keys()) {
	  staticData[name] = {
	  	all:{
	  		get(){
	  			return _data[name]
	  		}
	  	},
	  	get(id){
	  		return _data[name].find(i=>i.id==id)
	  	}
	  }
	}
}


export default staticData
