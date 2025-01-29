import auth from './auth';
const home = {
  title: '首页',
  slogan: '今天想吃些什么呢？😊'
};

const recipe = {
  title: '食谱'
};

const message = {
  title: '消息'
};

const profile = {
  title: '我的',
  setting: {
    title: '设置',
    signOut: '退出登录',
    language: {
      title: '语言',
      auto: '跟随系统',
      zh: '中文',
      en: '英文'
    },
    theme: {
      title: '主题',
      auto: '跟随系统',
      light: '浅色模式',
      dark: '深色模式'
    },
    color: {
      title: '主题色',
      default: '默认',
      orange: '橙色',
      red: '红色',
      violet: '紫色',
      indigo: '靛蓝色',
      blue: '蓝色',
      teal: '青色',
      cyan: '青色',
      green: '绿色',
      lime: '酸橙色',
      olive: '橄榄色',
      brown: '棕色'
    }
  }
};

const create = {
  dish: '创建菜品',
  recipe: '创建食谱'
};

const Chinese = {
  startTip: '登录或注册开始使用',

  common: {
    enter: '请输入',
    next: '下一步',
    confirm: '确认',
    cancel: '取消',
    captcha: '验证码',
    email: '邮箱',
    name: '用户名',
    captchaLength: '6 位验证码',
    password: '密码',
    confirmPassword: '确认密码',
    passwordNotMatch: '两次输入的密码不一致',
    minPasswordLength: '密码长度至少为6位',
    inviteCode: '邀请码',
    sendCaptcha: '发送验证码',
    captchaSent: '验证码发送成功',
    invalidEmail: '无效的邮箱',

    morning: '早上好',
    noon: '中午好',
    afternoon: '下午好',
    night: '晚上好'
  },

  auth,
  home,
  recipe,
  message,
  profile,

  create,

  signUp: '注册',
  enterEmail: '输入邮箱',
  enterPhone: '输入手机号',
  enterName: '输入用户名',
  enterPassword: '输入密码',
  enterPasswordAgain: '再次输入密码',
  enterInviteCode: '输入邀请码',
  forgotPassword: '忘记密码？',
  sendVerificationCode: '发送验证码',
  greeting: '你好, {{name}}!'
};

export default Chinese;
