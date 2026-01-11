export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(price: number | null | undefined): string {
  if (!price) return 'N/A'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatNumber(num: number | null | undefined): string {
  if (!num) return 'N/A'
  return new Intl.NumberFormat('fr-FR').format(num)
}

export function getRecommendationColor(recommandation: string | null) {
  switch (recommandation?.toUpperCase()) {
    case 'ACHAT IMMÉDIAT':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'À NÉGOCIER':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'À ÉVITER':
      return 'bg-red-100 text-red-800 border-red-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

export function getRecommendationEmoji(recommandation: string | null) {
  switch (recommandation?.toUpperCase()) {
    case 'ACHAT IMMÉDIAT':
      return '🟢'
    case 'À NÉGOCIER':
      return '🟡'
    case 'À ÉVITER':
      return '🔴'
    default:
      return '⚪'
  }
}
