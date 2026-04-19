export declare class Stock {
    id: number;
    code_article: string;
    designation: string;
    fournisseur: string;
    emplacement: string;
    quantite_disponible: number;
    quantite_bloquee: number;
    quantite_en_cours: number;
    seuil_min: number;
    seuil_max: number;
    consommation_journaliere: number;
    valeur_unitaire: number;
    date_maj: Date;
}
