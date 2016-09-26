
const agentAmount = (price, quantity, agent) => {
	const cost = price*quantity

	let fee = 0
  	if(agent.strategy == 1)
    	fee = agent.fee *  quantity
  	else if(agent.strategy == 2)
    	fee = agent.fee
  	else if(agent.strategy == 3)
		fee = (cost * agent.fee)/100.0

	fee = (!!agent.fee_min && agent.fee_min> 0 && fee<agent.fee_min)?agent.min_fee:fee
	fee = (!!agent.fee_max && agent.fee_max> 0 && fee>agent.fee_max)?agent.fee_max:fee

	return {
		cost,
		fee,
		amount:cost + fee
	}
} 

export default {
	agentAmount
}