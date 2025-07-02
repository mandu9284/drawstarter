'use client'

export function DoneMessage() {
  return (
    <div className='space-y-6 text-center px-4 sm:px-6 md:px-8'>
      <h2 className='text-2xl sm:text-3xl font-bold'>🎉 잘하셨어요!</h2>
      <p className='text-lg sm:text-xl'>오늘의 그림 시간을 완수했어요.</p>
      <p className='text-sm sm:text-base text-gray-500'>
        DrawStarter와 함께 해주셔서 감사합니다.
      </p>
    </div>
  )
}
