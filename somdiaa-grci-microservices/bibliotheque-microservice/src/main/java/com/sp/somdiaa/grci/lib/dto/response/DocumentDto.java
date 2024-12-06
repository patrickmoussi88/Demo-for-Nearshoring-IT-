package com.sp.somdiaa.grci.lib.dto.response;

import com.sp.somdiaa.grci.lib.model.Document;
import com.sp.somdiaa.grci.lib.model.DocumentRelatedContent;
import com.sp.somdiaa.grci.lib.model.enums.NATURE_STATUS;

import java.util.Date;

public record DocumentDto(
        Long id,
        Long perimetreId,
        Long metierId,
        String titre,
        String fileName,
        String description,
        Boolean isFolder,
        Boolean isSupprim,
        Boolean isArchived,
        Date dateCreate,
        byte[] fichier,
        DocumentRelatedContent documentRelatedContent,
        NATURE_STATUS nature,
        Document document
) {
}
