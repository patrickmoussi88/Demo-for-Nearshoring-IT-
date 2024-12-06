package com.sp.somdiaa.grci.lib.service.serviceImpl;

import com.sp.somdiaa.grci.lib.dto.response.DocumentDto;
import com.sp.somdiaa.grci.lib.dto.response.DocumentFormDto;
import com.sp.somdiaa.grci.lib.dto.response.NodeDocumentDto;
import com.sp.somdiaa.grci.lib.mapper.DocumentDtomapper;
import com.sp.somdiaa.grci.lib.mapper.NodeDocumentDtoMapper;
import com.sp.somdiaa.grci.lib.model.Document;
import com.sp.somdiaa.grci.lib.model.DocumentRelatedContent;
import com.sp.somdiaa.grci.lib.model.Metier;
import com.sp.somdiaa.grci.lib.model.Perimetre;
import com.sp.somdiaa.grci.lib.model.enums.NATURE_STATUS;
import com.sp.somdiaa.grci.lib.repository.DocumentRepository;
import com.sp.somdiaa.grci.lib.repository.RelatedContentRepository;
import com.sp.somdiaa.grci.lib.security.jwt.JwtTokenUtils;
import com.sp.somdiaa.grci.lib.service.ConfigurationRestClient;
import com.sp.somdiaa.grci.lib.service.DocumentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.hibernate.action.internal.EntityActionVetoException;
import org.hibernate.action.internal.EntityDeleteAction;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * Project Name : somdiaa-grci-microservices
 * Module bibliothèque
 * Fonctions metiers relatives à la gestion des documents
 *
 * @author : Patrick.M
 * @version:
 */

