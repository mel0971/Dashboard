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
        <div className="surface rounded-md p-6 text-center">
          <div className="relative w-12 h-12 mx-auto mb-3">
            <div className="absolute inset-0 rounded-full border-2 border-slate-700"></div>
            <div className="absolute inset-0 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-slate-300 text-sm font-medium">Chargement des annonces...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="surface rounded-md p-6 max-w-md border-l-2 border-red-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-500/10 rounded p-2">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-red-400 font-semibold text-lg">Erreur</h2>
          </div>
          <p className="text-slate-300 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header simplifié */}
      <header className="sticky top-0 z-50 surface-elevated backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 mb-1">
                Dashboard Véhicules
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Gestion et analyse des opportunités automobiles
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="surface px-3 py-1.5 rounded">
                <span className="text-slate-400 text-xs font-medium">Ovarix IA</span>
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
          <div className="surface rounded-md p-12 text-center">
            <div className="mb-4 inline-block p-4 rounded bg-slate-800/50">
              <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Aucun véhicule trouvé</h3>
            <p className="text-slate-400 text-sm">Essayez de modifier vos filtres de recherche</p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="surface px-4 py-2 rounded-md">
                <span className="text-slate-300 text-sm font-medium">
                  {filteredVehicules.length} véhicule{filteredVehicules.length > 1 ? 's' : ''} trouvé{filteredVehicules.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVehicules.map((vehicule) => (
                <VehiculeCard key={vehicule.id} vehicule={vehicule} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-xs text-slate-500">Propulsé par Ovarix IA © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
