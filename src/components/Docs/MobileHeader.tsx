// components/MobileHeader.tsx (nuevo componente)
'use client'

interface MobileHeaderProps {
    onMenuClick: () => void
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    return (
        <div className="sticky top-0 z-30 lg:hidden">
            <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
                <button
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    aria-label="Open menu"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600">
                        <span className="text-lg font-bold text-white">P</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">PrimalFi</span>
                </div>

                <div className="w-10" /> {/* Spacer para centrar el logo */}
            </div>
        </div>
    )
}