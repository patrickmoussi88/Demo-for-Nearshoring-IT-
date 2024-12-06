package com.sp.somdiaa.grci.lib.mapper;

import com.sp.somdiaa.grci.lib.dto.response.NodeDocumentDto;
import com.sp.somdiaa.grci.lib.model.Document;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;

/**
 * Project Name : somdiaa-grci-microservices
 *
 * @author : Patrick.M
 * @version:
 */

@Component
public class NodeDocumentDtoMapper implements Function<Document, NodeDocumentDto> {
    @Override
    public NodeDocumentDto apply(Document document) {
        return null;
    }

    public NodeDocumentDto mapToNodeDocument(Document document, List<NodeDocumentDto> children) {
        return new NodeDocumentDto(
                document.getId(),
                document.getPerimetreId(),
                document.getMetierId(),
                document.getTitre(),
                document.getFileName(),
                document.getDescription(),
                document.getIsFolder(),
                document.getIsSupprim(),
                document.getDateCreate(),
                document.getFichier(),
                document.getDocumentRelatedContent(),
                document.getNature(),
                document.getDocument(),
                false,
                children
        );
    }
}
