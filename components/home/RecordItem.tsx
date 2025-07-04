export function RecordItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between text-sm sm:text-base text-gray-700 dark:text-gray-400'>
      <span>{label}</span>
      <span className='font-medium'>{value}</span>
    </div>
  )
}
