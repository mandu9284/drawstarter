'use client'

import { Button } from '../common/Button'
import { ButtonGroup } from '../common/ButtonGroup'

export function TimerControls({
  isRunning,
  onToggle,
  onReset,
  onComplete,
  dict,
}: {
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
  onComplete: () => void
  dict: Dictionary
}) {
  return (
    <ButtonGroup className='justify-center'>
      <Button
        variant={isRunning ? 'pause' : 'primary'}
        onClick={onToggle}>
        {isRunning ? dict.draw.pause : dict.draw.start}
      </Button>
      <Button
        variant='secondary'
        onClick={onReset}>
        {dict.draw.reset}
      </Button>
      <Button
        variant='success'
        onClick={onComplete}>
        {dict.draw.complete}
      </Button>
    </ButtonGroup>
  )
}
