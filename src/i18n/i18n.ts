import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      login: 'Login',
      username: 'Username',
      password: 'Password',
      projectTitle: 'Patient Management System',
      loginFail: 'Invaild Credentials. Please try again',
      loginSuccess: 'You logged in the system sucessfully',
      isRequired: ' is required',
      buttonLoading: 'loading...',
      welcome: 'Welcome,',
      admin: 'Administrator',
      doctor: 'Doctor',
      appuser: 'User',
      logout: 'Log Out',
    },
  },
  ka: {
    translation: {
      login: 'შესვლა',
      username: 'მომხმარებელი',
      password: 'პაროლი',
      projectTitle: 'პაციენტის მართვის სისტემა',
      loginFail: 'მონაცემები არასწორია. გთხოვთ, სცადოთ თავიდან',
      loginSuccess: 'თქვენ წარმატებით შეხვედით სისტემაში',
      isRequired: ' სავალდებულო ველია',
      buttonLoading: 'იტვირთება...',
      welcome: 'მოგესალმებით,',
      admin: 'ადმინისტრატორი',
      doctor: 'ექიმი',
      appuser: 'მომხმარებელი',
      logout: 'გასვლა',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ka',
  interpolation: { escapeValue: false },
})

export default i18n
