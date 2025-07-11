'use client'

export function PromptCard({
  prompt,
  todaySubject,
}: {
  prompt: string
  todaySubject: string
}) {
  return (
    <div className='border border-gray-400 p-4 sm:p-6 rounded shadow dark:bg-gray-800'>
      <p className='font-semibold text-gray-800 text-base sm:text-lg dark:text-white '>
        {todaySubject}
      </p>
      {/* 서버 컴포넌트에서 렌더링된 내용과 클라이언트 컴포넌트에서 렌더링된 내용이 다르기 때문에 suppressHydrationWarning을 사용 */}
      <p
        className='text-2xl sm:text-2xl md:text-3xl lg:text-4xl min-h-16 mt-2 text-gray-800 dark:text-white'
        suppressHydrationWarning>
        {prompt}
      </p>
    </div>
  )
}
