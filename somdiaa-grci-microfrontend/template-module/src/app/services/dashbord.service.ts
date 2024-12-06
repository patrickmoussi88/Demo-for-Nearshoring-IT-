import { Injectable } from '@angular/core';
import {DashbordData} from "../models/dashbord-data";
import {AlertsData} from "../models/alerts-data";
import {ProfileFunctions} from "../models/profile-functions";
import {Features} from "../models/features";

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

    data: DashbordData = {
        logoImage : {src: "/images/logo.jpg", alt: ""},
        amicoImage : {src: "/images/amico.png", alt: ""},
        somdiaaImage : {src: "/images/logoSomdiaa.png", alt: "logo somdiaa"},
        languageIcon : {src: "/images/icons/Icons-OJ.png", alt: "Icon language"},
        justIcon : {src: "/images/just-Icons.svg", alt: ""},
        homeIllustration : {src: "/images/home-illustration.svg", alt: ""},
        bellSvg : {src: "/images/icons/bell.svg", alt: ""},
        profilSvg : {src: "/images/icons/profil.svg", alt: ""},
        troisPoints : {src: "/images/icons/trois-points.svg", alt: ""},
        dashbordImage : {title: "Tableau de bord", src: "/images/icons/dashboard-icon.svg", alt: ""},
        moduleList : [
            {title: "Cartographie des risques", src: "/images/icons/controle-icon.svg", alt: "", index: 0},
            {title: "Contrôle interne", src: "/images/icons/controle-icon.svg", alt: "", index: 1},
            {title: "Audit interne", src: "/images/icons/controle-icon.svg", alt: "", index: 2},
            {title: "Suivi des incidents", src: "/images/icons/incidents-icon.svg", alt: "", index: 3},
            {title: "Plan d'action", src: "/images/icons/controle-icon.svg", alt: "", index: 4},
            {title: "Reste à faire", src: "/images/icons/reste-a-faire-icon.svg", alt: "", index: 5},
            {title: "Bibliothèque", src: "/images/icons/controle-icon.svg", alt: "", index: 6},
            {title: "Configuration", src: "/images/icons/Config-icon.svg", alt: "", index: 7}
        ],
    };

    alerts: AlertsData[] = [
        {date: "December 12, 2019", content: "A new monthly report is ready to download!", type: "primary"},
        {date: "December 7, 2019", content: "$290.29 has been deposited into your account!", type: "success"},
        {date: "December 2, 2019", content: "Spending Alert: We've noticed unusually high spending for your account.", type: "warning"}
    ];

    profileFunctions: ProfileFunctions[] = [
        {description: "Profile", index: 0, class: "fa-user",link:"profil-user"},
        {description: "Déconnexion", index: 1, class: "fa-sign-out-alt",link: ""}
    ];

    features: Features[] = [
        {title: "Tableau de bord", index: 0, src: "/images/icons/dashboard-icon.svg", alt: "", id: "", collapse: false, items: [], link: "general-dashboard",authorities:["ET_READ","CI_READ","AI_READ","PA_READ","AI_MISSION_READ","PA_PLANACTION_READ","CI_AUTOEVALUATION_READ","CI_DIAGNOSTICFLASH_READ"]},
        {title: "Cartographie des risques", index: 1, src: "/images/icons/cartographie-icon.svg", alt: "", id: "cartographie", collapse: true,authorities:["CR_READ","CR_WRITE","CR_RISQUE_WRITE","CR_RISQUE_READ","CR_PROCESSUS_WRITE","CR_PROCESSUS_READ"],
            items: [
                {name: "Risques", class: "", pathModule: "cartographie-risques",authorities:["CR_READ","CR_WRITE","CR_RISQUE_WRITE","CR_RISQUE_READ"]},
                {name: "cartographie des processus", class: "", pathModule: "cartographie-processus-finance",authorities:["CR_READ","CR_WRITE","CR_PROCESSUS_WRITE","CR_PROCESSUS_READ"]}
            ],
            link: "",
        },
        {title: "Contrôle interne", index: 2, src: "/images/icons/controle-icon.svg", alt: "", id: "controle-interne", collapse: true,authorities:["CI_READ","CI_WRITE","CI_AUTOEVALUATION_READ","CI_AUTOEVALUATION_WRITE","CI_QUESTIONNAIRE_READ","CI_QUESTIONNAIRE_WRITE","CI_CONTROLEEVALUATION_READ","CI_CONTROLEEVALUATION_WRITE","CI_DIAGNOSTICFLASH_READ","CI_DIAGNOSTICFLASH_WRITE"],
            items: [
                {name: "Tableau de bord", class: "sous-menu", pathModule: "controle-interne",authorities:["CI_READ","CI_AUTOEVALUATION_READ","CI_DIAGNOSTICFLASH_READ"]},
                {name: "Auto-évaluation", class: "", pathModule: "controle-interne-auto-evaluation",authorities:["CI_READ","CI_WRITE","CI_AUTOEVALUATION_READ","CI_AUTOEVALUATION_WRITE","CI_QUESTIONNAIRE_READ","CI_QUESTIONNAIRE_WRITE","CI_CONTROLEEVALUATION_READ","CI_CONTROLEEVALUATION_WRITE"]},
                {name: "Diagnostic Flash", class: "", pathModule: "controle-interne-diagnostic-flash",authorities:["CI_READ","CI_WRITE","CI_DIAGNOSTICFLASH_READ","CI_DIAGNOSTICFLASH_WRITE"]}
            ],
            link: ""
        },
        {title: "Audit interne", index: 3, src: "/images/icons/audit-icon.svg", alt: "", id: "audit-interne", collapse: true,authorities:["AI_READ","AI_WRITE","AI_MISSION_WRITE","AI_MISSION_READ","PA_READ","PA_PLANACTION_READ","PA_RECOMMANDATION_READ"],
            items: [
                {name: "Tableau de bord", class: "", pathModule: "dashbord-audit-interne",authorities:["AI_READ","AI_WRITE","AI_MISSION_WRITE","AI_MISSION_READ","PA_READ","PA_PLANACTION_READ","PA_RECOMMANDATION_READ"]},
                {name: "Plan d'audit", class: "", pathModule: "plan-audit",authorities:["AI_READ","AI_WRITE","AI_MISSION_WRITE","AI_MISSION_READ"]},
                {name: "Mission d'audit", class: "", pathModule: "mission-audit-list",authorities:["AI_READ","AI_WRITE","AI_MISSION_WRITE","AI_MISSION_READ"]}
            ],
            link: ""
        },


        {title: "Plan d'action", index: 5, src: "/images/icons/plan-action-icon.svg", alt: "", id: "", collapse: false, items: [], link: "plan-daction-liste-tout",authorities:["PA_READ","PA_WRITE","PA_PLANACTION_WRITE","PA_PLANACTION_READ"]},

        {title: "Suivi des incidents", index: 4, src: "/images/icons/incidents-icon.svg", alt: "", id: "", collapse: false, items: [], link: "suivi-incidents",authorities: ["ET_READ","ET_WRITE","ET_INCIDENT_WRITE","ET_INCIDENT_READ"]},

      {title: "Recommandations", index: 5, src:  "/images/icons/incidents-icon.svg", alt: "", id: "", collapse: false, items: [], link: "plan-daction-recommandations",authorities: ["PA_READ","PA_WRITE","PA_RECOMMANDATION_WRITE","PA_RECOMMANDATION_READ"]},
      {title: "Tache", index: 8, src:  "/images/icons/reste-a-faire-icon.svg", alt: "", id: "", collapse: false, items: [], link: "plan-daction-tache-liste",authorities: ["PA_READ","PA_WRITE","PA_TACHE_WRITE","PA_TACHE_READ"]},

        {title: "Bibliothèque", index: 6, src: "/images/icons/bibliotheque-icon.svg", alt: "", id: "", collapse: false, items: [], link: "bibliotheque",authorities: ["LIB_READ","LIB_WRITE","LIB_DOCUMENT_WRITE","LIB_DOCUMENT_READ"]},
        {title: "Configuration", index: 7, src: "/images/icons/Config-icon.svg", alt: "", id: "config", collapse: true,authorities: [],
            items: [
              {name: "Utilisateurs", class: "", pathModule: "configuration-user",authorities:["CONF_READ","CONF_WRITE","CONF_USER_READ","CONF_USER_WRITE"]},
              {name: "Groupes & permissions", class: "", pathModule: "configuration-groupe",authorities:["CONF_READ","CONF_WRITE","CONF_GROUP_READ","CONF_GROUP_WRITE"]},
              {name: "Périmètres", class: "", pathModule: "configuration-perimetre",authorities:["CONF_READ","CONF_WRITE","CONF_PERIMETRE_READ","CONF_PERIMETRE_WRITE"]},
              {name: "Métiers", class: "", pathModule: "configuration-metier",authorities:["CONF_READ","CONF_WRITE","CONF_METIER_READ","CONF_METIER_WRITE"]},
              /*{name: "Processus", class: "", pathModule: "configuration"},*/
              {name: "Profil", class: "", pathModule: "profil-user",authorities:[]},
              {name: "Change mot de passe", class: "", pathModule: "profil-user",authorities:[]}
            ],
            link: ""
        },
        //{title: "Notifications", index: 8, src: "/images/icons/notification-icon.svg", alt: "", id: "", collapse: false, items: []},
        //{title: "Reste à faire", index: 9, src: "/images/icons/reste-a-faire-icon.svg", alt: "", id: "", collapse: false, items: []}
    ];
}
