import EnPrivacy from '@/components/terms/EnPrivacy'
import KrPrivacy from '@/components/terms/KrPrivacy'
import JaPrivacy from '@/components/terms/JaPrivacy'
import { useDictionary } from '@/hooks/useDictionary'

const PrivacyPolicy = () => {
  const { lang } = useDictionary()

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
