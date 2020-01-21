// import { host } from '../config'
// import http from '../utils/http'
const host = 'httts';
const http = {
  get
};

export default {
  /**
   * @description 获取七牛云上传token
   */
  get7nToken () {
    return http.get(`${host}/upload/getToken`)
  },

  /**
   * @description 登录
   * @param param0
   */
  login (
    { mobile, password }: { mobile: string, password: string }
  ) {
    return http.post(`${host}/user/login`, { mobile, password })
  },

  /**
   * @description 获取用户信息
   */
  getUserInfo () {
    return http.get(`${host}/user/userInfo`)
  },

  /**
   * @description 获取指定用户的信息
   * @param param0
   */
  getUserProfile ({ uid }: { uid : string }) {
    return http.get(`${host}/user/profile?uid=${uid}`)
  },

  // 更新用户信息
  updateUserInfo (params: any) {
    return http.post(`${host}/user/userInfo`, params)
  },

  // 获取当天签到状态
  getCheckinStatus () {
    return http.get(`${host}/checkin`)
  },

  // 签到
  checkin () {
    return http.post(`${host}/checkin`)
  },

  // 获取签到信息
  getCheckinList () {
    return http.get(`${host}/checkin/list`)
  },

  // 查询用户积分
  getPointList () {
    return http.get(`${host}/point/list`)
  },

  // 获取收货地址
  getdeliveryAddressList () {
    return http.get(`${host}/deliveryAddress`)
  },

  // 获取需求列表
  getDemandList (params: any) {
    return http.get(`${host}/demand`, {
      params
    })
  },

  // 获取我的收藏
  getCollect ({ typeId = 1, objectId }: { typeId: any, objectId: any }) {
    return http.get(`${host}/collect?typeId=${typeId}&objectId=${objectId}`)
  },

  // 添加收藏
  addCollect ({ itemId, objectId, typeId = 1 }: any) {
    return http.post(`${host}/collect?typeId=${typeId}&objectId=${objectId}`, {
      itemId
    })
  },

  // 删除收藏
  removeCollect ({ recordId }: any) {
    return http.delete(`${host}/collect/${recordId}`)
  },

  // 收藏状态查询
  getCollectState ({ itemId, typeId = 1, objectId }: any) {
    return http.get(
      `${host}/collect/${itemId}?typeId=${typeId}&objectId=${objectId}`
    )
  },

  // 获取聊天信息
  getChatList () {
    return http.get(`${host}/chat`)
  },

  // 获取聊天信息
  getChatItem ({ partnerId }: any) {
    return http.get(`${host}/chat/${partnerId}`)
  },

  // 获取顺丰城市
  getSfCityList () {
    return http.get(`${host}/sfCity`)
  },

  // 添加收货地址
  addAddress ({
                address,
                mobile,
                street,
                username,
                city,
                province,
                district,
                zip,
                provinceCode,
                cityCode,
                districtCode
              }: any) {
    console.log(provinceCode, cityCode, districtCode)
    return http.post(`${host}/deliveryAddress`, {
      address,
      mobile,
      street,
      username,
      city,
      province,
      district,
      zip,
      provinceCode,
      cityCode,
      districtCode
    })
  },

  removeAddress ({ id }: any) {
    return http.delete(`${host}/deliveryAddress/${id}`)
  },

  /**
   * @description 修改地址
   * @param params
   */
  updateAddress (params: any) {
    return http.post(`${host}/deliveryAddress/${params.id}`, params)
  },

  register ({ mobile, password }: any) {
    return http.post(`${host}/user/register`, { mobile, password })
  },

  checkLogin () {
    return http.get(`${host}/user/checkLogin`)
  },

  // 评论 ---------------------------------------------------------------------------------
  // 获取评论
  getComment ({ itemId, typeId }: any) {
    return http.get(`${host}/comment?itemId=${itemId}&typeId=${typeId}`)
  },
  // 增加评论
  addComment ({ itemId, content, talkTo, typeId, parentId }: any) {
    return http.post(`${host}/comment?itemId=${itemId}`, {
      talkTo,
      typeId,
      content,
      parentId
    })
  },

  // 用户关注模块 -------------------------------------------------------------------------
  // 获取我的关注
  getFollowList () {
    return http.get(`${host}/user/follow`)
  },
  // 添加关注
  addFollow ({ followId }: any) {
    return http.post(`${host}/user/follow`, {
      followId
    })
  },
  // 取消关注
  removeFollow ({ followId }: any) {
    return http.delete(`${host}/user/follow/${followId}`)
  },

  /**
   * 发布闲置
   * @param params
   */
  addXzProduct(params: any) {
    return http.post(`${host}/xzProduct`, params)
  },

  /**
   * @description 获取闲置商品
   */
  getXzProductList (params?: any) {
    const argv = params
    const categoryId = argv ? (argv.categoryId || '') : ''
    return http.get(`${host}/xzProduct?categoryId=${categoryId}`)
  },

  /**
   * @description 获取闲置商品详情
   * @param itemId
   */
  getXzProductItem (itemId: any) {
    return http.get(`${host}/xzProduct/${itemId}`)
  },

  /**
   * @description 创建 xzProduct
   * @param params
   */
  createXzProduct (params: object) {
    return http.post(`${host}/xzProduct/`, params)
  },

  /**
   * @description 更新
   * @param params
   */
  updateXzProduct (params: any) {
    return http.post(`${host}/xzProduct/${params.itemId}`, params)
  },

  /**
   * @description 获取我的 xzProduct
   */
  getMyProduct () {
    return http.get(`${host}/user/xzProduct`)
  },

  /**
   * @description 获取闲置商品分类
   */
  getXzCategorytList () {
    return http.get(`${host}/xzCategory`)
  },

  /**
   * @description 获取账户统计信息
   */
  getUserTotalInfo() {
    return http.get(`${host}/user/totalInfo`)
  },

  /**
   * @description 关键词搜索
   * @param param0
   */
  getXzProductByKey({ key }: any) {
    return http.get(`${host}/xzProduct/search?keyword=${key}`)
  }
}
