import { getDictionary } from '@/lib/dictionaries'
import { type Locale } from '@/i18n.config'
import EnPrivacy from '@/components/terms/EnPrivacy'
import KrPrivacy from '@/components/terms/KrPrivacy'
import JaPrivacy from '@/components/terms/JaPrivacy'

const PrivacyPolicy = async ({
  params: { lang },
}: {
  params: { lang: Locale }
}) => {
  const dictionary = await getDictionary(lang)

  const PrivacyPolicyComponent = () => {
    switch (lang) {
      case 'en':
        return <EnPrivacy />
      case 'kr':
        return <KrPrivacy />
      case 'ja':
        return <JaPrivacy />
      default:
        return <EnPrivacy />
    }
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <PrivacyPolicyComponent />
    </div>
  )
}

export default PrivacyPolicy
