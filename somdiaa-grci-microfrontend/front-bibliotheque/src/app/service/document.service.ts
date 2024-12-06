import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ResponseData} from "../models/ResponseData";
import {Document} from "../models/Document";
import {DocumentNode} from "../models/DocumentNode";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private httpHeaders:HttpHeaders= new HttpHeaders({
    "Authorization":"Bearer "+localStorage.getItem("AccesToken"),
    "Content-Type":"application/json"
  })

  constructor(private http : HttpClient) { }

  public afficherDocuments(id : number) : Observable<Document[]> {
    return this.http.get<Document[]>(environment.backendAPI + `bibliotheque/library/afficher-bibliotheque?folderId=${id}`, {headers:this.httpHeaders});
  }

  public afficherFileAriane(id : number)  {
    return this.http.get(environment.backendAPI + `bibliotheque/library/${id}/label-documents-parents`, {headers:this.httpHeaders});
  }

  public afficherDocumentsArchives() : Observable<Document[]> {
    return this.http.get<Document[]>(environment.backendAPI + `bibliotheque/library/afficher-documents-archive`, {headers:this.httpHeaders});
  }

  public lodDocumentForm() : Observable<DocumentNode[]> {
    return this.http.get<DocumentNode[]>(environment.backendAPI + "bibliotheque/library/load-document-form", {headers:this.httpHeaders});
  }

  public rechercherDocumentParNom(nomDocument: string, isArchived: boolean) : Observable<Document[]> {
    return this.http.get<Document[]>(environment.backendAPI + `bibliotheque/library/rechercher-documents-par-nom?title=${nomDocument}&isArchived=${isArchived}`, {headers:this.httpHeaders});
  }

  public afficherDocumentsParent(idFolder: number) : Observable<Document[]> {
    return this.http.get<Document[]>(environment.backendAPI + `bibliotheque/library/afficher-documents-parents?folderId=${idFolder}`, {headers:this.httpHeaders});
  }

  public creerDocument(formParams: FormData, isFolder: boolean) : Observable<Document> {

    const httpHeaders = new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("AccesToken")});

    return this.http.post<Document>(environment.backendAPI + "bibliotheque/library/creer-document", formParams, {headers: httpHeaders});
  }

  public downloadDocument(id: number)  {
    return this.http.get(environment.backendAPI + `bibliotheque/library/telecharger/${id}`, {headers: this.httpHeaders, responseType: 'blob'});
  }

  public deleteDocument(idDocument: number)   {
    return this.http.delete(environment.backendAPI + `bibliotheque/library/supprimer-document/${idDocument}`, {headers:this.httpHeaders});
  }

  public restoreDocument(idDocument: number)  {
    return this.http.put<any>(environment.backendAPI + `bibliotheque/library/restaurer-document/${idDocument}`, {},{headers:this.httpHeaders});
  }

}
