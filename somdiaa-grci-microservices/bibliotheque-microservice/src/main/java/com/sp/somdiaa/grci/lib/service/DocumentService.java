package com.sp.somdiaa.grci.lib.service;

import com.sp.somdiaa.grci.lib.dto.response.DocumentDto;
import com.sp.somdiaa.grci.lib.dto.response.DocumentFormDto;
import com.sp.somdiaa.grci.lib.dto.response.NodeDocumentDto;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

public interface DocumentService {

    DocumentDto creerDocument(DocumentDto documentDto, MultipartFile file, @RequestHeader("Authorization") String token) throws IOException;

    List<DocumentDto> afficherBibliotheque(Integer folderId, @RequestHeader("Authorization") String token);

    DocumentDto rechercherDocumentParId(Long id);

    void supprimerDocument(Long id);

    List<NodeDocumentDto> loadDocumentForm(String token);

    List<DocumentDto> rechercherDocumentsParNom(String nomDocument, boolean isArchived, String token);

    List<DocumentDto> afficherDocumentsParents(Integer folderId, @RequestHeader("Authorization") String token);

    List<DocumentDto> afficherDocumentsParListeIds(List<Long> ids);

    List<DocumentDto> afficherDocumentParRelatedContent(String appLabel, String model, Long objectId);

    void restaurerDocument(Long id);

    List<DocumentDto> afficherDocumentsArchive(String token);

    String labelDocumentParents(Long id);
}
