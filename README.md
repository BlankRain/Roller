# Roller

## 前言

web的本质是路由

/a/b/c  => function(request){ return response}

对于一个URL,有一个Router 来处理对应的请求.这样就有一个Web服务器了.

至于你是基于多线程还是事件,又是怎样的调用链,或者生命周期,这就是实现上的差异了.

但就抽象上来讲, URL => handler(request){repsone}

这就是web的本质(因为它其实是个lambda算子)

关于web我有一个自己的理解,不能说全新也不能说最好.我想把我的理解记录表述下来,于是就有这个项目.

对于 /a/b/c 这么一个路径, 它是由 a,b,c三个节点, a=>b, b=>c,两条关系作为基础,/a/b/c代表了一个树的访问路径.

Path或者路径这个概念,图论里本来就有. 我这里延续了图论里路径的概念. /a/b/c 我没有把它当一个字符串,或者说一个有模式的字符串. 而是,当做图论里图的访问结构. /a/b/c 可以看做,先访问了a节点,再访问b节点,再访问c节点. 甚至有种状态机的感觉.

这也是我这个项目的想法.

## 一些想法
- 节点是无状态的,可复用的,是一个处理单元
- 路由是Path结构
- 边可以传递属性信息

## 期待的写法

Node a(){
    GET:()=>{

    },
    POST:()=>{

    },
    DELETE:()=>{

    },
    PUT:()=>{

    }
}

Node b(){
    GET:()=>{

    },
    POST:()=>{

    },
    DELETE:()=>{

    },
    PUT:()=>{

    }
}
Node c(){
    GET:()=>{

    },
    POST:()=>{

    },
    DELETE:()=>{

    },
    PUT:()=>{

    }
}

// /a/b/c

R.start(a).to(b).to(c).build()

// /a/b/:c

R.start(a).to(b).with(IDMather).to(c).build()

// GET /a/b/c

R.with(GET).start(a).to(b).with(IDMather).to(c).build()

当然，上面的好像也不是很直观,会考虑设计更简洁的语法糖.

比如这种: (-> a b c) 或者 a -GET-> b -POST-> c

但思路基本就是,通过声明式无状态函数式的图结构来细粒度的路由组合编程. 这是我的想法.