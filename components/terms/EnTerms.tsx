import Link from 'next/link'

export default function EnTerms({ lang }: { lang: string }) {
  return (
    <div className='p-8 shadow-md rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>Terms of Service</h1>
      <p className='mb-4'>
        Welcome to DrawStarter. By using our service, you agree to these terms.
      </p>

      <h2 className='text-xl font-semibold mb-2'>1. Accounts</h2>
      <p className='mb-4'>
        When you create an account with us, you must provide information that is
        accurate, complete, and current at all times. Failure to do so
        constitutes a breach of the Terms, which may result in immediate
        termination of your account on our service.
      </p>

      <h2 className='text-xl font-semibold mb-2'>2. Use of Service</h2>
      <p className='mb-4'>
        You agree to use the service only for lawful purposes. You are
        prohibited from any use of the service that would constitute an illegal
        offense, give rise to civil liability, or otherwise violate any local,
        state, national, or international law.
      </p>

      <h2 className='text-xl font-semibold mb-2'>3. Intellectual Property</h2>
      <p className='mb-4'>
        The service and its original content, features, and functionality are
        and will remain the exclusive property of DrawStarter and its licensors.
        The service is protected by copyright, trademark, and other laws of both
        the United States and foreign countries.
      </p>

      <h2 className='text-xl font-semibold mb-2'>4. Disclaimer</h2>
      <p className='mb-4'>
        The service is provided on an &quot;AS IS&quot; and &quot;AS
        AVAILABLE&quot; basis. DrawStarter makes no representations or
        warranties of any kind, express or implied, as to the operation of their
        services, or the information, content, or materials included therein.
      </p>

      <h2 className='text-xl font-semibold mb-2'>5. Changes to Terms</h2>
      <p className='mb-4'>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. We will provide notice of any changes by posting the
        new Terms of Service on this page.
      </p>

      <h2 className='text-xl font-semibold mb-2'>6. Contact Us</h2>
      <p className='mb-4'>
        If you have any questions about these Terms, please contact us at{' '}
        <Link
          href='mailto:mandu9284@gmail.com'
          className='text-blue-500 hover:underline'>
          mandu9284@gmail.com
        </Link>
        .
      </p>
      <div className='mt-8 text-center'>
        <Link
          href={`/${lang}/`}
          className='text-blue-500 hover:underline'>
          Home
        </Link>
      </div>
    </div>
  )
}
