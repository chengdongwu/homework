一
    var a = []
    for(var i=0;i<10;i++){
        a[i] =function(){
            console.log(i)
        }
    }
    a[6]()

    执行结果是 输出10

    原因是因为 var有变量提升的效果,虽然在for循环里面定义i  但是i其实是全局变量,for循环之后 i的值是10,虽然闭包执行了a[6],但是打出的还是全局变量i的值10

二
    var tem = 123
    if(true){
        console.log(tem)
        let tem
    }

    执行结果是 未定义的tem报错
    原因是 虽然全局变量定义了tem,但是let有暂时性死区的概念,在if作用域里,已经使用 let 定义了 tem,在之前使用tem会报tem未定义的错误

三
    var arr = [12, 34, 32, 89, 4]

    arr.sort((a,b)=>a-b)[0]


四 
    var  存在变量提升的特性,而let和const不存在这个特性
    let和const会生成块作用域,只能在当前的代码块使用该变量
    const初始化需赋值,当值是基础类型时,变量不能改,当时引用类型时,const存储的只是引用地址,可以修改引用地址的属性
    let和const不能声明同名变量,而var可以

五
    var a = 10
    var obj = {
        a: 20,
        fn () {
            setTimeout(()=>{
                console.log(this.a)
            })
        }
    }
    obj.fn()

    输出的结果是 20
    原因的因为 执行setTimeout是window,this的指向是全局作用域的a也就是全局作用域的a,但是代码里面使用箭头函数执行的方法,箭头函数的this指向当前作用域的this,因此是obj里面的a 20

六

Symbol 可以避免对象的key产生冲突,产生独一无二的值 ,可以为对象加一个私有属性

七

浅拷贝,只是复制了对象的内存地址,改变复制的对象,会改变原对象
深拷贝,把对象复制了一份生成了新的内存地址,两个对象是相互独立的对象,改变哪一个都不会改变另外一个

八
Typescript 是javascript 的超集, 可以在ts里面使用原生的js语法,ts需要编译,提供了强类型和更多面向对象的内容.ts最终还是要编译成弱类型语言js,然后在运行.

九
ts 优点是可以规范程序员的代码,使在大型项目中减少莫名问题的出现,增加了代码的可读性和可维护性
对js非常的包容,普通的js文件可以直接改成ts
ts 的缺点
    有一定的学习成本,需要了解一些面向对象的语法
    初期开发需要一些开发成本
    可能和一些库不兼容

十
引用计数用来记录当前有多少指针指向同一块动态分配的内存。当有指针指向这块内存时，计数器加1；当指向此内存的指针销毁时，计数器减1。当引用计数为0时，表示此块内存没有被任何指针指向，此块被共享的动态内存才能被释放。
优点
发现垃圾立即回收
最大限度的减少程序暂停
缺点
无法回收循环引用的对象
时间开销大

十一
标记整理分为标记阶段和清除阶段
标记阶段和标记清除一致 标记所有活动对象
清除阶段先执行整理,移动对象的位置,在进行清除,可以说解决标记清除内存碎片化的问题

十二
采用复制算法和标记整理的方式
新生代的存储区域一分为二,且是等分
两个空间中使用空间是from,空闲空间是to
当from的内存快要用完时,触发标记整理
把from的活动对象复制到to,把from的空间释放掉,使from和to交换空间完成释放
一轮GC还存在的对象,晋升到老生代
to空间的使用率超过25%,把to的对象移动到老生代

十三
    当开始老生代垃圾回收时,先遍历对象进行标记,但这个标记不是一次性标记所有的对象,
    因为有的对象直接可达,有的对象间接可达,对象直接可达的进行标记,然后让程序执行一会,
    开始增量标记算法
    GC进行二次标记,有一些子元素也是可达的,标记这些元素,然后让程序执行,交替执行,标记操作完成之后
    结束增量标记
    开始正常的垃圾回收,让程序暂停


