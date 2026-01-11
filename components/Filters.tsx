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
    <div className="glass-effect rounded-2xl p-6 mb-8 border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Filtres de recherche</h2>
        </div>
        <button
          onClick={handleReset}
          className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors">Réinitialiser</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Recherche */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            🔍 Recherche globale
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              placeholder="Rechercher par marque, modèle, titre..."
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 transition-all duration-300"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>

        {/* Marque */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            🚗 Marque
          </label>
          <select
            value={filters.marque}
            onChange={(e) => handleChange('marque', e.target.value)}
            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-300 cursor-pointer"
          >
            <option value="" className="bg-slate-800">Toutes les marques</option>
            <option value="Audi" className="bg-slate-800">Audi</option>
            <option value="BMW" className="bg-slate-800">BMW</option>
            <option value="Mercedes-Benz" className="bg-slate-800">Mercedes-Benz</option>
            <option value="Volkswagen" className="bg-slate-800">Volkswagen</option>
            <option value="Porsche" className="bg-slate-800">Porsche</option>
          </select>
        </div>

        {/* Recommandation */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            ⭐ Recommandation
          </label>
          <select
            value={filters.recommandation}
            onChange={(e) => handleChange('recommandation', e.target.value)}
            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-300 cursor-pointer"
          >
            <option value="" className="bg-slate-800">Toutes</option>
            <option value="ACHAT IMMÉDIAT" className="bg-slate-800">🟢 Achat immédiat</option>
            <option value="À NÉGOCIER" className="bg-slate-800">🟡 À négocier</option>
            <option value="À ÉVITER" className="bg-slate-800">🔴 À éviter</option>
          </select>
        </div>

        {/* Marge minimum */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            💰 Marge minimale
          </label>
          <input
            type="number"
            value={filters.margeMin}
            onChange={(e) => handleChange('margeMin', e.target.value)}
            placeholder="Ex: 1000"
            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-500 transition-all duration-300"
          />
        </div>

        {/* Prix minimum */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            💵 Prix minimum
          </label>
          <input
            type="number"
            value={filters.prixMin}
            onChange={(e) => handleChange('prixMin', e.target.value)}
            placeholder="Ex: 10000"
            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 transition-all duration-300"
          />
        </div>

        {/* Prix maximum */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            💸 Prix maximum
          </label>
          <input
            type="number"
            value={filters.prixMax}
            onChange={(e) => handleChange('prixMax', e.target.value)}
            placeholder="Ex: 50000"
            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}
