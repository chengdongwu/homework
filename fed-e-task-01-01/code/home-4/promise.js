
class NewPromise {
    // 构造函数，立即执行函数
    constructor(exect){
        try {
            exect(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    status = 'pending'
    value = undefined
    reason = undefined
    successCallBack = []
    failCallBack = []

     // 成功执行函数
     resolve = (value)=>{
         // 状态不是pending 直接停止函数执行
        if(this.status !== 'pending') return
        this.value = value
        this.status = 'fullfilled'
        while(this.successCallBack.length) this.successCallBack.shift()()
    }

    // 失败执行函数
    reject = (reason)=>{
        // 状态不是pending 直接停止函数执行
        if(this.status !== 'pending') return
        this.reason = reason
        this.status = 'reject'

        while(this.failCallBack.length) this.failCallBack.shift()()
    }

    then(successCallBack, failCallBack){
        successCallBack = successCallBack? successCallBack : value => value
        failCallBack = failCallBack? failCallBack : reason => {throw reason}
        let promise1 = new NewPromise((resolve, reject)=>{
            if(this.status === 'fullfilled'){
                setTimeout(() => { // 防止promise1 没有值
                    try {
                        let x =successCallBack(this.value)
                        resolvePromise(x, promise1, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);                                                                                                                      
            } else if (this.status === 'reject') {
                setTimeout(() => { // 防止promise1 没有值
                    try {
                        let x =failCallBack(this.reason)
                        resolvePromise(x, promise1, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);  
            } else { // 异步逻辑
                this.successCallBack.push(()=>{
                    setTimeout(() => { // 防止promise1 没有值
                        try {
                            let x =successCallBack(this.value)
                            resolvePromise(x, promise1, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);   
                })
                this.failCallBack.push(()=>{
                    setTimeout(() => { // 防止promise1 没有值
                        try {
                            let x =failCallBack(this.reason)
                            resolvePromise(x, promise1, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);  
                })   
            }
        })
        return promise1
    }

    finally (callback){
        //使用then 获取成功失败回调
        return this.then((value)=>{
           return NewPromise.resolve(callback()).then(()=>value)
        },(reason)=>{
            return NewPromise.resolve(callback()).then(()=>{throw reason})
        })
    }
    catch (failCallBack){
       return this.then(undefined, failCallBack)
    }

    static all (array){
        let result = []
        let index = 0
        return new NewPromise((resolve,reject)=>{
            function addDate (key , value) {
                result[key] = value
                index++
                if(index === array.length){
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if(current instanceof NewPromise){
                    // promise
                    current.then(value=>{
                        addDate(i, value)
                    },reason=>{
                        reject(reason)
                    })
                }else {
                    // 普通值
                    addDate(i, current)
                }
            }
        })
    }

    static resolve(value){
        if(value instanceof NewPromise){
            return value
        } else {
            return new NewPromise((resole)=>{
                resole(value)
            })
        }
    }
}

/* 封装公共方法
    判断 x 的值是普通值还是promise对象
    如果是普通值 直接调用resolve 
    如果是promise对象 查看promsie对象返回的结果 
    再根据promise对象返回的结果 决定调用resolve 还是调用reject
*/
function resolvePromise(x, promise1, resolve, reject){
    if(x == promise1){
        return reject(new TypeError('Chaning cycle detected for promise  #<Promise>'))
    }
    if(x instanceof NewPromise){
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

module.exports =  NewPromise