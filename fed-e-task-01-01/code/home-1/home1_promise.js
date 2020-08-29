setTimeout(() => {
    var a = 'hello'
    console.log(1)
    setTimeout(() => {
        var b = 'lagou'
        console.log(2)
        setTimeout(() => {
            var c = 'I ♥ U'
            console.log(a + b + c)
        }, 10);
    }, 10);
}, 10);

let a =new Promise((resole,reject)=>{
    resole('hello')
})

a.then((value)=>{
    return value+'lagou'
  }).then((value)=>{
    console.log(value+'I ♥ U')
  })