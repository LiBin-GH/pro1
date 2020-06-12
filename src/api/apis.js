import axios from 'axios'



axios.defaults.baseURL = 'http://localhost:5000'


// 登录接口  account: 用户名   password：密码
export const login = (account,password) => axios.post('/users/checkLogin',{account,password})

// 添加账号接口  accAdd: 用户名   password：密码   userGroup：用户组
export const accAdd = (account,password,userGroup) => axios.post('/users/add',{account,password,userGroup})

// 账号列表接口  currentPage: 当前页码   pageSize  每页条数  
export const acclist = (currentPage,pageSize) => axios.get('/users/list',{params:{currentPage,pageSize}})

// 账号删除接口  id  要删除账号的id 
export const accdel = (id) => axios.get('/users/del',{params:{id}})

// 批量删除账户
export const accsdel = (ids) => axios.get('/users/batchdel',{params:{ids}})

// 密码账户接口  id  要修改账号的id  
export const edit = (id,account,userGroup) => axios.post('/users/edit',{id,account,userGroup})

//检查旧密码接口  oldPwd 旧密码   id 账号id
export const checkpwd = (oldPwd,id) => axios.get('/users/checkoldpwd',{params:{oldPwd,id}})

//修改密码  newPwd 旧密码   id 账号id
export const editpwd = (newPwd,id) => axios.post('/users/editpwd',{newPwd,id})

//获取账号信息
export const getinfo = (id) => axios.get('/users/accountinfo',{params:{id}})

//头像上传接口
export const headupload = (id) => axios.post('/users/avatar_upload',{id})

//验证token是否过期
export const checktoken = (token) => axios.get('/users/checktoken',{params:{token}})

//添加分类接口
export const addcate = (cateName,state) => axios.post('/goods/addcate',{cateName,state})

// 商品列表接口  currentPage: 当前页码   pageSize  每页条数  
export const goodslist = (currentPage,pageSize) => axios.get('/goods/list',{params:{currentPage,pageSize}})

//获取商品分类
export const goodscatelist = (currentPage,pageSize) => axios.get('/goods/catelist',{params:{currentPage,pageSize}})

//删除商品分类
export const goodsdelcate = (id) => axios.get('/goods/delcate',{params:{id}})

//修改分类接口
export const editcate = (id,cateName,state) => axios.post('/goods/editcate',{id,cateName,state})

//删除商品
export const goodsdel = (id) => axios.get('/goods/del',{params:{id}})

//添加商品
export const addgoods = (name,category,price,imgUrl,goodsDesc) => axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

//编辑商品
export const editgoods = (name,category,price,imgUrl,goodsDesc,id) => axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id})

//查询分类名称
export const getcatename = () => axios.get('/goods/categories')

//获取店铺详情
export const getstoreinfo = () => axios.get('/shop/info')

//店铺内容修改接口
export const shopedit = (id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,pics,date) => axios.post('/shop/edit',{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,pics,date})

//订单报表接口
export const ordertotal = (date) => axios.get('/order/ordertotal',{params:{date}})

//获取订单列表
export const orderlist = (currentPage,pageSize,orderNo,consignee,phone,orderState,date) => axios.get('/order/list',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})

//修改订单
export const orderedit = (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState) => axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})

//订单查询
// export const ordersearch = (currentPage,pageSize,orderNo,consignee,phone,orderState,date)






























//数据获取接口
export const gettotaldata  = () => axios.get('/order/totaldata')