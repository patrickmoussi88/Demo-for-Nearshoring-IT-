package com.sp.somdiaa.grci.lib.mapper;

import com.sp.somdiaa.grci.lib.dto.response.DocumentDto;
import com.sp.somdiaa.grci.lib.model.Document;
import org.springframework.stereotype.Component;

import java.util.function.Function;

/**
 * Project Name : somdiaa-grci-microservices
 *
 * @author : Patrick.M
 * @version:
 */

@Component
public class DocumentDtomapper implements Function<Document, DocumentDto> {
    @Override
    public DocumentDto apply(Document document) {
        return new DocumentDto(
                document.getId(),
                document.getPerimetreId(),
                document.getMetierId(),
                document.getTitre(),
                document.getFileName(),
                document.getDescription(),
                document.getIsFolder(),
                document.getIsSupprim(),
                document.getIsArchived(),
                document.getDateCreate(),
                document.getFichier(),
                document.getDocumentRelatedContent(),
                document.getNature(),
                document.getDocument()
        );
    }

    public Document mapToEntity(DocumentDto documentDto) {
        return new Document(
                documentDto.id(),
                documentDto.perimetreId(),
                documentDto.metierId(),
                documentDto.titre(),
                documentDto.fileName(),
                documentDto.description(),
                documentDto.isFolder(),
                documentDto.isSupprim(),
                documentDto.isArchived(),
                documentDto.dateCreate(),
                documentDto.fichier(),
                documentDto.documentRelatedContent(),
                documentDto.nature(),
                documentDto.document()
            );
    }
}
