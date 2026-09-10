import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface Props {
  controls: ReactNode
  output: ReactNode
  history?: ReactNode
  className?: string
}

/**
 * Common layout for image / audio / music / video generation:
 *   ┌─────────┬───────────────────┐
 *   │ Form    │ Output / Gallery  │
 *   │ (left)  │ (right, primary)  │
 *   └─────────┴───────────────────┘
 *
 * On narrow screens, controls collapse above output.
 */
export function GenerationView({ controls, output, history, className }: Props) {
  return (
    <div className={cn('flex flex-col md:flex-row h-full bg-[#0a0a0c] overflow-y-auto md:overflow-visible', className)}>
      <aside className="md:w-[360px] lg:w-[400px] shrink-0 border-b md:border-b-0 md:border-r border-white/[0.05] flex flex-col bg-[#0c0c10]">
        <div className="p-5 flex flex-col gap-4 md:overflow-y-auto">
          {controls}
        </div>
        {history && (
          <div className="border-t border-white/[0.05] flex-1 min-h-0 overflow-y-auto p-3">
            {history}
          </div>
        )}
      </aside>
      <main className="flex-1 min-w-0 md:overflow-y-auto p-5 md:p-7">
        {output}
      </main>
    </div>
  )
}
