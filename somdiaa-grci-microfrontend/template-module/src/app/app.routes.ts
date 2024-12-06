import { Routes } from '@angular/router';
import { loadRemoteModule } from "@angular-architects/module-federation";
import { environment } from 'src/environments/environment';


export const TEMPLATE_ROUTES: Routes = [

{
    path: 'controle-interne',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './ControleInterne'
      })
        .then(m => m.DashbordControleInterneComponent)
  },{
    path: 'controle-interne-auto-evaluation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './AutoEvaluation'
      })
        .then(m => m.AutoEvaluationComponent)
  },{
    path: 'controle-interne-auto-evaluation-creation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './CreationAutoEvaluation'
      })
        .then(m => m.CreationAutoEvaluationComponent)
  },{
    path: 'controle-interne-auto-evaluation-modifier',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './ModifierAutoEvaluation'
      })
        .then(m => m.ModifierAutoEvaluationComponent)
  },{
    path: 'controle-interne-auto-evaluation-controle',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './AutoEvaluationControle'
      })
        .then(m => m.ControleComponent)
  },{
    path: 'controle-interne-auto-evaluation-questionnaires',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './QuestionnairesAutoEvaluation'
      })
        .then(m => m.QuestionnairesComponent)
  },{
    path: 'controle-interne-auto-evaluation-questionnaires-creation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './CreationQuestionnairesAutoEvaluation'
      })
        .then(m => m.CreationQuestionnaireComponent)
  },{
    path: 'controle-interne-auto-evaluation-questionnaire-modifier',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './ModifierQuestionnaire'
      })
        .then(m => m.ModifierQuestionnaireComponent)
  },{
    path: 'controle-interne-auto-evaluation-questionnaire-dupliquer',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './DupliquerQuestionnaire'
      })
        .then(m => m.DupliquerQuestionnaireComponent)
  },{
    path: 'controle-interne-diagnostic-flash',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './DiagnosticFlash'
      })
        .then(m => m.DiagnosticFlashComponent)
  },{
    path: 'controle-interne-diagnostic-flash-matrice',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './DiagnosticFlashMatriceAuto'
      })
        .then(m => m.NavBelowComponent)
  },{
    path: 'controle-interne-diagnostic-flash-referentiel',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './DiagnosticFlashReferentiel'
      })
        .then(m => m.NavBelowComponent)
  },{
    path: 'controle-interne-diagnostic-flash-validation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './DiagnosticFlashWorkflowValidation'
      })
        .then(m => m.NavBelowComponent)
  },{
    path: 'controle-interne-diagnostic-flash-synthese',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './DiagnosticFlashSynthese'
      })
        .then(m => m.NavBelowComponent)
  },{
    path: 'suivi-incidents',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './SuiviIncident'
      })
        .then(m => m.SuiviIncidentComponent)
  },{
    path: 'suivi-incidents-declaration',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './Declaration'
      })
        .then(m => m.DeclarationComponent)
  },{
    path: 'suivi-incidents-modifier-declaration',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './ModifierDeclaration'
      })
        .then(m => m.ModifierDeclarationComponent)
  },{
    path: 'suivi-incidents-detail',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './Details'
      })
        .then(m => m.DetailsComponent)
  },{
    path: 'suivi-incidents-document',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './Documents'
      })
        .then(m => m.DocumentsComponent)
  },{
    path: 'suivi-incidents-suivi-incident-workflow',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './SuiviIncidentWorkflow'
      })
        .then(m => m.SuiviIncidentWorkflowComponent)

  },{
    path: 'suivi-incidents-plan-action',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './PlanAction'
      })
        .then(m => m.PlanActionComponent)
  },{
    path: 'suivi-incidents-validation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './Validation'
      })
        .then(m => m.ValidationComponent)
  },{
    path: 'suivi-incidents-analyses',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './Analyses'
      })
        .then(m => m.AnalysesComponent)
  },{
    path: 'suivi-incidents-resultat-analyses',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './ResultatAnalyses'
      })
        .then(m => m.ResultatAnalyseComponent)
  },{
    path: 'suivi-incidents-list',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './SuiviIncidentList'
      })
        .then(m => m.SuiviIncidentListComponent)
  },{
    path: 'suivi-incidents-rapport',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './Rapport'
      })
        .then(m => m.RapportComponent)

  }
  ,{
    path: 'suivi-incidents-validation-detail',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './ValidationDetail'
      })
        .then(m => m.ValidationDetailComponent)

  },{
    path: 'suivi-incidents-plan-action-new',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.suiviIncident,
        exposedModule: './AddPlanAction'
      })
        .then(m => m.NewPlanActionComponent)

  },{

    path: 'controle-interne-auto-evaluation-realisation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './RealisationAutoEvaluation'
      })
        .then(m => m.RealisationAutoEvaluationComponent)
  },{
    path: 'controle-interne-diagnostic-flash-historique',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './DiagnosticFlashHistorique'
      })
        .then(m => m.NavBelowComponent)
  },{
    path: 'controle-interne-diagnostic-flash-nav-below',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.controleInterne,
        exposedModule: './DiagnosticFlashNavBelow'
      })
        .then(m => m.NavBelowComponent)
  },{
    path: 'configuration-user',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.config,
        exposedModule: './configuration'
      })
        .then(m => m.NavComponent)
  },{
    path: 'configuration-metier',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.config,
        exposedModule: './configurationMetier'
      })
        .then(m => m.NavComponent)
  },{
    path: 'configuration-perimetre',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.config,
        exposedModule: './configurationPerimetre'
      })
        .then(m => m.NavComponent)
  },{
    path: 'configuration-groupe',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.config,
        exposedModule: './configurationGroupe'
      })
        .then(m => m.NavComponent)
  },{
    path: 'profil-user',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.config,
        exposedModule: './ProfilUser'
      })
        .then(m => m.ProfilUserComponent)
  },{
    path: 'general-dashboard',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.config,
        exposedModule: './GeneralDashboard'
      })
        .then(m => m.DashboardGeneraleComponent)
  },{
    path: 'dashbord-audit-interne',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.auditInterne,
        exposedModule: './DashAuditInterne'
      })
        .then(m => m.DashbordAuditInterneComponent)
  },{
    path: 'plan-audit',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.auditInterne,
        exposedModule: './PlanAudit'
      })
        .then(m => m.PlanAuditComponent)
  },{
    path: 'audit-checklist-list',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.auditInterne,
        exposedModule: './AuditChecklistList'
      })
        .then(m => m.ChecklistComponent)
  }/*,{
    path: 'audit-checklist-create',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.auditInterne,
        exposedModule: './ChecklistCreate'
      })
        .then(m => m.ChecklistCreateComponent)
  }*/,{
    path: 'mission-audit-list',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.auditInterne,
        exposedModule: './MissionAuditList'
      })
        .then(m => m.MissionAuditListComponent)
  },{
    path: 'audit-checklist',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.auditInterne,
        exposedModule: './CheckList '
      })
        .then(m => m.MenuAuditComponent)
  },{
    path: 'mission-audit-created',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.auditInterne,
        exposedModule: './MissionAuditCreation'
      })
        .then(m => m.MissionAuditCreatedComponent)
  },{
    path: 'plan-daction-recommandation-detail',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.planAction,
        exposedModule: './PlanActionRecommandationDetail'
      })
        .then(m => m.RecommandationDetailComponent)
  },{
    path: 'plan-daction-accueil',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.planAction,
        exposedModule: './PlanActionAccueil'
      })
        .then(m => m.PlanDactionAccueilComponent)
  },{

    path: 'plan-daction-recommandations',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.planAction,
        exposedModule: './PlanActionRecommandations'
      })
        .then(m => m.RecommandationsComponent)
  },{
    path: 'plan-daction-creation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.planAction,
        exposedModule: './PlanActionCreation'
      })
        .then(m => m.PlanDactionCreationComponent)
  },{
    path: 'plan-daction-liste-tout',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.planAction,
        exposedModule: './PlanActionListeTout'
      })
        .then(m => m.PlanDactionListeToutComponent)
  },{
    path: 'plan-daction-realisation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.planAction,
        exposedModule: './PlanActionRealisation'
      })
        .then(m => m.PlanDactionRealisationComponent)
  },{
    path: 'details-mission-audit',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.auditInterne,
        exposedModule: './DetailsAuditInterne'
      })
        .then(m => m.DetailsMissionComponent)
  },{
    path: 'bibliotheque',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.bibliotheque,
        exposedModule: './Bibliotheque'
      })
        .then(m => m.BibliothequeComponent)
  },{
    path: 'bibliotheque-archives',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.bibliotheque,
        exposedModule: './Archives'
      })
        .then(m => m.ArchivesComponent)
  },{
    path: 'plan-daction-tache-liste',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.planAction,
        exposedModule: './TacheListe'
      })
        .then(m => m.TacheListeComponent)
  },{
    path: 'plan-daction-tache-realisation',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.planAction,
        exposedModule: './TacheRealisation'
      })
        .then(m => m.TacheRealisationComponent)
  },{
    path: 'cartographie-processus-finance',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.cartographie_risques,
        exposedModule: './CrFinance'
      })
        .then(m => m.CrFinanceComponent)
  },{
    path: 'cartographie-processus-achats',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.cartographie_risques,
        exposedModule: './CrAchats'
      })
        .then(m => m.CrAchatsComponent)
  },{
    path: 'cartographie-processus-logistique',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.cartographie_risques,
        exposedModule: './CrLogistique'
      })
        .then(m => m.CrLogistiqueComponent)
  },{
    path: 'cartographie-processus-commercial',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.cartographie_risques,
        exposedModule: './CrCommercial'
      })
        .then(m => m.CrCommercialComponent)
  },{
    path: 'cartographie-processus-rh',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.cartographie_risques,
        exposedModule: './CrRh'
      })
        .then(m => m.CrRhComponent)
  },{
    path: 'cartographie-risques',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.cartographie_risques,
        exposedModule: './Risques'
      })
        .then(m => m.RisquesComponent)
  }

];
