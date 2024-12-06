package com.sp.somdiaa.grci.lib.repository;

import com.sp.somdiaa.grci.lib.model.Document;
import com.sp.somdiaa.grci.lib.model.DocumentRelatedContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    Optional<Document> findDocumentByPerimetreIdAndDocumentIsNullAndIsArchivedIsFalse(Long perimetreId);

    List<Document> findDocumentsByDocumentIsNullAndIsArchivedIsFalseAndIsFolderIsTrue();

    List<Document> findDocumentsByIsArchivedIsTrue();

    List<Document> findDocumentsByIdIsIn(List<Long> idList);

    List<Document> findDocumentsByDocumentRelatedContentAndIsArchivedIsFalseAndDocumentRelatedContentIsNotNull(DocumentRelatedContent relatedContent);

    List<Document> findDocumentsByPerimetreIdIsInAndDocumentIsNullAndIsFolderIsTrue(List<Long> perimetreIds);

    List<Document> findDocumentsByIsFolderIsTrueAndMetierIdInAndDocument(List<Long> metierIds, Document document);

    List<Document> findDocumentsByPerimetreIdIsInAndTitreContainsAndIsArchivedEquals(List<Long> perimetreIds, String documentName, boolean isArchived);

    List<Document> findDocumentsByDocumentAndIsArchivedIsFalseOrderByIsFolderDesc(Document document);

    Long countDocumentsByDocumentAndIsArchivedIsFalse(Document document);
}
