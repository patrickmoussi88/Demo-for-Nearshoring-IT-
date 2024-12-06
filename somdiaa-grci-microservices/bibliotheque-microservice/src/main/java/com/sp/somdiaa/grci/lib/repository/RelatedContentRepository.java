package com.sp.somdiaa.grci.lib.repository;

import com.sp.somdiaa.grci.lib.model.DocumentRelatedContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelatedContentRepository extends JpaRepository<DocumentRelatedContent, Long> {

    DocumentRelatedContent findDocumentRelatedContentByAppLabelAndModelAndObjectId(String appLabel, String model, Long objectId);
}
