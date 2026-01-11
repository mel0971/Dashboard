'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Vehicule } from '@/types/database.types'
import { VehiculeCard } from '@/components/VehiculeCard'
import { Filters, FilterValues } from '@/components/Filters'
import { StatsCards } from '@/components/StatsCards'

export default function DashboardPage() {
  const [vehicules, setVehicules] = useState<Vehicule[]>([])
  const [filteredVehicules, setFilteredVehicules] = useState<Vehicule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVehicules()
  }, [])

  async function fetchVehicules() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('vehicules')
        .select('*')
        .order('date_creation', { ascending: false })

      if (error) throw error

      setVehicules(data || [])
      setFilteredVehicules(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur lors du chargement des véhicules:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: FilterValues) => {
    let filtered = [...vehicules]

    // Recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(v =>
        v.titre_annonce?.toLowerCase().includes(searchLower) ||
        v.marque?.toLowerCase().includes(searchLower) ||
        v.modele?.toLowerCase().includes(searchLower)
      )
    }

    // Filtre par marque
    if (filters.marque) {
      filtered = filtered.filter(v => v.marque === filters.marque)
    }

    // Filtre par recommandation
    if (filters.recommandation) {
      filtered = filtered.filter(v => v.recommandation === filters.recommandation)
    }

    // Filtre par prix minimum
    if (filters.prixMin) {
      const prixMin = parseFloat(filters.prixMin)
      filtered = filtered.filter(v => (v.prix_affiche_achat || 0) >= prixMin)
    }

    // Filtre par prix maximum
    if (filters.prixMax) {
      const prixMax = parseFloat(filters.prixMax)
      filtered = filtered.filter(v => (v.prix_affiche_achat || 0) <= prixMax)
    }

    // Filtre par marge minimale
    if (filters.margeMin) {
      const margeMin = parseFloat(filters.margeMin)
      filtered = filtered.filter(v => (v.marge_nette_estimee || 0) >= margeMin)
    }

    setFilteredVehicules(filtered)
  }

  // Calcul des statistiques
  const stats = {
    total: filteredVehicules.length,
    achatImmediat: filteredVehicules.filter(v => v.recommandation === 'ACHAT IMMÉDIAT').length,
    aNegocier: filteredVehicules.filter(v => v.recommandation === 'À NÉGOCIER').length,
    aEviter: filteredVehicules.filter(v => v.recommandation === 'À ÉVITER').length,
    margeMoyenne: filteredVehicules.length > 0
      ? filteredVehicules.reduce((sum, v) => sum + (v.marge_nette_estimee || 0), 0) / filteredVehicules.length
      : 0,
    prixMoyen: filteredVehicules.length > 0
      ? filteredVehicules.reduce((sum, v) => sum + (v.prix_affiche_achat || 0), 0) / filteredVehicules.length
      : 0,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des annonces...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-bold text-xl mb-2">Erreur</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Véhicules</h1>
          <p className="text-gray-600 mt-1">Gestion et analyse des opportunités automobiles</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <StatsCards stats={stats} />

        {/* Filtres */}
        <Filters onFilterChange={handleFilterChange} />

        {/* Résultats */}
        {filteredVehicules.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {filteredVehicules.length} véhicule{filteredVehicules.length > 1 ? 's' : ''} trouvé{filteredVehicules.length > 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicules.map((vehicule) => (
                <VehiculeCard key={vehicule.id} vehicule={vehicule} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