@Service
@AllArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private DocumentRepository documentRepository;

    private RelatedContentRepository relatedContentRepository;

    private ConfigurationRestClient configurationRestClient;

    private DocumentDtomapper documentDtomapper;

    private NodeDocumentDtoMapper nodeDocumentDtoMapper;

    private JwtTokenUtils jwtTokenUtils;

    @Override
    public DocumentDto creerDocument(DocumentDto documentDto, MultipartFile file, @RequestHeader("Authorization") String token) throws IOException {

        // On contruit l'objet document
        Document document = documentDtomapper.mapToEntity(documentDto);
        document.setId(null);
        document.setFileName((!documentDto.isFolder()) ? file.getOriginalFilename() : null);
        document.setFichier((!documentDto.isFolder()) ? file.getBytes() : null);
        document.setDateCreate(new Date());
        document.setIsArchived(false);

        // si l'objet related content n'est pas null l'objet est sauvegardé
        if (documentDto.documentRelatedContent() != null) {
            DocumentRelatedContent documentRelatedContent;
            DocumentRelatedContent relatedContentDto = documentDto.documentRelatedContent();
            // On verifie si l'objet avec le jeu de données applabel, model, objectId existe
            DocumentRelatedContent relatedContent = relatedContentRepository.findDocumentRelatedContentByAppLabelAndModelAndObjectId(
                    relatedContentDto.getAppLabel(),
                    relatedContentDto.getModel(),
                    relatedContentDto.getObjectId()
            );

            if (relatedContent == null) {
                // Si cet objet n'existe pas il est crée
                documentRelatedContent = relatedContentRepository.save(documentDto.documentRelatedContent());
            } else {
                // Si cet objet existe il est utilisé comme relatedcontent
                documentRelatedContent = relatedContent;
            }
            //on met à jour l'objet document
            document.setDocumentRelatedContent(documentRelatedContent);
        }

        // On sauvegarde le document
        Document newDocument = documentRepository.save(document);
        // On mappe l'objet document crée
        return documentDtomapper.apply(newDocument);
    }

    @Override
    public List<DocumentDto> afficherBibliotheque(Integer folderId, @RequestHeader("Authorization") String token) {

        List<Document> documentList = switch (folderId) {
            // Aucun repertoire n'a été selectionné | on retourne la liste des repertoires relatifs aux perimetres
            case 0 ->  documentRepository.findDocumentsByDocumentIsNullAndIsArchivedIsFalseAndIsFolderIsTrue();
            default -> {
                // On recherche les repertoires et documents enfants du repertoire selectionnés
                Document DocumentParent = documentRepository.findById(folderId.longValue()).get();
                yield documentRepository.findDocumentsByDocumentAndIsArchivedIsFalseOrderByIsFolderDesc(DocumentParent);
            }
        };
        // On mappe les données
        List<DocumentDto> documentDtoList = documentList.stream().map(documentDtomapper).toList();

        return  documentDtoList;
    }

    @Override
    public List<DocumentDto> afficherDocumentsParents(Integer folderId, @RequestHeader("Authorization") String token) {
        Integer idDocumentParent = 0;

        //On recherche le document parent
        Document document = documentDtomapper.mapToEntity(rechercherDocumentParId(folderId.longValue()));

        if (document.getDocument() != null) {
            idDocumentParent = document.getDocument().getId().intValue();
        }

        return afficherBibliotheque(idDocumentParent, token);
    }

    @Override
    public List<DocumentDto> afficherDocumentsParListeIds(List<Long> ids) {
        // On recupere la lsite des documents
        List<Document> documentList = documentRepository.findDocumentsByIdIsIn(ids);
        // On mappe les données
        return documentList.stream().map(documentDtomapper).toList();
    }

    @Override
    public List<DocumentDto> afficherDocumentParRelatedContent(String appLabel, String model, Long objectId) {
        // on recupère l'objet documentRelatedContent
        DocumentRelatedContent relatedContent = relatedContentRepository.findDocumentRelatedContentByAppLabelAndModelAndObjectId(appLabel, model, objectId);
        // On recupère la liste des documents à partir de l'objet documentRelatedContent si l'objet related content existe
        if (relatedContent != null) {
            List<Document> documentList = documentRepository.findDocumentsByDocumentRelatedContentAndIsArchivedIsFalseAndDocumentRelatedContentIsNotNull(relatedContent);
            // On mappe la liste des données
            return documentList.stream().map(documentDtomapper).toList();
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public DocumentDto rechercherDocumentParId(Long id) {

        Optional<Document> optionalDocument = documentRepository.findById(id);
        Document document = optionalDocument.orElseThrow(() -> new EntityNotFoundException("Ce document n'existe pas."));
        return documentDtomapper.apply(document);
    }

    @Override
    public void supprimerDocument(Long id) {
        // On recherche le document à partir de l'id
        Document document = documentRepository.findById(id).get();
        if (document.getIsFolder()) {
            // Dans le cas d'un repretoire si celui ci contient des documents il ne peut etre supprimé
            if (documentRepository.countDocumentsByDocumentAndIsArchivedIsFalse(document) > 0) {
                throw new RuntimeException("Ce repertoire contient des documents");
            } else {
                // Dans le cas ou le repertoire est vide on le supprime
                documentRepository.delete(document);
            }
        } else {
            // Dans le cas d'un fichier on archive le document
            document.setIsArchived(true);
            documentRepository.save(document);
        }
    }

    @Override
    public void restaurerDocument(Long id) {
        // On recherche le document à partir de l'id
        Document document = documentRepository.findById(id).get();
        // On met à jour le statut du document et on sauvegarde
        document.setIsArchived(false);
        documentRepository.save(document);
    }

    @Override
    public List<DocumentDto> afficherDocumentsArchive(String token) {
        List<Document> documentList = documentRepository.findDocumentsByIsArchivedIsTrue();
        return documentList.stream().map(documentDtomapper).toList();
    }

    @Override
    public String labelDocumentParents(Long id) {
        String fileAriane = "";
        if (id != 0) {
            // get document with id
            Optional<Document> optionalDocument = documentRepository.findById(id);
            Document document = optionalDocument.orElseThrow(() -> new EntityNotFoundException("Ce document n'existe pas"));
            fileAriane = document.getTitre();
            // If document get parent save parent title
            if (document.getDocument() != null ) {
                // call recursive method to get parents titles
                String parentLabel = this.labelDocumentParents(document.getDocument().getId());
                fileAriane = parentLabel + " > " + fileAriane;
            }
        }
        // return the result
        return fileAriane;
    }

    @Override
    public List<NodeDocumentDto> loadDocumentForm(String token) {
        // On recupère les perimètres à partir du token
        List<Long> perimetreIds = jwtTokenUtils.getPerimetreFormToken(token);
        // On recupère les metiers à partir du token
        List<Long> metierIds = jwtTokenUtils.getMetiersFormToken(token);

        // On recupère la liste des repertoires relatifs aux perimetres de l'utilisateur
        List<Document> perimetreFolderList = documentRepository.findDocumentsByPerimetreIdIsInAndDocumentIsNullAndIsFolderIsTrue(perimetreIds);
        // On recupère la liste des repertoires enfants correspondants aux metiers de l'utilisateur
        List<NodeDocumentDto> nodeDocumentDtoList = new ArrayList<>();
        perimetreFolderList.forEach(
            perimetreFolder -> {
                nodeDocumentDtoList.add(nodeDocumentDtoMapper.mapToNodeDocument(perimetreFolder, loadFolderTree(metierIds, perimetreFolder)));
            }
        );

        return nodeDocumentDtoList;
    }

    @Override
    public List<DocumentDto> rechercherDocumentsParNom(String nomDocument, boolean isArchived, String token) {
        // On recupère les perimètres à partir du token
        List<Long> perimetreIds = jwtTokenUtils.getPerimetreFormToken(token);

        // On recherche les documents par nom et par périmètre
        List<Document> folderListResult = documentRepository.findDocumentsByPerimetreIdIsInAndTitreContainsAndIsArchivedEquals(perimetreIds, nomDocument, isArchived);
        // On mappe le resultat
        return folderListResult.stream().map(documentDtomapper).toList();
    }

    private List<NodeDocumentDto> loadFolderTree( List<Long> metierIds, Document document) {
        // On reupère les repertoires enfants
        List<Document> documentList = documentRepository.findDocumentsByIsFolderIsTrueAndMetierIdInAndDocument(metierIds, document);
        if (documentList.isEmpty()) {
            return null;
        } else {
            List<NodeDocumentDto> nodeDocumentDtoList = new ArrayList<>();
            documentList.forEach(
                folder -> {
                    nodeDocumentDtoList.add(nodeDocumentDtoMapper.mapToNodeDocument(folder, loadFolderTree(metierIds, folder)));
                }
            );
            return nodeDocumentDtoList;
        }
    }

}
