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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Réinitialiser
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Recherche */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recherche
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Rechercher par marque, modèle, titre..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Marque */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marque
          </label>
          <select
            value={filters.marque}
            onChange={(e) => handleChange('marque', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Toutes les marques</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Porsche">Porsche</option>
          </select>
        </div>

        {/* Recommandation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recommandation
          </label>
          <select
            value={filters.recommandation}
            onChange={(e) => handleChange('recommandation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Toutes</option>
            <option value="ACHAT IMMÉDIAT">🟢 Achat immédiat</option>
            <option value="À NÉGOCIER">🟡 À négocier</option>
            <option value="À ÉVITER">🔴 À éviter</option>
          </select>
        </div>

        {/* Marge minimum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marge minimale
          </label>
          <input
            type="number"
            value={filters.margeMin}
            onChange={(e) => handleChange('margeMin', e.target.value)}
            placeholder="Ex: 1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Prix minimum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix minimum
          </label>
          <input
            type="number"
            value={filters.prixMin}
            onChange={(e) => handleChange('prixMin', e.target.value)}
            placeholder="Ex: 10000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Prix maximum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix maximum
          </label>
          <input
            type="number"
            value={filters.prixMax}
            onChange={(e) => handleChange('prixMax', e.target.value)}
            placeholder="Ex: 50000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}
