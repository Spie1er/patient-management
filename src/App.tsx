import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t, i18n } = useTranslation()

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold">{t('login')}</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ka' : 'en')}
      >
        {i18n.language === 'en' ? 'Switch to Georgian' : 'გადართვა ინგლისურზე'}
      </button>
    </div>
  )
}

export default App
