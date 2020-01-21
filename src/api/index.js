import http from '../util/Request';
import { host } from '../res/data/config';

export default {
  /**
   * @description 获取七牛云上传 token
   * @returns {*|Promise}
   */
  get7nToken() {
    return http.get(`${host}/upload/getToken`);
  },

  /**
   * @description 登录
   * @param mobile 手机号码
   * @param password 登陆密码
   * @returns {void | *}
   */
  login({ mobile, password }) {
    return http.post(`${host}/user/login`, { mobile, password })
  },

  /**
   * @description 获取用户信息
   */
  getUserInfo () {
    return http.get(`${host}/user/userInfo`)
  },

  /**
   * @description 获取账户统计信息
   */
  getUserTotalInfo() {
    return http.get({
      url: `${host}/user/totalInfo`
    })
  },

  /**
   * @description 收藏状态查询
   * @param itemId
   * @param objectId
   * @param typeId
   * @returns {*|Promise}
   */
  getCollectState ({ itemId, typeId, objectId = 1 }) {
    return http.get({
      url: `${host}/collect/${itemId}?typeId=${typeId}&objectId=${objectId}`
    })
  },

  /**
   * @description 添加收藏
   * @param itemId
   * @param typeId
   * @param objectId
   * @returns {*|Promise}
   */
  addCollect ({ itemId, typeId, objectId = 1 }) {
    return http.post({
      url: `${host}/collect?typeId=${typeId}&objectId=${objectId}`,
      data: {
        itemId
      }
    });
  },

  /**
   * @description 删除收藏
   * @param recordId
   * @returns {*|Promise}
   */
  removeCollect ({ recordId }) {
    return http.delete({
      url: `${host}/collect/${recordId}`
    })
  },

  /**
   * @description 获取当天签到状态
   * @returns {*|Promise}
   */
  getCheckinStatus () {
    return http.get(`${host}/checkin`)
  },

  // 获取闲置商品分类
  getXzProduct(categoryId = 1, pageSize = 10, pageIndex = 0) {
    return http.get({
      url: `${host}/xzProduct`,
      data: {
        categoryId,
        pageIndex,
        pageSize
      }
    });
  },

  /**
   * @description 获取闲置商品分类
   */
  getXzCategoryList () {
    return http.get({
      url: `${host}/xzCategory`
    })
  },

  /**
   * @description 获取闲置商品详情
   * @param productId
   * @returns {*|Promise}
   */
  getXzProductDetail(productId) {
    return http.get({
      url: `${host}/xzProduct/${productId}`
    });
  },

  /**
   * @description 发布宝贝
   * @param params
   * @returns {*|Promise}
   */
  addXzProduct(params: any) {
    return http.post({
      url: `${host}/xzProduct`,
      data: params
    })
  },

  /**
   * @description 更新商品信息
   * @param itemId
   * @param params
   * @returns {*|Promise}
   */
  updateXzProduct (itemId, params) {
    return http.post({
      url: `${host}/xzProduct/${itemId}`,
      data: params
    })
  },

  /**
   * @description 获取用户发布的闲置
   * @param params
   * @returns {*|Promise}
   */
  getUserXzProduct(params) {
    return http.get({
      url: `${host}/user/xzProduct`,
      data: params
    })
  },

  /**
   * @description 获取评论
   * @param productId
   * @returns {*|Promise}
   */
  getCommentList(productId) {
    return http.get({
      url: `${host}/comment?itemId=${productId}&typeId=1`
    });
  },

  /**
   * @description 增加评论
   * @param itemId
   * @param content
   * @param talkTo
   * @param typeId
   * @param parentId
   * @returns {*|Promise}
   */
  addComment({ itemId, content, talkTo, typeId, parentId }: any) {
    return http.post({
      url: `${host}/comment?itemId=${itemId}`,
      data: {
        talkTo,
        typeId,
        content,
        parentId
      }
    })
  },

  /**
   * @description 获取我的关注
   * @returns {*|Promise}
   */
  getMyFollow() {
    return http.get({
      url: `${host}/follow`
    })
  },

  /**
   * @description 增加关注
   * @param followId 被关注者的ID
   * @returns {*|Promise}
   */
  addFollow(followId) {
    return http.post({
      url:  `${host}/follow`,
      data: {
        followId
      }
    })
  },

  /**
   * @description 取消关注
   * @param followId
   * @returns {*|Promise}
   */
  removeFollow(followId) {
    return http.delete({
      url: `${host}/follow/${followId}`
    })
  },

  /**
   * @description 获取搜藏列表
   * @returns {*|Promise}
   */
  getCollectList() {
    return http.get({
      url: `${host}/collect`
    })
  },

  /**
   * @description 获取积分流水
   * @returns {*|Promise}
   */
  getPointInfo() {
    return http.get({
      url: `${host}/point/list`
    })
  },

  /**
   * @description 获取我的地址
   * @returns {*|Promise}
   */
  getMyAddress() {
    return http.get({
      url: `${host}/deliveryAddress`
    })
  },

  /**
   * @description 获取顺丰城市
   * @returns {*|Promise}
   */
  getSfCity() {
    return http.get({
      url: `${host}/sfCity`
    })
  },

  /**
   * @description 新增地址
   * @param params
   * @returns {*|Promise}
   */
  addAddress(params) {
    return http.post({
      url: `${host}/deliveryAddress`,
      data: params
    })
  },

  /**
   * @description 删除地址
   * @param id
   * @returns {*|Promise}
   */
  removeAddress(id) {
    return http.delete({
      url: `${host}/deliveryAddress/${id}`
    })
  },

  /**
   * @description 修改地址
   * @param params
   */
  updateAddress(params){
    return http.post({
      url: `${host}/deliveryAddress/${params.id}`,
      data: params
    })
  },

  // 获取用户信息
  getUserInfo() {
    return http.get(`${host}/user/userInfo`)
  }
}
