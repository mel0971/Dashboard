import { formatPrice, formatNumber } from '@/lib/utils'

interface StatsCardsProps {
  stats: {
    total: number
    achatImmediat: number
    aNegocier: number
    aEviter: number
    margeMoyenne: number
    prixMoyen: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
      {/* Total */}
      <div className="surface rounded-md p-3 hover:bg-slate-800/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
        </div>
        <div className="font-mono text-2xl font-semibold text-slate-100">{stats.total}</div>
        <div className="text-xs text-slate-500 mt-1">annonces</div>
      </div>

      {/* Achat immédiat */}
      <div className="surface rounded-md p-3 hover:bg-slate-800/50 transition-colors border-l-2 border-emerald-500/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Achat</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        </div>
        <div className="font-mono text-2xl font-semibold text-emerald-400">{stats.achatImmediat}</div>
        <div className="text-xs text-slate-500 mt-1">immédiat</div>
      </div>

      {/* À négocier */}
      <div className="surface rounded-md p-3 hover:bg-slate-800/50 transition-colors border-l-2 border-amber-500/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Négo</span>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
        </div>
        <div className="font-mono text-2xl font-semibold text-amber-400">{stats.aNegocier}</div>
        <div className="text-xs text-slate-500 mt-1">à traiter</div>
      </div>

      {/* À éviter */}
      <div className="surface rounded-md p-3 hover:bg-slate-800/50 transition-colors border-l-2 border-red-500/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Éviter</span>
          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
        </div>
        <div className="font-mono text-2xl font-semibold text-red-400">{stats.aEviter}</div>
        <div className="text-xs text-slate-500 mt-1">exclus</div>
      </div>

      {/* Marge moyenne */}
      <div className="surface rounded-md p-3 hover:bg-slate-800/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Marge Moy</span>
          <span className="text-xs text-emerald-500">↗ 4.2%</span>
        </div>
        <div className="font-mono text-xl font-semibold text-slate-100">{formatPrice(stats.margeMoyenne)}</div>
        <div className="text-xs text-slate-500 mt-1">nette estimée</div>
      </div>

      {/* Prix moyen */}
      <div className="surface rounded-md p-3 hover:bg-slate-800/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Prix Moy</span>
          <span className="text-xs text-slate-500">─</span>
        </div>
        <div className="font-mono text-xl font-semibold text-slate-100">{formatPrice(stats.prixMoyen)}</div>
        <div className="text-xs text-slate-500 mt-1">d'achat</div>
      </div>
    </div>
  )
}
