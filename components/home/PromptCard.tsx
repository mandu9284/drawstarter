'use client'

export function PromptCard({
  prompt,
  todaySubject,
}: {
  prompt: string
  todaySubject: string
}) {
  return (
    <div className='border p-4 sm:p-6 rounded bg-white shadow dark:bg-gray-800'>
      <p className='font-semibold text-base sm:text-lg dark:text-white '>
        {todaySubject}
      </p>
      {/* 서버 컴포넌트에서 렌더링된 내용과 클라이언트 컴포넌트에서 렌더링된 내용이 다르기 때문에 suppressHydrationWarning을 사용 */}
      <p
        className='text-xl sm:text-2xl mt-2 dark:text-white'
        suppressHydrationWarning>
        {prompt}
      </p>
    </div>
  )
}
