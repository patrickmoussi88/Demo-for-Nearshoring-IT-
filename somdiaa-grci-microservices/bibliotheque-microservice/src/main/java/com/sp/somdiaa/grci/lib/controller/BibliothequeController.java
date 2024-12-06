package com.sp.somdiaa.grci.lib.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sp.somdiaa.grci.lib.dto.response.DocumentDto;
import com.sp.somdiaa.grci.lib.dto.response.NodeDocumentDto;
import com.sp.somdiaa.grci.lib.dto.response.ResponseDto;
import com.sp.somdiaa.grci.lib.service.DocumentService;
import jakarta.ws.rs.Produces;
import lombok.AllArgsConstructor;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/v1/library")
@AllArgsConstructor
public class BibliothequeController {

    DocumentService documentService;

    @ResponseStatus(OK)
    @GetMapping(path = "afficher-bibliotheque")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public List<DocumentDto> afficherBibliotheque(@RequestParam(name = "folderId", defaultValue = "0") Integer folderId,
                                                  @RequestHeader("Authorization")String token) {
        return documentService.afficherBibliotheque(folderId, token);
    }

    @ResponseStatus(OK)
    @GetMapping(path = "afficher-documents-archive")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public List<DocumentDto> afficherDocumentsArchive(@RequestHeader("Authorization")String token) {
        return documentService.afficherDocumentsArchive(token);
    }

    @ResponseStatus(OK)
    @GetMapping(path = "afficher-documents-parents")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public List<DocumentDto> afficherDocumentsParents(@RequestParam(name = "folderId") Integer folderId,
                                                  @RequestHeader("Authorization")String token) {
        return documentService.afficherDocumentsParents(folderId, token);
    }

    @ResponseStatus(OK)
    @GetMapping(path = "rechercher-documents-par-nom")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public List<DocumentDto> rechercherDocumentsParNom(@RequestParam(name = "title") String nomDocument,
                                                       @RequestParam(name = "isArchived") boolean isArchived,
                                                  @RequestHeader("Authorization")String token) {
        return documentService.rechercherDocumentsParNom(nomDocument, isArchived, token);
    }

    @ResponseStatus(OK)
    @GetMapping(path = "load-document-form")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public List<NodeDocumentDto> loadDocumentForm(@RequestHeader("Authorization")String token) {
        return documentService.loadDocumentForm(token);
    }

    @ResponseStatus(CREATED)
    @PostMapping(path = "creer-document")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_WRITE', 'LIB_DOCUMENT_WRITE')")
    public DocumentDto creerDocument(@RequestPart(name = "document") String documentToString,
                                     @RequestPart(name = "file", required = false) MultipartFile file,
                                     @RequestHeader("Authorization")String token) throws IOException {
        DocumentDto documentDto = new ObjectMapper().readValue(documentToString, new TypeReference<DocumentDto>() {});
        return documentService.creerDocument(documentDto, file, token);
    }

    @ResponseStatus(OK)
    @GetMapping(path = "telecharger/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public ResponseEntity<byte[]> telechargerDocument(@PathVariable Long id) {
        DocumentDto documentDto = documentService.rechercherDocumentParId(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + documentDto.fileName() + "\"")
                .body(documentDto.fichier());
    }

    @ResponseStatus(OK)
    @GetMapping(path = "afficher-document/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public DocumentDto afficherDocument(@PathVariable Long id) {
        return documentService.rechercherDocumentParId(id);
    }

    @ResponseStatus(OK)
    @PostMapping(path = "documents-par-ids")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public List<DocumentDto> afficherDocumentsParListeIds(@RequestBody List<Long> ids) {
        return documentService.afficherDocumentsParListeIds(ids);
    }

    @ResponseStatus(OK)
    @GetMapping(path = "{id}/label-documents-parents")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public ResponseDto<String> labelDocumentParents(@PathVariable Long id) {
        String parentsTitle = documentService.labelDocumentParents(id);
        //return  "Bibliothèque > " + parentsTitle;
        return  new ResponseDto<>(OK, "succès", "Bibliothèque > " + parentsTitle);
    }

    @ResponseStatus(OK)
    @GetMapping(path = "documents-par-related")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_READ', 'LIB_DOCUMENT_READ')")
    public List<DocumentDto> afficherDocumentParRelatedContent(@RequestParam(name = "appLabel") String appLabel,
                                                         @RequestParam(name = "model") String model,
                                                         @RequestParam(name = "objectId") Long objectId) {
        return documentService.afficherDocumentParRelatedContent(appLabel, model, objectId);
    }

    @ResponseStatus(OK)
    @DeleteMapping(path = "supprimer-document/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_DELETE', 'LIB_DOCUMENT_DELETE')")
    public void supprimerDocument(@PathVariable Long id) {
        documentService.supprimerDocument(id);
    }

    @ResponseStatus(OK)
    @PutMapping(path = "restaurer-document/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'LIB_UPDATE', 'LIB_DOCUMENT_UPDATE')")
    public void restaurerDocument(@PathVariable Long id) {
        documentService.restaurerDocument(id);
    }
}