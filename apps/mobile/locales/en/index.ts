import auth from './auth';

const home = {
  title: 'Home',
  slogan: 'What would you like to eat for today? 😊'
};

const recipe = {
  title: 'Recipe'
};

const message = {
  title: 'Message'
};

const profile = {
  title: 'Profile',
  setting: {
    title: 'Setting',
    signOut: 'Sign Out',
    language: {
      title: 'Language',
      zh: 'Chinese',
      en: 'English'
    },
    theme: {
      title: 'Theme',
      auto: 'Follow System',
      light: 'Light Mode',
      dark: 'Dark Mode'
    },
    color: {
      title: 'Color',
      default: 'Default',
      orange: 'Orange',
      red: 'Red',
      violet: 'Violet',
      indigo: 'Indigo',
      blue: 'Blue',
      teal: 'Teal',
      cyan: 'Cyan',
      green: 'Green',
      lime: 'Lime',
      olive: 'Olive',
      brown: 'Brown'
    }
  }
};

const create = {
  dish: 'Create Dish',
  recipe: 'Create Recipe'
};

const English = {
  startTip: 'Sign up or sign in to get started',

  common: {
    enter: 'Please enter ',
    next: 'Next',
    confirm: 'Confirm',
    cancel: 'Cancel',
    email: 'Email',
    name: 'Name',
    captchaLength: '6 characters',
    password: 'Password',
    pleaseConfirm: 'Please confirm',
    confirmPassword: 'Confirm Password',
    passwordNotMatch: 'Password do not match',
    minPasswordLength: 'Password must be at least 6 characters',
    inviteCode: 'Invite Code',
    invalidEmail: 'Invalid email',
    success: 'Success',
    error: 'Error',

    morning: 'Good morning',
    noon: 'Good noon',
    afternoon: 'Good afternoon',
    night: 'Good night'
  },

  auth,
  home,
  recipe,
  message,
  profile,

  create,

  enterEmail: 'Enter your email',
  enterPhone: 'Enter your phone number',
  enterName: 'Enter your name',
  enterPassword: 'Enter your password',
  enterPasswordAgain: 'Enter your password again',
  enterInviteCode: 'Enter your invite code',
  forgotPassword: 'Forgot Password?',
  sendVerificationCode: 'Send Verification Code',
  greeting: 'Hello, {{name}}!'
};

export default English;
