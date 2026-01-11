# Dashboard Véhicules - Ovarix IA

Dashboard professionnel Next.js pour la gestion et l'analyse des opportunités automobiles.

## Fonctionnalités

- **Vue d'ensemble** : Affichage en grille de toutes les annonces avec images et informations clés
- **Filtres avancés** : Recherche par marque, recommandation, prix, marge nette
- **Statistiques en temps réel** : KPIs avec nombre d'annonces par catégorie, marge moyenne, prix moyen
- **Vue détaillée** : Page complète pour chaque véhicule avec :
  - Image haute résolution
  - Caractéristiques techniques complètes
  - Analyse IA (avis expert, points forts/faibles)
  - Analyse financière détaillée (prix, marges, malus)
  - Lien vers l'annonce originale
- **Design responsive** : Fonctionne parfaitement sur mobile, tablette et desktop
- **Performance optimisée** : Chargement rapide avec Next.js 15 et React 19

## Technologies utilisées

- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage fort pour plus de robustesse
- **Tailwind CSS** : Styling moderne et responsive
- **Supabase** : Base de données PostgreSQL avec client TypeScript
- **React 19** : Dernière version de React

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Les variables d'environnement sont déjà configurées dans `.env.local` avec votre projet Supabase.

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm start` : Lance le serveur de production
- `npm run lint` : Vérifie le code avec ESLint

## Déploiement

### Vercel (recommandé)

1. Installer Vercel CLI :
```bash
npm i -g vercel
```

2. Déployer :
```bash
vercel
```

3. Configurer les variables d'environnement dans le dashboard Vercel :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Autres plateformes

L'application peut également être déployée sur :
- Netlify
- Railway
- Render
- AWS Amplify

## Structure du projet

```
dashboard/
├── app/                    # Routes Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil (liste des véhicules)
│   └── vehicules/
│       └── [id]/
│           └── page.tsx   # Page de détail d'un véhicule
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   │   └── Badge.tsx
│   ├── Filters.tsx       # Composant de filtrage
│   ├── StatsCards.tsx    # Cartes de statistiques
│   └── VehiculeCard.tsx  # Carte d'annonce
├── lib/                  # Utilitaires
│   ├── supabase.ts       # Client Supabase
│   └── utils.ts          # Fonctions utilitaires
├── types/                # Types TypeScript
│   └── database.types.ts # Types générés depuis Supabase
└── .env.local            # Variables d'environnement

```

## Personnalisation

### Couleurs et thème

Les couleurs sont définies dans `app/globals.css` et peuvent être personnalisées :

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Filtres

Les marques dans le filtre peuvent être ajoutées dans `components/Filters.tsx` :

```tsx
<option value="NouvelleMarque">Nouvelle Marque</option>
```

## Support

Pour toute question ou problème, contactez l'équipe de développement.

## Licence

Propriétaire - Ovarix IA © 2026
