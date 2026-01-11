'use client'

import { useState } from 'react'

export interface FilterValues {
  marque: string
  recommandation: string
  prixMin: string
  prixMax: string
  margeMin: string
  search: string
}

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    marque: '',
    recommandation: '',
    prixMin: '',
    prixMax: '',
    margeMin: '',
    search: '',
  })

  const handleChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const emptyFilters: FilterValues = {
      marque: '',
      recommandation: '',
      prixMin: '',
      prixMax: '',
      margeMin: '',
      search: '',
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  return (
    <div className="surface rounded-md p-3 mb-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* Recherche */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Rechercher..."
            className="compact-input w-full"
          />
        </div>

        <div className="divider-vertical mx-1"></div>

        {/* Marque */}
        <div className="w-32">
          <select
            value={filters.marque}
            onChange={(e) => handleChange('marque', e.target.value)}
            className="compact-input w-full"
          >
            <option value="">Marque</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes</option>
            <option value="Volkswagen">VW</option>
            <option value="Porsche">Porsche</option>
          </select>
        </div>

        {/* Recommandation */}
        <div className="w-32">
          <select
            value={filters.recommandation}
            onChange={(e) => handleChange('recommandation', e.target.value)}
            className="compact-input w-full"
          >
            <option value="">Statut</option>
            <option value="ACHAT IMMÉDIAT">Achat</option>
            <option value="À NÉGOCIER">Négo</option>
            <option value="À ÉVITER">Éviter</option>
          </select>
        </div>

        <div className="divider-vertical mx-1"></div>

        {/* Prix min/max */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.prixMin}
            onChange={(e) => handleChange('prixMin', e.target.value)}
            placeholder="Prix min"
            className="compact-input w-24"
          />
          <span className="text-slate-600">-</span>
          <input
            type="number"
            value={filters.prixMax}
            onChange={(e) => handleChange('prixMax', e.target.value)}
            placeholder="Prix max"
            className="compact-input w-24"
          />
        </div>

        <div className="divider-vertical mx-1"></div>

        {/* Marge minimale */}
        <div className="w-28">
          <input
            type="number"
            value={filters.margeMin}
            onChange={(e) => handleChange('margeMin', e.target.value)}
            placeholder="Marge min"
            className="compact-input w-full"
          />
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="compact-button bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          title="Réinitialiser les filtres"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  )
}
