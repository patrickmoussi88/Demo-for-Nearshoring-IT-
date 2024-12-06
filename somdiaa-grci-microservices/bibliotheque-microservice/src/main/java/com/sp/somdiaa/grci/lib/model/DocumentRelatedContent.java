package com.sp.somdiaa.grci.lib.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Project Name : somdiaa-grci-microservices
 * Module bibliothèque
 * Entité retacant les relations avec les documents
 *
 * @author : Patrick.M
 * @version:
 */

@Entity
@Table(name = "lib_document_related_content")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentRelatedContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Le module dans lequel se trouve l’objet lié
    @Column(columnDefinition = "TEXT")
    private String appLabel;

    // Le nom de la table dans laquelle se trouve l’objet lié
    @Column(columnDefinition = "TEXT")
    private String model;

    // L’identifiant de l’objet lié
    private Long objectId;
}
