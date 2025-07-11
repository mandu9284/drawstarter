import Image from 'next/image'

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || ''

export const SupabaseImage = ({
  src,
  alt,
  width,
  height,
  quality,
}: {
  src: string
  alt: string
  width: number
  height: number
  quality?: number
}) => {
  const supabaseLoader = ({
    src,
    width,
    quality,
  }: {
    src: string
    width: number
    quality?: number
  }) => {
    const aspectRatioHeight = Math.round(width * (height / width))

    // NOTE: width is overridden by supabase
    const halfWidth = width / 2
    return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${halfWidth}&height=${aspectRatioHeight}&quality=${quality || 75}`
  }

  return (
    <Image
      className='object-cover rounded-full w-100% h-auto'
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={true}
      quality={quality}
      loader={supabaseLoader}
    />
  )
}
