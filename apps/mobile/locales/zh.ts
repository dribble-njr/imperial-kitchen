const auth = {
  createKitchen: {
    title: '创建厨房',
    hero: '创建厨房',
    description: '创建您的厨房并开始探索'
  },

  joinKitchen: {
    title: '加入厨房',
    hero: '加入厨房',
    description: '加入厨房并开始探索'
  },

  signIn: {
    title: '登录',
    hero: '你好！',
    description: '准备开始探索御膳房',
    haveNoAccount: '没有账号？',
    joinOrCreate: '加入或创建厨房'
  },

  forgotPassword: {
    title: '忘记密码',
    hero: '重置密码',
    description: '找回您的账号密码'
  },

  createNewPassword: {
    title: '创建新密码',
    hero: '创建新密码',
    description: '重置您的账号密码'
  },

  alreadyHaveAccount: '已有账号？'
};

const home = {
  title: '首页'
};

const menu = {
  title: '菜单'
};

const profile = {
  title: '我的'
};

const Chinese = {
  welcome: '欢迎来到御膳房',
  start: '开始',
  startTip: '登录或注册开始使用',
  slogan: '定制您的厨房菜单',

  common: {
    enter: '请输入',
    next: '下一步',
    confirm: '确认',
    cancel: '取消',
    captcha: '验证码',
    email: '邮箱',
    name: '用户名',
    password: '密码',
    inviteCode: '邀请码',
    sendCaptcha: '发送验证码',
    invalidEmail: '无效的邮箱'
  },

  auth,
  home,
  menu,
  profile,

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
