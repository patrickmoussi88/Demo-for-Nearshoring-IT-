import {Component, OnInit} from '@angular/core';
import {Images} from "../enums/Images/Images";
import {AssertUrlPipe} from "../pipes/assert-url-pipe";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Observable, tap} from "rxjs";
import {DocumentService} from "../service/document.service";
import {saveAs} from "file-saver";
import {Router} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
declare let $:any;

@Component({
  standalone : true,
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css'],
  imports: [AssertUrlPipe, AsyncPipe, DatePipe, NgForOf, NgIf, FormsModule]
})
export class ArchivesComponent implements OnInit{
  images = Images
  listDocument$!: Observable<any>;
  nomDocument!: string;
  idDocumentToRestore!: number;

  constructor(private documentService: DocumentService, private router: Router) {
  }

  ngOnInit(): void {

    this.listDocument$ = this.documentService.afficherDocumentsArchives().pipe(
      tap(console.log)
    );

  }

  redirectTo(url: string) {
    this.router.navigate([url]);
  }

  getDocumentsByName(form: NgForm): void {
    console.log(form)
    console.log(this.nomDocument)
    if (this.nomDocument.trim() != ""){
      this.listDocument$ = this.documentService.rechercherDocumentParNom(this.nomDocument, true);
    }
  }

  getMymeType(isFolder: boolean, title: string): string {
    if (isFolder) {
      return this.images.imageFolder;
    } else {
      const aFileNameComp = title.split(".");
      const extension = aFileNameComp[aFileNameComp.length - 1];
      switch (extension.toLowerCase()) {
        case "pdf":
          return this.images.imagePdfFile;
          break;
        case "docx":
          return this.images.imageWordIcon;
          break;
        case "xls":
        case "xlsx":
          return this.images.imageExcelFile;
          break;
        case "ppt":
        case "pptx":
          return this.images.imagePptIcon;
          break;
        case "jpeg":
        case "jpg":
        case "png":
          console.log(this.images.imageJpgIcon);
          return this.images.imageJpgIcon;
          break;
        default :
          return this.images.imageOtherIcon;
      }
      return '';
    }
  }

  downloadFile(idDocment: number, fileName: string): void {
    //event.stopPropagation();
    this.documentService.downloadDocument(idDocment).subscribe(
      data => saveAs(data, fileName)
    );
  }

  restoreDocument() {
    this.documentService.restoreDocument(this.idDocumentToRestore).pipe(
      tap(
        this.listDocument$ = this.documentService.afficherDocumentsArchives()
      )
    ).subscribe({
      next: value => {
        $("#modalRestore").modal('show');
      }
    });
  }

  setIdDocumentToRestore(documentId: number) {
    this.idDocumentToRestore = documentId;
  }
}
