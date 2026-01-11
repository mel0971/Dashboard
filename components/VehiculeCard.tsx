import Image from 'next/image'
import Link from 'next/link'
import { Vehicule } from '@/types/database.types'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, formatNumber, getRecommendationColor, getRecommendationEmoji } from '@/lib/utils'

interface VehiculeCardProps {
  vehicule: Vehicule
}

export function VehiculeCard({ vehicule }: VehiculeCardProps) {
  return (
    <Link href={`/vehicules/${vehicule.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-200">
        {/* Image */}
        <div className="relative h-48 bg-gray-200">
          {vehicule.image_principale ? (
            <Image
              src={vehicule.image_principale}
              alt={vehicule.titre_annonce || 'Véhicule'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
          )}

          {/* Badge de recommandation */}
          <div className="absolute top-2 right-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRecommendationColor(vehicule.recommandation)}`}>
              {getRecommendationEmoji(vehicule.recommandation)} {vehicule.recommandation || 'N/A'}
            </span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          {/* Titre */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
            {vehicule.titre_annonce || `${vehicule.marque} ${vehicule.modele}`}
          </h3>

          {/* Prix et Marge */}
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {formatPrice(vehicule.prix_affiche_achat)}
              </p>
              <p className="text-xs text-gray-500">Prix d'achat</p>
            </div>
            <div className="text-right">
              <p className={`text-xl font-bold ${(vehicule.marge_nette_estimee || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPrice(vehicule.marge_nette_estimee)}
              </p>
              <p className="text-xs text-gray-500">Marge nette</p>
            </div>
          </div>

          {/* Caractéristiques */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
              </svg>
              {vehicule.annee_mise_circulation || 'N/A'}
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12H1v6a2 2 0 002 2h14a2 2 0 002-2v-6h-8v2H9v-2z"/>
              </svg>
              {formatNumber(vehicule.kilometrage)} km
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
              </svg>
              {vehicule.carburant || 'N/A'}
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
              </svg>
              {vehicule.boite_vitesse || 'N/A'}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1">
            {vehicule.puissance_ch && (
              <Badge variant="info">{vehicule.puissance_ch} ch</Badge>
            )}
            {vehicule.scoring_global && (
              <Badge variant="default">Score: {vehicule.scoring_global}</Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
