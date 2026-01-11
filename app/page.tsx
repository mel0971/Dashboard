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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-300 text-lg font-medium">Chargement des annonces...</p>
          <div className="mt-4 flex gap-1 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-effect rounded-2xl p-8 max-w-md border border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-xl p-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-red-400 font-bold text-2xl">Erreur</h2>
          </div>
          <p className="text-gray-300 text-lg">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header avec effet glassmorphism */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Dashboard Véhicules
              </h1>
              <p className="text-gray-400 font-medium flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                Gestion et analyse des opportunités automobiles
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="glass-effect px-4 py-2 rounded-xl border border-white/10">
                <span className="text-gray-400 text-sm">Ovarix IA</span>
              </div>
            </div>
          </div>
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
          <div className="glass-effect rounded-2xl p-16 text-center border border-white/10">
            <div className="mb-6 inline-block p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <svg className="w-20 h-20 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Aucun véhicule trouvé</h3>
            <p className="text-gray-400 text-lg">Essayez de modifier vos filtres de recherche</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div className="glass-effect px-6 py-3 rounded-xl border border-white/10">
                <span className="text-gray-300 font-semibold">
                  {filteredVehicules.length} véhicule{filteredVehicules.length > 1 ? 's' : ''} trouvé{filteredVehicules.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicules.map((vehicule) => (
                <VehiculeCard key={vehicule.id} vehicule={vehicule} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="font-medium">Propulsé par Ovarix IA © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
