
const NewPromise = require('./promise')

function p1 (){
    return new NewPromise((resole,reject)=>{
        setTimeout(() => {
            resole('p1')
        }, 2000);
    })
}

function p2 (){
    return new NewPromise((resole,reject)=>{
        // resole('p2')
        reject('失败')
    })
}

p2().then((value)=>{
    console.log(value)
}).catch(reason => console.log(reason))

