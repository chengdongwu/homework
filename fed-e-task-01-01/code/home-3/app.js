const fp = require('lodash/fp');

const {Maybe, Container} =  require('./support') 

let maybe = Maybe.of([5,6,1])
let ex1 = () =>{
  return maybe.map((x)=>{
    return fp.map(fp.add(1), x)
  })
}

console.log('ex1', ex1())


let xy = Container.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 = () =>{
  return xy.map((x)=>{
    return fp.first(x)
  })
}

console.log('ex2', ex2())

let safeProp = fp.curry((x, o)=>{
  return Maybe.of(o[x])
})
let user = {id: 2,name: 'Albert'}
 
let ex3 = ()=>{
  return safeProp('name')(user).map((v)=>fp.first(v))
}
console.log('ex3', ex3())

let ex4 = (n)=>{
  return Maybe.of(n).map((v)=> parseInt(v))
}
console.log('ex4', ex4('2.2'))