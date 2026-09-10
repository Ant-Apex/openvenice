import { useState, useRef, useEffect, useMemo } from 'react'
import { cn } from '../../lib/utils'

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string; sub?: string }>
  placeholder?: string
  searchable?: boolean
  searchPlaceholder?: string
  dropdownClassName?: string
  className?: string
}

export function Select({ value, onChange, options, placeholder = 'Select...', searchable = false, searchPlaceholder = 'Search...', dropdownClassName, className }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // на телефоне дропдаун рисуем bottom-sheet'ом (вложенный скролл на iOS ненадёжен)
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open && searchable && !isMobile) inputRef.current?.focus()
  }, [open, searchable, isMobile])

  const filtered = useMemo(() =>
    search
      ? options.filter((o) => (o.label + ' ' + (o.sub ?? '')).toLowerCase().includes(search.toLowerCase()))
      : options,
    [options, search],
  )

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => { const next = !open; setOpen(next); if (!next) setSearch('') }}
        className={cn(
          'w-full flex items-center justify-between gap-2 bg-transparent border border-white/[0.06] rounded-md px-2.5 py-1.5 text-[15px] hover:border-white/[0.12] transition-colors outline-none',
          open && 'border-white/[0.15]',
        )}
      >
        <span className={cn('truncate text-[15px]', value ? 'text-white/70' : 'text-white/20')}>{selectedLabel}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          className={cn('shrink-0 text-white/20 transition-transform duration-150', open && 'rotate-180')}>
          <path d="M2.5 3.75L5 6.25L7.5 3.75" />
        </svg>
      </button>

      {open && isMobile && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setOpen(false)} />
      )}
      {open && (
        <div className={isMobile
          ? "fixed inset-x-3 z-[70] bg-[#0e0e0e] border border-white/[0.12] rounded-xl shadow-2xl shadow-black/70 animate-scale-in overflow-hidden"
          : cn("absolute z-50 mt-0.5 bg-[#0e0e0e] border border-white/[0.08] rounded-lg shadow-2xl shadow-black/50 animate-scale-in overflow-hidden", dropdownClassName ?? "w-[calc(100%+30px)]")}
          style={isMobile ? { bottom: "max(12px, env(safe-area-inset-bottom))" } : undefined}>
          {searchable && (
            <div className="p-1 border-b border-white/[0.04]">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-white/[0.03] rounded px-2 py-1 text-[15px] text-white/70 outline-none placeholder:text-white/12"
              />
            </div>
          )}
          <div className={isMobile ? "max-h-[52vh] overflow-y-auto overscroll-contain p-1" : "max-h-60 overflow-y-auto p-0.5"} style={{ WebkitOverflowScrolling: "touch" }}>
            {filtered.length === 0 ? (
              <div className="px-2.5 py-2.5 text-[14px] text-white/15 text-center">No results</div>
            ) : (
              filtered.map((o) => (
                <button
                  key={o.value}
                  onClick={() => { onChange(o.value); setOpen(false) }}
                  className={cn(
                    isMobile ? 'w-full text-left px-3.5 py-2.5 rounded-lg transition-colors' : 'w-full text-left px-3 py-[6px] rounded transition-colors',
                    o.value === value
                      ? 'bg-white/[0.07]'
                      : 'hover:bg-white/[0.04]',
                  )}
                >
                  <span className={cn('block text-[14px] leading-tight', o.value === value ? 'text-white/80' : 'text-white/50')}>
                    {o.label}
                  </span>
                  {o.sub && (
                    <span className="block text-[11px] leading-tight mt-[2px] text-white/25 font-mono whitespace-nowrap">
                      {o.sub}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
