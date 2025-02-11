import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      login: 'Login',
      username: 'Username',
      password: 'Password',
      projectTitle: 'Patient Management System',
    },
  },
  ka: {
    translation: {
      login: 'შესვლა',
      username: 'მომხმარებელი',
      password: 'პაროლი',
      projectTitle: 'პაციენტის მართვის სისტემა',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ka',
  interpolation: { escapeValue: false },
})

export default i18n
