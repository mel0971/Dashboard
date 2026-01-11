export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      config_business: {
        Row: {
          cle: string
          description: string | null
          valeur_numerique: number | null
        }
        Insert: {
          cle: string
          description?: string | null
          valeur_numerique?: number | null
        }
        Update: {
          cle?: string
          description?: string | null
          valeur_numerique?: number | null
        }
        Relationships: []
      }
      ref_malus_ecologique: {
        Row: {
          annee_bareme: number
          id: number
          montant_taxe: number
          seuil_co2_max: number
          seuil_co2_min: number
        }
        Insert: {
          annee_bareme: number
          id?: number
          montant_taxe: number
          seuil_co2_max: number
          seuil_co2_min: number
        }
        Update: {
          annee_bareme?: number
          id?: number
          montant_taxe?: number
          seuil_co2_max?: number
          seuil_co2_min?: number
        }
        Relationships: []
      }
      vehicules: {
        Row: {
          annee_mise_circulation: number | null
          avis_expert: string | null
          boite_vitesse: string | null
          carburant: string | null
          co2_g_km: number | null
          co2_wltp_corrige: number | null
          cout_malus_estime: number | null
          cylindree_cc: number | null
          date_creation: string | null
          date_mise_a_jour: string | null
          description_raw: string | null
          details_risques: string | null
          est_neuf_fiscal: boolean | null
          est_tva_recuperable: boolean | null
          etat_vehicule: string | null
          frais_totaux_estimes: number | null
          id: string
          id_externe: string | null
          image_principale: string | null
          kilometrage: number | null
          malus_poids_estime: number | null
          marge_nette_estimee: number | null
          marque: string | null
          modele: string | null
          pays_origine: string | null
          poids: number | null
          points_faibles: string | null
          points_forts: string | null
          prix_affiche_achat: number | null
          prix_estime_revente_fr: number | null
          provenance_hors_ue: boolean | null
          puissance_ch: number | null
          recommandation: string | null
          scoring_global: number | null
          source_site: string
          statut_traitement: string | null
          titre_annonce: string | null
          TVA_allemande: number | null
          url_annonce: string
        }
        Insert: {
          annee_mise_circulation?: number | null
          avis_expert?: string | null
          boite_vitesse?: string | null
          carburant?: string | null
          co2_g_km?: number | null
          co2_wltp_corrige?: number | null
          cout_malus_estime?: number | null
          cylindree_cc?: number | null
          date_creation?: string | null
          date_mise_a_jour?: string | null
          description_raw?: string | null
          details_risques?: string | null
          est_neuf_fiscal?: boolean | null
          est_tva_recuperable?: boolean | null
          etat_vehicule?: string | null
          frais_totaux_estimes?: number | null
          id?: string
          id_externe?: string | null
          image_principale?: string | null
          kilometrage?: number | null
          malus_poids_estime?: number | null
          marge_nette_estimee?: number | null
          marque?: string | null
          modele?: string | null
          pays_origine?: string | null
          poids?: number | null
          points_faibles?: string | null
          points_forts?: string | null
          prix_affiche_achat?: number | null
          prix_estime_revente_fr?: number | null
          provenance_hors_ue?: boolean | null
          puissance_ch?: number | null
          recommandation?: string | null
          scoring_global?: number | null
          source_site: string
          statut_traitement?: string | null
          titre_annonce?: string | null
          TVA_allemande?: number | null
          url_annonce: string
        }
        Update: {
          annee_mise_circulation?: number | null
          avis_expert?: string | null
          boite_vitesse?: string | null
          carburant?: string | null
          co2_g_km?: number | null
          co2_wltp_corrige?: number | null
          cout_malus_estime?: number | null
          cylindree_cc?: number | null
          date_creation?: string | null
          date_mise_a_jour?: string | null
          description_raw?: string | null
          details_risques?: string | null
          est_neuf_fiscal?: boolean | null
          est_tva_recuperable?: boolean | null
          etat_vehicule?: string | null
          frais_totaux_estimes?: number | null
          id?: string
          id_externe?: string | null
          image_principale?: string | null
          kilometrage?: number | null
          malus_poids_estime?: number | null
          marge_nette_estimee?: number | null
          marque?: string | null
          modele?: string | null
          pays_origine?: string | null
          poids?: number | null
          points_faibles?: string | null
          points_forts?: string | null
          prix_affiche_achat?: number | null
          prix_estime_revente_fr?: number | null
          provenance_hors_ue?: boolean | null
          puissance_ch?: number | null
          recommandation?: string | null
          scoring_global?: number | null
          source_site?: string
          statut_traitement?: string | null
          titre_annonce?: string | null
          TVA_allemande?: number | null
          url_annonce?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type Vehicule = Tables<"vehicules">
