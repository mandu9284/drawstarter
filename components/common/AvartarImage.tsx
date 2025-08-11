import Image from 'next/image'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

export const AvatarImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) => {
  const supabaseLoader = ({ src }: { src: string }) => {
    return `${supabaseUrl}/storage/v1/object/public/${src}`
  }

  return (
    <Image
      className='object-cover rounded-full'
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={true}
      loader={supabaseLoader}
    />
  )
}
