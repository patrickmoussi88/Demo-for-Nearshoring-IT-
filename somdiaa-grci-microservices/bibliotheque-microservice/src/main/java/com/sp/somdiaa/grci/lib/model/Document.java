package com.sp.somdiaa.grci.lib.model;

import com.sp.somdiaa.grci.lib.model.enums.NATURE_STATUS;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Project Name : somdiaa-grci-microservices
 * Module bibliothèque
 * Entité Document
 *
 * @author : Patrick.M
 * @version:
 */

@Entity
@Table(name = "lib_document")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Perimetre
    private Long perimetreId;

    // Metier
    private Long metierId;

    @Column(columnDefinition = "TEXT")
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String fileName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Boolean isFolder;

    // le document peut il etre supprimé
    private Boolean isSupprim;

    // document archivé
    private Boolean isArchived;

    private Date dateCreate;

    // fichier
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fichier;

    // DocumentRelatedContent
    @ManyToOne
    @JoinColumn(name = "relatedContentId")
    private DocumentRelatedContent documentRelatedContent;

    // PROCEDURE, STANDARD, JUSTIFICATIF, ARCHIVE, AUTRE
    @Enumerated(value = EnumType.STRING)
    private NATURE_STATUS nature;

    // Dossier parent
    @ManyToOne
    @JoinColumn(name = "parentId")
    private Document document;
}
