import {Component, OnInit} from '@angular/core';
import {AssertUrlPipe} from "../pipes/assert-url-pipe";
import {Images} from "../enums/Images/Images";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable, switchMap, tap} from "rxjs";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DocumentService} from "../service/document.service";
import {Document} from "../models/Document";
import {saveAs} from "file-saver";

import {CdkTreeModule, FlatTreeControl} from '@angular/cdk/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import {DocumentNode} from "../models/DocumentNode";
import {CdkTableModule} from "@angular/cdk/table";
import {ArrayDataSource} from '@angular/cdk/collections';
import {DocumentRelatedContent} from "../models/DocumentRelatedContent";
import {MatRadioModule} from "@angular/material/radio";
import {Router} from "@angular/router";


@Component({
  standalone: true,
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.css'],
  imports: [AssertUrlPipe, ReactiveFormsModule, FormsModule, NgIf, AsyncPipe, NgForOf, DatePipe, CdkTreeModule, CdkTableModule, MatRadioModule, NgClass]
})
export class BibliothequeComponent implements OnInit {

  newDocument!: FormGroup;
  images = Images;
  //document$!: Observable<Document>;
  document$!: Observable<any>;
  //formDocument$!: Observable<any>;
  treeDocumentNode$!: Observable<DocumentNode[]>;
  //listDocument$!: Observable<Document[]>;
  listDocument$!: Observable<any>;
  file!: File;
  nomDocument!: string;
  selectedNode!: number;
  selectedParentNode!: number;
  dataSource!: ArrayDataSource<any>;
  idDocumentToDelete!: number;
  filAriane$!: Observable<any>;
  protected readonly JSON = JSON;

  protected readonly ondblclick = ondblclick;

  treeControl = new NestedTreeControl<DocumentNode> (node => node.children);
  //dataSource = new ArrayDataSource(TREE_DATA);

  constructor(private formBuilder: FormBuilder, private documentService: DocumentService, private router: Router) {
  }

  hasChild = (_: number, node: DocumentNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.newDocument = this.formBuilder.group({
      isFolder: ['true', Validators.required],
      titre: [null, Validators.required, Validators.pattern("[A-Za-z-çèéàê' -]+")],
      description: [null],
      nature: ['STANDARD', Validators.required],
      document: [null, Validators.required]
    });

    this.document$ = this.newDocument.valueChanges.pipe(
      /*map(formValue => ({
        ...formValue,
        id : null,
        perimetreId: null,
        metierId: null,
        fichier: null,
        documentRelatedContent: null,
      })),*/
      tap(console.log)
    );

    this.listDocument$ = this.documentService.afficherDocuments(0).pipe(
      tap(() => {
        this.filAriane$ = this.documentService.afficherFileAriane(0).pipe(
          tap(console.log)
        );
      } )
    );

    this.treeDocumentNode$ = this.documentService.lodDocumentForm().pipe(
      tap((value) => {
        this.dataSource = new ArrayDataSource(value);
      })
    );

    this.selectedNode = 0;
  }

  setParent(data: any, parent: any) {
    data.parent = parent;
    if (data.children) {
      data.children.forEach((x: number) => {
        this.setParent(x, data);
      });
    }
  }

  redirectTo(url: string) {
    this.router.navigate([url]);
  }

  onFileChange(event: any): void {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  getDocumentChilds(documentItem: Document): void {
    if (documentItem.isFolder) {
      this.selectedNode = documentItem.id;
      this.listDocument$ = this.documentService.afficherDocuments(documentItem.id).pipe(
        tap(() => {
          this.filAriane$ = this.documentService.afficherFileAriane(this.selectedNode);
        })
      );
    }
  }

  getDocumentParent(): void {
    console.log(this.selectedNode);
    this.listDocument$ = this.documentService.afficherDocumentsParent(this.selectedNode).pipe(
      tap((value) => {
        if (value[0].document != null) {
          this.selectedNode = value[0].document.id;
        } else {
          this.selectedNode = 0;
        }
        this.filAriane$ = this.documentService.afficherFileAriane(this.selectedNode);
      })
    );
  }

  getDocumentsByName(form: NgForm): void {
    console.log(form)
    if (this.nomDocument.trim() != ""){
      this.listDocument$ = this.documentService.rechercherDocumentParNom(this.nomDocument, false);
    }
  }

  downloadFile(idDocment: number, fileName: string): void {
    //event.stopPropagation();
    this.documentService.downloadDocument(idDocment).subscribe(
      data => saveAs(data, fileName)
    );
  }

  onSubmitForm(): void {
    const formValue = this.newDocument.value;
    const formParams = new FormData();
    let isFolder : Boolean = true;

    const documentFolder: Document = {
      ...formValue,
      id: null,
      perimetreId: formValue.document.perimetreId,
      metierId: formValue.document.metierId,
      fichier: null,
      fileName: null,
      dateCreate: null,
      isSupprim: true,
      documentRelatedContent: null,
    }

    formParams.append("document", JSON.stringify(documentFolder));

    if (this.file) {
      isFolder = false;
      formParams.append("file", this.file);
    }

    this.documentService.creerDocument(formParams, isFolder.valueOf()).pipe(
      tap( () => {
        this.selectedNode = this.selectedParentNode;
        this.listDocument$ = this.documentService.afficherDocuments(this.selectedParentNode).pipe(
          tap(() => {
            this.filAriane$ = this.documentService.afficherFileAriane(this.selectedNode);
          })
        );
      })
    ).subscribe({
      next:(value =>{
        this.newDocument = this.formBuilder.group({
          isFolder: ['true', Validators.required],
          titre: [null, Validators.required, Validators.pattern("[A-Za-z-çèéàê' -]+")],
          description: [null],
          nature: ['STANDARD', Validators.required],
          document: [null, Validators.required]
        });
      })
    });
  }

  selectNode(node : any) {
    console.log(node);

    const document = {
      id: node.id,
      isFolder: node.isFolder,
      perimetreId: node.perimetreId,
      metierId: node.metierId,
      titre: node.titre,
      description: node.description,
      fileName: node.fileName,
      nature: node.nature,
      dateCreate: node.dateCreate,
      isSupprim: node.isSupprim,
      documentRelatedContent: node.documentRelatedContent,
      document: node.document,
      fichier: node.fichier,
    };

    this.selectedParentNode = node.id;

    this.newDocument.get('document')?.setValue(document);
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

  deleteDocument() {
    this.documentService.deleteDocument(this.idDocumentToDelete).pipe(
      tap(
        this.listDocument$ = this.documentService.afficherDocuments(this.selectedNode)
      )
    ).subscribe();
  }

  setIdDocumentToDelete(documentId: number) {
    this.idDocumentToDelete = documentId;
  }
}
