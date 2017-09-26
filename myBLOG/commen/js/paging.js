/**
 * param arr:总条数
 * param page:页数
 * param pagenum:每页几条
 * param total:总页数
 */

module.exports = (arr,page,pageNum)=>{
	let total=Math.ceil(arr.length/pageNum),a;
	if(page>total || arr.length===0)return {state:true,data:[],total:total};
	let first=(page-1)*pageNum;
	a=first+pageNum<arr.length?arr.slice(first,first+pageNum):arr.slice(first)
	return {state:true,data:a,total:total}
};