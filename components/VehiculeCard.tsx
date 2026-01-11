import Image from 'next/image'
import Link from 'next/link'
import { Vehicule } from '@/types/database.types'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, formatNumber, getRecommendationColor, getRecommendationEmoji } from '@/lib/utils'

interface VehiculeCardProps {
  vehicule: Vehicule
}

export function VehiculeCard({ vehicule }: VehiculeCardProps) {
  const getRecommendationStyle = (recommandation: string | null | undefined) => {
    switch(recommandation) {
      case 'ACHAT IMMÉDIAT':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
      case 'À NÉGOCIER':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50'
      case 'À ÉVITER':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/50'
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    }
  }

  return (
    <Link href={`/vehicules/${vehicule.id}`}>
      <div className="group relative glass-effect rounded-2xl overflow-hidden cursor-pointer hover-glow transition-all duration-500 border border-white/10">
        {/* Image avec overlay gradient */}
        <div className="relative h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {vehicule.image_principale ? (
            <>
              <Image
                src={vehicule.image_principale}
                alt={vehicule.titre_annonce || 'Véhicule'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-600">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
          )}

          {/* Badge de recommandation */}
          <div className="absolute top-3 right-3 z-10">
            <span className={`px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-sm ${getRecommendationStyle(vehicule.recommandation)}`}>
              {getRecommendationEmoji(vehicule.recommandation)} {vehicule.recommandation || 'N/A'}
            </span>
          </div>

          {/* Scoring badge */}
          {vehicule.scoring_global && (
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/20">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-white font-bold text-sm">{vehicule.scoring_global}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-5">
          {/* Titre */}
          <h3 className="text-xl font-bold text-white mb-3 truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {vehicule.titre_annonce || `${vehicule.marque} ${vehicule.modele}`}
          </h3>

          {/* Prix et Marge */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
            <div>
              <p className="text-xs text-gray-400 mb-1">Prix d'achat</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {formatPrice(vehicule.prix_affiche_achat)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">Marge nette</p>
              <p className={`text-2xl font-bold ${(vehicule.marge_nette_estimee || 0) > 0 ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-red-400 to-pink-400'} bg-clip-text text-transparent`}>
                {formatPrice(vehicule.marge_nette_estimee)}
              </p>
            </div>
          </div>

          {/* Caractéristiques avec icônes modernes */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-gray-300 bg-white/5 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">{vehicule.annee_mise_circulation || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 bg-white/5 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">{formatNumber(vehicule.kilometrage)} km</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 bg-white/5 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">{vehicule.carburant || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 bg-white/5 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
              <span className="text-sm font-medium">{vehicule.boite_vitesse || 'N/A'}</span>
            </div>
          </div>

          {/* Badges supplémentaires */}
          {vehicule.puissance_ch && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 px-3 py-1 rounded-lg">
                <span className="text-sm font-semibold text-red-300">{vehicule.puissance_ch} ch</span>
              </div>
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none rounded-2xl"></div>
      </div>
    </Link>
  )
}
