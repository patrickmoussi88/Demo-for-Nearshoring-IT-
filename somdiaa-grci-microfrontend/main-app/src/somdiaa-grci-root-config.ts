/**
 * Les routes de l'application sont gérées ici
 */
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "home",
  app: () => import("home/Home"),
  activeWhen: ["home", () => ["/", ""].includes(location.pathname)],
});

/**
 * Toutes les routes en dehors du Home sont redirigées vers le microfront template module
 * Qui contient le menu commun à tous ces modules.
 */
registerApplication({

  name: "template",
  app: () => import("dashbord_template/Template"),
  activeWhen: [
    //"plan-action",
    "controle-interne",
    "controle-interne-auto-evaluation",
    "controle-interne-auto-evaluation-creation",
    "controle-interne-auto-evaluation-modifier",
    "controle-interne-auto-evaluation-controle",
    "controle-interne-auto-evaluation-questionnaires",
    "controle-interne-auto-evaluation-questionnaires-creation",
    "controle-interne-auto-evaluation-questionnaire-modifier",
    "controle-interne-auto-evaluation-questionnaire-dupliquer",
    "controle-interne-diagnostic-flash",
    "controle-interne-diagnostic-flash-validation",
    "controle-interne-diagnostic-flash-referentiel",
    "controle-interne-diagnostic-flash-matrice",
    "controle-interne-diagnostic-flash-synthese",
    "controle-interne-auto-evaluation-realisation",
    "controle-interne-diagnostic-flash-historique",
    "controle-interne-diagnostic-flash-nav-below",
    "config-hugo",
    "configuration-user",
    "configuration-metier",
    "configuration-perimetre",
    "configuration-groupe",
    "profil-user",
    "general-dashboard",
    "dashbord-audit-interne",
    "plan-audit",
    "mission-audit-list",
    //"audit-checklist-create",
    "audit-checklist-list",
    "mission-audit-created",
    "suivi-recommandations",
    "suivi-incidents",
    "suivi-incidents-declaration",
    "suivi-incidents-modifier-declaration",
    "suivi-incidents-detail",
    "suivi-incidents-document",
    "suivi-incidents-plan-action",
    "suivi-incidents-validation",
    "suivi-incidents-analyses",
    "suivi-incidents-resultat-analyses",
    "suivi-incidents-list",
    "new-suivi-incidents",
    "suivi-incidents-validation-detail",
    "suivi-incidents-plan-action-new",
    "suivi-incidents-rapport",
    "plan-daction-recommandations",
    "plan-daction-recommandation-detail",
    "plan-daction-tache-realisation",
    "plan-daction-tache-liste",
    "plan-daction-accueil",
    "plan-daction-realisation",
    "plan-daction-liste-tout",
    "plan-daction-creation",
    "details-mission-audit",
    "bibliotheque",
    "bibliotheque-archives",
    "cartographie-risques",
    "cartographie-processus-finance",
    "cartographie-processus-achats",
    "cartographie-processus-logistique",
    "cartographie-processus-commercial",
    "cartographie-processus-rh"
  ],
});

start();
