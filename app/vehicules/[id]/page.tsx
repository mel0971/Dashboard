'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Vehicule } from '@/types/database.types'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, formatNumber, getRecommendationColor, getRecommendationEmoji } from '@/lib/utils'

export default function VehiculeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [vehicule, setVehicule] = useState<Vehicule | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchVehicule(params.id as string)
    }
  }, [params.id])

  async function fetchVehicule(id: string) {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('vehicules')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      setVehicule(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur lors du chargement du véhicule:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (error || !vehicule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-bold text-xl mb-2">Erreur</h2>
          <p className="text-red-600">{error || 'Véhicule non trouvé'}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour au dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{vehicule.titre_annonce}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96">
                {vehicule.image_principale ? (
                  <Image
                    src={vehicule.image_principale}
                    alt={vehicule.titre_annonce || 'Véhicule'}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Caractéristiques techniques */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques techniques</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Marque</p>
                  <p className="font-semibold text-gray-900">{vehicule.marque || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Modèle</p>
                  <p className="font-semibold text-gray-900">{vehicule.modele || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Année</p>
                  <p className="font-semibold text-gray-900">{vehicule.annee_mise_circulation || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kilométrage</p>
                  <p className="font-semibold text-gray-900">{formatNumber(vehicule.kilometrage)} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Carburant</p>
                  <p className="font-semibold text-gray-900">{vehicule.carburant || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Boîte de vitesse</p>
                  <p className="font-semibold text-gray-900">{vehicule.boite_vitesse || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Puissance</p>
                  <p className="font-semibold text-gray-900">{vehicule.puissance_ch || 'N/A'} ch</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cylindrée</p>
                  <p className="font-semibold text-gray-900">{formatNumber(vehicule.cylindree_cc)} cc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CO2</p>
                  <p className="font-semibold text-gray-900">{vehicule.co2_wltp_corrige || vehicule.co2_g_km || 'N/A'} g/km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Poids</p>
                  <p className="font-semibold text-gray-900">{formatNumber(vehicule.poids)} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">État</p>
                  <p className="font-semibold text-gray-900">{vehicule.etat_vehicule || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pays d'origine</p>
                  <p className="font-semibold text-gray-900">{vehicule.pays_origine || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Analyse IA */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyse IA</h2>

              {vehicule.avis_expert && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Avis Expert</h3>
                  <p className="text-gray-700 leading-relaxed">{vehicule.avis_expert}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicule.points_forts && (
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Points forts
                    </h3>
                    <div className="space-y-2">
                      {vehicule.points_forts.split(',').map((point, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-gray-700">{point.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {vehicule.points_faibles && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                      </svg>
                      Points faibles
                    </h3>
                    <div className="space-y-2">
                      {vehicule.points_faibles.split(',').map((point, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">✗</span>
                          <span className="text-gray-700">{point.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommandation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommandation</h2>
              <div className={`p-4 rounded-lg border-2 ${getRecommendationColor(vehicule.recommandation)}`}>
                <div className="text-center">
                  <span className="text-4xl mb-2 block">{getRecommendationEmoji(vehicule.recommandation)}</span>
                  <p className="font-bold text-lg">{vehicule.recommandation || 'N/A'}</p>
                </div>
              </div>
              {vehicule.scoring_global !== null && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-1">Score global</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${vehicule.scoring_global}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-900">{vehicule.scoring_global}/100</span>
                  </div>
                </div>
              )}
            </div>

            {/* Analyse financière */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Analyse financière</h2>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-600">Prix d'achat</p>
                  <p className="text-2xl font-bold text-blue-600">{formatPrice(vehicule.prix_affiche_achat)}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-600">Prix de revente estimé (FR)</p>
                  <p className="text-xl font-semibold text-gray-900">{formatPrice(vehicule.prix_estime_revente_fr)}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-600">Frais totaux estimés</p>
                  <p className="text-lg font-semibold text-orange-600">{formatPrice(vehicule.frais_totaux_estimes)}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-600">Malus CO2</p>
                  <p className="text-lg font-semibold text-red-600">{formatPrice(vehicule.cout_malus_estime)}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-600">Malus poids</p>
                  <p className="text-lg font-semibold text-red-600">{formatPrice(vehicule.malus_poids_estime)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Marge nette estimée</p>
                  <p className="text-3xl font-bold text-green-600">{formatPrice(vehicule.marge_nette_estimee)}</p>
                </div>
              </div>
            </div>

            {/* Informations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informations</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Source</p>
                  <p className="font-semibold text-gray-900">{vehicule.source_site}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <Badge variant="info">{vehicule.statut_traitement || 'N/A'}</Badge>
                </div>
                {vehicule.est_tva_recuperable !== null && (
                  <div>
                    <p className="text-sm text-gray-600">TVA récupérable</p>
                    <Badge variant={vehicule.est_tva_recuperable ? 'success' : 'default'}>
                      {vehicule.est_tva_recuperable ? 'Oui' : 'Non'}
                    </Badge>
                  </div>
                )}
                <a
                  href={vehicule.url_annonce}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-4"
                >
                  Voir l'annonce originale →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
