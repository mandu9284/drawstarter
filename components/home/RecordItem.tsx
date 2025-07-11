export function RecordItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between text-sm sm:text-base dark:text-white'>
      <span className='text-gray-700'>{label}</span>
      <span className='font-medium text-gray-700'>{value}</span>
    </div>
  )
}
