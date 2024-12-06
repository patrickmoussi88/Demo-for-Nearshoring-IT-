package com.sp.somdiaa.grci.lib.dto.response;

import com.sp.somdiaa.grci.lib.model.Document;
import com.sp.somdiaa.grci.lib.model.DocumentRelatedContent;
import com.sp.somdiaa.grci.lib.model.enums.NATURE_STATUS;

import java.util.Date;
import java.util.List;

public record NodeDocumentDto(
        Long id,
        Long perimetreId,
        Long metierId,
        String titre,
        String fileName,
        String description,
        Boolean isFolder,
        Boolean isSupprim,
        Date dateCreate,
        byte[] fichier,
        DocumentRelatedContent documentRelatedContent,
        NATURE_STATUS nature,
        Document document,
        Boolean isExpanded,
        List<NodeDocumentDto> children
) {
}
