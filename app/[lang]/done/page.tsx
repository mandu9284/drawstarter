'use client'

import { DoneMessage } from '@/components/done/DoneMessage'
import { useDictionary } from '@/hooks/useDictionary'

export default function DonePage() {
  const { dict } = useDictionary()

  return <DoneMessage dict={dict} />
}
