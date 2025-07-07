export function RecordItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between text-sm sm:text-base dark:text-white'>
      <span>{label}</span>
      <span className='font-medium'>{value}</span>
    </div>
  )
}
