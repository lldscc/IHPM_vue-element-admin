const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
// 对vuex的getters进行了简单的封装，向外暴露，方便在组件中使用
