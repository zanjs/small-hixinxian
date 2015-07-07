/**
 * Created by Administrator on 2015/5/6.
 */

/**
 * 首页入口
 * addCoupon(a) a-> 优惠券m
 */
function addCoupon(a){
    var v = a,
        l= "739863b98fe54d2f93c80f4157401f16";
    var reg = /^[\da-z]+$/i;
    var v2 = v.substring(0,2);
    console.log(v2);
    if(!reg.test(v)){
        layer.msg("不是合格的");
        return false;
    }else if(v2 != "YH"){
        layer.msg("不是合格的22");
        return false;
    }

    if(confirm("您添加的优惠券码是---："+ v)){

    }else{

    }
}

//已下借鉴php 优雅代码命名规范
/**
 * Show the form for creating a new resource.
 * 创建
 * @return Response
 */
function create(a){

}

/**
 * Store a newly created resource in storage.
 * 存储
 * @return Response
 */
function store(a){

}

/**
 * Display the specified resource.
 * 展现
 * @param  int  $id
 * @return Response
 */
function show(a){

}

/**
 * Show the form for editing the specified resource.
 * 编辑
 * @param  int  $id
 * @return Response
 */
function edit(a){
    //

}

/**
 * Update the specified resource in storage.
 * 更新
 * @param  int  $id
 * @return Response
 */
function update(a ,b,c){

}

/**
 * Remove the specified resource from storage.
 * 删除
 * @param  int  $id
 * @return Response
 */
function destroy(a){
    //

}