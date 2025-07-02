'use client'

import { Button } from '../common/Button'
import { ButtonGroup } from '../common/ButtonGroup'

export function TimerControls({
  isRunning,
  onToggle,
  onReset,
  onComplete,
}: {
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
  onComplete: () => void
}) {
  return (
    <ButtonGroup className='justify-center'>
      <Button
        variant={isRunning ? 'pause' : 'primary'}
        onClick={onToggle}>
        {isRunning ? 'PAUSE' : 'START'}
      </Button>
      <Button
        variant='secondary'
        onClick={onReset}>
        RESTART
      </Button>
      <Button
        variant='success'
        onClick={onComplete}>
        COMPLETE
      </Button>
    </ButtonGroup>
  )
}
