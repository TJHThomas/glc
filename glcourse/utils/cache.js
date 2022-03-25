/** 
* 设置异步缓存
* @data object格式的要存入缓存的数据
*/
function setCacheSync(key, value) {
  const oldStorage = wx.getStorageSync(key)
  const haveStorage = oldStorage == "" ? false : true
  if (!haveStorage) {
    _handlerHaventStorSync(key, value)
  }else{
    _handlerHaveStorSync(key, value, oldStorage)
  }
}

/** 
* 有异步缓存的话，则要对比新旧缓存有无不同，如果有就要更新，没有就不更新
* @key 要设置的键
* @value 要设置的值
* @oldStorage 旧的缓存值
*/
function _handlerHaveStorSync(key, value, oldStorage) {
  const newStorage = value
  if (oldStorage != newStorage) {
    wx.setStorageSync(key, newStorage)
  }
}

/** 
* 没有异步缓存的话，直接设置
* @key 要设置的键
* @value 要设置的值
*/
function _handlerHaventStorSync(key, value) {
  wx.setStorageSync(key, value)
}

/** 
* 获取对应键的异步缓存
* @key 要获取异步缓存的键
* @return 键的值
*/
function getCacheSync(key) {
  return wx.getStorageSync(key)
}

/** 
* 删除对应键的异步缓存
* @key 要删除的缓存的键
*/
function deleteCache(key) {
  wx.removeStorageSync(key)
}

/** 
* 删除多个异步缓存，可传入任意字符串作为键
*/
function deleteMultipleCache() {
  Array.from(arguments).forEach((value)=>{
    wx.removeStorageSync(value)
  })
}

export {
  setCacheSync,
  getCacheSync,
  deleteCache,
  deleteMultipleCache,
}