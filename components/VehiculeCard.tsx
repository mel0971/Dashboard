import Image from 'next/image'
import Link from 'next/link'
import { Vehicule } from '@/types/database.types'
import { formatPrice, formatNumber } from '@/lib/utils'

interface VehiculeCardProps {
  vehicule: Vehicule
}

export function VehiculeCard({ vehicule }: VehiculeCardProps) {
  const getStatusColor = (recommandation: string | null | undefined) => {
    switch(recommandation) {
      case 'ACHAT IMMÉDIAT':
        return 'border-emerald-500/50 bg-emerald-500/10'
      case 'À NÉGOCIER':
        return 'border-amber-500/50 bg-amber-500/10'
      case 'À ÉVITER':
        return 'border-red-500/50 bg-red-500/10'
      default:
        return 'border-slate-600/50 bg-slate-600/10'
    }
  }

  const getStatusLabel = (recommandation: string | null | undefined) => {
    switch(recommandation) {
      case 'ACHAT IMMÉDIAT':
        return 'ACHAT'
      case 'À NÉGOCIER':
        return 'NÉGO'
      case 'À ÉVITER':
        return 'ÉVITER'
      default:
        return 'N/A'
    }
  }

  const getStatusTextColor = (recommandation: string | null | undefined) => {
    switch(recommandation) {
      case 'ACHAT IMMÉDIAT':
        return 'text-emerald-400'
      case 'À NÉGOCIER':
        return 'text-amber-400'
      case 'À ÉVITER':
        return 'text-red-400'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <Link href={`/vehicules/${vehicule.id}`}>
      <div className="surface rounded-md overflow-hidden hover:bg-slate-800/50 transition-colors cursor-pointer">
        {/* Image compacte */}
        <div className="relative h-40 bg-slate-900 overflow-hidden">
          {vehicule.image_principale ? (
            <Image
              src={vehicule.image_principale}
              alt={vehicule.titre_annonce || 'Véhicule'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-700">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
          )}

          {/* Status badge discret */}
          <div className="absolute top-2 right-2">
            <div className={`px-2 py-0.5 rounded border ${getStatusColor(vehicule.recommandation)}`}>
              <span className={`text-xs font-semibold ${getStatusTextColor(vehicule.recommandation)}`}>
                {getStatusLabel(vehicule.recommandation)}
              </span>
            </div>
          </div>

          {/* Score en petit */}
          {vehicule.scoring_global && (
            <div className="absolute top-2 left-2">
              <div className="bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded">
                <span className="text-xs font-mono text-slate-300">{vehicule.scoring_global}</span>
              </div>
            </div>
          )}
        </div>

        {/* Contenu compact */}
        <div className="p-3">
          {/* Titre compact */}
          <h3 className="text-sm font-semibold text-slate-100 mb-2 truncate">
            {vehicule.titre_annonce || `${vehicule.marque} ${vehicule.modele}`}
          </h3>

          {/* Prix et Marge - layout compact */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Prix</p>
              <p className="font-mono text-lg font-semibold text-slate-100">
                {formatPrice(vehicule.prix_affiche_achat)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-0.5">Marge</p>
              <p className={`font-mono text-lg font-semibold ${(vehicule.marge_nette_estimee || 0) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatPrice(vehicule.marge_nette_estimee)}
              </p>
            </div>
          </div>

          {/* Specs en mode dense - 2x2 grid compact */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="font-mono">{vehicule.annee_mise_circulation || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="font-mono">{formatNumber(vehicule.kilometrage)} km</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span>{vehicule.carburant || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span>{vehicule.boite_vitesse || 'N/A'}</span>
            </div>
          </div>

          {/* Puissance si disponible */}
          {vehicule.puissance_ch && (
            <div className="mt-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400">{vehicule.puissance_ch} ch</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
