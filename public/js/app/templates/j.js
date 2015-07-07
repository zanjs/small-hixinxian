/**
 * Created by Administrator on 2015/4/7.
 */
var Shopcart = Shopcart || {
        saveToSessionStorage : function(shopcart, storeId) {
            if(storeId) {
                shopcart.storeId = storeId;
            }
            sessionStorage.setItem('currentShopcart', JSON.stringify(shopcart));
        },

        getFromSessionStorage : function() {
            return JSON.parse(sessionStorage.getItem('currentShopcart'));
        },

        /**
         * 获取购物车的唯一标识（由客户端唯一确定）
         */
        getUuid : function() {
            var cartUuid = localStorage.getItem('cartUuid');
            if (cartUuid == null) {
                cartUuid = UUID.prototype.createUUID();
                localStorage.removeItem('cartUuid');
                localStorage.setItem('cartUuid', cartUuid);
            }
            return cartUuid;
        },

        /**
         * 根据门店加载购物车信息，如果sessionStorage中不存在，则从后台加载
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param callback 可选，执行完成后的回调函数，带一个参数shopcart：返回的完整购物车对象
         */
        get : function(addressCoor, store, callback, isRefresh) {
            shopcart = Shopcart.getFromSessionStorage();

            if(!shopcart || shopcart.storeId != store.storeId) {
                // sessionStorage中购物车为空或者不是门店的购物车则要刷新
                Shopcart.reload(addressCoor, store, callback);
            } else {
                typeof callback === 'function' && callback(shopcart);
            }
        },

        /**
         * 从后台获取数据，刷新购物车
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param callback 可选，执行完成后的回调函数，带一个参数shopcart：返回的完整购物车对象
         */
        reload : function(addressCoor, store, callback) {
            var params = {
                "functionId": "cart/query",
                // "pin": util.getCookiePin(),
                "bizType": 3,
                "body": JSON.stringify({
                    "cartUuid": Shopcart.getUuid(),
                    "lng": addressCoor.longitude,
                    "lat": addressCoor.latitude,
                    "storeId": store.storeId,
                    "positionType": 2,
                    "isReturnCart": true
                })
            };

            Pdj.invoke(params, {
                success : function(result) {
                    Shopcart.saveToSessionStorage(result, store.storeId);
                },
                complete : function() {
                    typeof callback === 'function' && callback(Shopcart.getFromSessionStorage());
                }
            });
        },

        /**
         * 添加商品
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param skus 商品数组，如[{id:12345,num:3},{id:33333,num:1}]
         * @param successCallback 可选，执行成功回调函数，带一个参数shopcart：返回的完整购物车对象
         * @param failureCallback 可选，执行失败回调函数，带一个参数msg：返回的错误信息
         */
        addSkus : function(addressCoor, store, skus, successCallback, failureCallback) {
            var params = {
                "functionId": "cart/addItem",
                // "pin": util.getCookiePin(),
                "body": JSON.stringify({
                    "cartUuid": Shopcart.getUuid(),
                    "skus": skus,
                    "storeId": store.storeId,
                    "positionType": 2,
                    "lng": addressCoor.longitude,
                    "lat": addressCoor.latitude,
                    "isReturnCart": true
                })
            };

            Pdj.invoke(params, {
                success : function(result) {
                    Shopcart.saveToSessionStorage(result, store.storeId);
                    typeof successCallback === 'function' && successCallback(result);
                }, failure : failureCallback
            });
        },

        /**
         * 修改商品数目
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param skus 商品数组，如[{id:12345,num:3},{id:33333,num:1}]
         * @param successCallback 可选，执行成功回调函数，带一个参数shopcart：返回的完整购物车对象
         */
        changeSkusNum : function(addressCoor, store, skus, successCallback, failureCallback) {
            var params = {
                "functionId": "cart/changeItemNum",
                // "pin": util.getCookiePin(),
                "body": JSON.stringify({
                    "cartUuid": Shopcart.getUuid(),
                    "skus": skus,
                    "storeId": store.storeId,
                    "positionType": 2,
                    "lng": addressCoor.longitude,
                    "lat": addressCoor.latitude,
                    "isReturnCart": true
                })
            };

            Pdj.invoke(params, {
                success : function(result) {
                    Shopcart.saveToSessionStorage(result, store.storeId);
                    typeof successCallback === 'function' && successCallback(result);
                }, failure : failureCallback
            });
        },

        /**
         * 删除商品
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param skus 商品数组，如[{id:12345},{id:33333}]
         * @param successCallback 可选，执行成功回调函数，带一个参数shopcart：返回的完整购物车对象
         */
        removeSkus : function(addressCoor, store, skus, successCallback, failureCallback) {
            var params = {
                "functionId": "cart/removeItem",
                // "pin": util.getCookiePin(),
                "body": JSON.stringify({
                    "cartUuid": Shopcart.getUuid(),
                    "skus": skus,
                    "storeId": store.storeId,
                    "positionType": 2,
                    "lng": addressCoor.longitude,
                    "lat": addressCoor.latitude,
                    "isReturnCart": true
                })
            };

            Pdj.invoke(params, {
                success : function(result) {
                    Shopcart.saveToSessionStorage(result, store.storeId);
                    typeof successCallback === 'function' && successCallback(result);
                }, failure : failureCallback
            });
        },

        /**
         * 选中商品
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param skus 商品数组，如[{id:12345},{id:33333}]
         * @param successCallback 可选，执行成功回调函数，带一个参数shopcart：返回的完整购物车对象
         */
        checkSkus : function(addressCoor, store, skus, successCallback, failureCallback) {
            var params = {
                "functionId": "cart/checkItem",
                // "pin": util.getCookiePin(),
                "body": JSON.stringify({
                    "cartUuid": Shopcart.getUuid(),
                    "skus": skus,
                    "storeId": store.storeId,
                    "positionType": 2,
                    "lng": addressCoor.longitude,
                    "lat": addressCoor.latitude,
                    "isReturnCart": true
                })
            };

            Pdj.invoke(params, {
                success : function(result) {
                    Shopcart.saveToSessionStorage(result, store.storeId);
                    typeof successCallback === 'function' && successCallback(result);
                }, failure : failureCallback
            });
        },

        /**
         * 反选商品
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param skus 商品数组，如[{id:12345},{id:33333}]
         * @param successCallback 可选，执行成功回调函数，带一个参数shopcart：返回的完整购物车对象
         */
        uncheckSkus : function(addressCoor, store, skus, successCallback, failureCallback) {
            var params = {
                "functionId": "cart/uncheckItem",
                // "pin": util.getCookiePin(),
                "body": JSON.stringify({
                    "cartUuid": Shopcart.getUuid(),
                    "skus": skus,
                    "storeId": store.storeId,
                    "positionType": 2,
                    "lng": addressCoor.longitude,
                    "lat": addressCoor.latitude,
                    "isReturnCart": true
                })
            };

            Pdj.invoke(params, {
                success : function(result) {
                    Shopcart.saveToSessionStorage(result, store.storeId);
                    typeof successCallback === 'function' && successCallback(result);
                }, failure : failureCallback
            });
        },

        /**
         * 选中全部商品
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param successCallback 可选，执行成功回调函数，带一个参数shopcart：返回的完整购物车对象
         */
        checkAll : function(addressCoor, store, successCallback, failureCallback) {
            var params = {
                "functionId": "cart/checkAllItems",
                // "pin": util.getCookiePin(),
                "body": JSON.stringify({
                    "cartUuid": Shopcart.getUuid(),
                    "storeId": store.storeId,
                    "positionType": 2,
                    "lng": addressCoor.longitude,
                    "lat": addressCoor.latitude,
                    "isReturnCart": true
                })
            };

            Pdj.invoke(params, {
                success : function(result) {
                    Shopcart.saveToSessionStorage(result, store.storeId);
                    typeof successCallback === 'function' && successCallback(result);
                }, failure : failureCallback
            });
        },

        /**
         * 反选全部商品
         * @param addressCoor 地址坐标
         * @param store 门店
         * @param successCallback 可选，执行成功回调函数，带一个参数shopcart：返回的完整购物车对象
         */
        uncheckAll : function(addressCoor, store, successCallback, failureCallback) {
            var params = {
                "functionId": "cart/uncheckAllItems",
                // "pin": util.getCookiePin(),
                "body": JSON.stringify({
                    "cartUuid": Shopcart.getUuid(),
                    "storeId": store.storeId,
                    "positionType": 2,
                    "lng": addressCoor.longitude,
                    "lat": addressCoor.latitude,
                    "isReturnCart": true
                })
            };

            Pdj.invoke(params, {
                success : function(result) {
                    Shopcart.saveToSessionStorage(result, store.storeId);
                    typeof successCallback === 'function' && successCallback(result);
                }, failure : failureCallback
            });
        }
    };