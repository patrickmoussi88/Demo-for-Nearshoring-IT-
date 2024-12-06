import { Injectable } from '@angular/core';
import {HomeData} from "../models/home-data";
import {AlertsData} from "../models/alerts-data";
import {ProfileFunctions} from "../models/profile-functions";
import {Features} from "../models/features";
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../models/response-message';
import { NotificationPage } from '../models/notification-page';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

    constructor(private http:HttpClient ) {
    }
    private NOTIFURL:string=environment.baseUrl+"/notification"

    data: HomeData = {
        logoImage : {src: "/images/logo.jpg", alt: ""},
        amicoImage : {src: "/images/amico.png", alt: ""},
        somdiaaImage : {src: "/images/logoSomdiaa.png", alt: "logo somdiaa"},
        languageIcon : {src: "/images/icons/Icons-OJ.png", alt: "Icon language"},
        justIcon : {src: "/images/just-Icons.svg", alt: ""},
        homeIllustration : {src: "/images/home-illustration.svg", alt: ""},
        bellSvg : {src: "/images/icons/bell.svg", alt: ""},
        profilSvg : {src: "/images/icons/profil.svg", alt: ""},
        troisPoints : {src: "/images/icons/trois-points.svg", alt: ""},
        moduleList : [
            {title: "Cartographie des risques", src: "/images/icons/controle-icon.svg", alt: "", index: 0,  authorities:["CR_READ","CR_WRITE","CR_RISQUE_WRITE","CR_PROCESSUS_WRITE","CR_CONTROLE_WRITE","CR_CONTROLE_READ","CR_RISQUE_READ","CR_PROCESSUS_READ"]},
            {title: "Contrôle interne", src: "/images/icons/controle-icon.svg", alt: "", index: 1,          authorities: ["CI_READ","CI_WRITE","CI_AUTOEVALUATION_READ","CI_AUTOEVALUATION_WRITE","CI_QUESTIONNAIRE_READ","CI_QUESTIONNAIRE_WRITE","CI_DIAGNOSTICFLASH_READ","CI_DIAGNOSTICFLASH_WRITE","CI_CONTROLEEVALUATION_READ","CI_CONTROLEEVALUATION_WRITE"]},
            {title: "Audit interne", src: "/images/icons/controle-icon.svg", alt: "", index: 2,             authorities: ["AI_READ","AI_WRITE","AI_MISSION_WRITE","AI_MISSION_READ"]},
            {title: "Suivi des incidents", src: "/images/icons/incidents-icon.svg", alt: "", index: 3,      authorities: ["ET_READ","ET_WRITE","ET_INCIDENT_WRITE","ET_INCIDENT_READ"]},
            {title: "Plan d'action", src: "/images/icons/controle-icon.svg", alt: "", index: 4,             authorities: ["PA_READ","PA_WRITE","PA_PLANACTION_WRITE","PA_PLANACTION_READ","PA_RECOMMANDATION_WRITE","PA_RECOMMANDATION_READ"]},
            {title: "Tache", src: "/images/icons/reste-a-faire-icon.svg", alt: "", index: 5,                authorities: ["PA_READ","PA_WRITE","PA_TACHE_WRITE","PA_TACHE_READ"]},
            {title: "Bibliothèque", src: "/images/icons/controle-icon.svg", alt: "", index: 6,              authorities: ["LIB_READ","LIB_WRITE","LIB_DOCUMENT_WRITE","LIB_DOCUMENT_READ"]},
            {title: "Configuration", src: "/images/icons/Config-icon.svg", alt: "", index: 7,               authorities: ["CONF_READ","CONF_WRITE","CONF_USER_READ","CONF_USER_WRITE","CONF_GROUP_READ","CONF_GROUP_WRITE","CONF_PERIMETRE_READ","CONF_PERIMETRE_WRITE","CONF_METIER_READ","CONF_METIER_WRITE"]}
        ],
    };

    alerts: AlertsData[] = [
        {date: "December 12, 2019", content: "A new monthly report is ready to download!", type: "primary"},
        {date: "December 7, 2019", content: "$290.29 has been deposited into your account!", type: "success"},
        {date: "December 2, 2019", content: "Spending Alert: We've noticed unusually high spending for your account.", type: "warning"}
    ];

    profileFunctions: ProfileFunctions[] = [
        {description: "Profile", index: 0,link: "profil-user"},
        {description: "Logout", index: 1,link:""}
    ];

    features: Features[] = [
        {title: "Tableau de bord", index: 0, src: "/images/icons/dashboard-icon.svg", alt: "", link: "general-dashboard", authorities: ["ET_READ","CI_READ","AI_READ","PA_READ","AI_MISSION_READ","PA_PLANACTION_READ","CI_AUTOEVALUATION_READ","CI_DIAGNOSTICFLASH_READ"]},
        {title: "Cartographie des risques", index: 1, src: "/images/icons/cartographie-icon.svg", alt: "", link: "cartographie-risques",authorities:["CR_READ","CR_WRITE","CR_RISQUE_WRITE","CR_PROCESSUS_WRITE","CR_CONTROLE_WRITE","CR_CONTROLE_READ","CR_RISQUE_READ","CR_PROCESSUS_READ"]},
        {title: "Contrôle interne", index: 2, src: "/images/icons/controle-icon.svg", alt: "", link: "controle-interne", authorities: ["CI_READ","CI_WRITE","CI_AUTOEVALUATION_READ","CI_AUTOEVALUATION_WRITE","CI_QUESTIONNAIRE_READ","CI_QUESTIONNAIRE_WRITE","CI_DIAGNOSTICFLASH_READ","CI_DIAGNOSTICFLASH_WRITE","CI_CONTROLEEVALUATION_READ","CI_CONTROLEEVALUATION_WRITE"]},
        {title: "Audit interne", index: 3, src: "/images/icons/audit-icon.svg", alt: "", link: "dashbord-audit-interne",authorities: ["AI_READ","AI_WRITE","AI_MISSION_WRITE","AI_MISSION_READ"]},
        {title: "Suivi des incidents", index: 4, src: "/images/icons/incidents-icon.svg", alt: "", link: "suivi-incidents",authorities: ["ET_READ","ET_WRITE","ET_INCIDENT_WRITE","ET_INCIDENT_READ"]},
        {title: "Plan d'action", index: 5, src: "/images/icons/plan-action-icon.svg", alt: "", link: "plan-daction-liste-tout", authorities: ["PA_READ","PA_WRITE","PA_PLANACTION_WRITE","PA_PLANACTION_READ","PA_RECOMMANDATION_WRITE","PA_RECOMMANDATION_READ"]},
        {title: "Reste à faire", index: 6, src: "/images/icons/reste-a-faire-icon.svg", alt: "", link: "plan-daction-tache-liste",  authorities: ["PA_READ","PA_WRITE","PA_TACHE_WRITE","PA_TACHE_READ"]},
        {title: "Bibliothèque", index: 7, src: "/images/icons/bibliotheque-icon.svg", alt: "", link: "bibliotheque", authorities: ["LIB_READ","LIB_WRITE","LIB_DOCUMENT_WRITE","LIB_DOCUMENT_READ"]},
        {title: "Notifications", index: 8, src: "/images/icons/notification-icon.svg", alt: "", link: "notification",authorities: []},
        {title: "Configuration", index: 9, src: "/images/icons/Config-icon.svg", alt: "", link: "configuration-user", authorities: ["CONF_READ","CONF_WRITE","CONF_USER_READ","CONF_USER_WRITE","CONF_GROUP_READ","CONF_GROUP_WRITE","CONF_PERIMETRE_READ","CONF_PERIMETRE_WRITE","CONF_METIER_READ","CONF_METIER_WRITE"]}
    ];

    getNotificationOfUser(pagenum:number=0,pagesize:number=10):Observable<ResponseMessage<NotificationPage>>{
      /* let httpHeaders:HttpHeaders= new HttpHeaders({
            "Authorization":"Bearer "+localStorage.getItem("AccesToken"),
            "Content-Type":"application/json"
        })*/
        let queryParams = new HttpParams();
        queryParams = queryParams.append("pagenum",pagenum);
        queryParams = queryParams.append("pagesize",pagesize);
        return this.http.get<ResponseMessage<NotificationPage>>(this.NOTIFURL+"/user"/*,{params:queryParams,headers:httpHeaders}*/)
    }
}
