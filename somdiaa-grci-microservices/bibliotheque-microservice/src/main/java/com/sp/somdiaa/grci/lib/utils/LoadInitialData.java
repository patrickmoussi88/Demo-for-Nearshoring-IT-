package com.sp.somdiaa.grci.lib.utils;

import com.sp.somdiaa.grci.lib.model.Document;
import com.sp.somdiaa.grci.lib.model.enums.NATURE_STATUS;
import com.sp.somdiaa.grci.lib.repository.DocumentRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
public class LoadInitialData {

    public static Workbook getWorkBook() throws IOException {
        log.info("Working Directory = " + System.getProperty("user.dir"));
        String init_data_file = "init_datas.xlsx";
        InputStream inputStream = LoadInitialData.class.getResourceAsStream("/static/"+init_data_file);

        assert inputStream != null;
        return new XSSFWorkbook(inputStream);
    }

    public static void loadInitDocument(DocumentRepository documentRepository) throws IOException {
        System.out.println("documents data loding...");
        Workbook workbook = getWorkBook();
        Sheet sheet = workbook.getSheet("Perimetre");
        for (Row row : sheet) {
            if (CellType.NUMERIC == row.getCell(0).getCellType() && row.getCell(0) != null && row.getCell(1) != null){ // skip first row
                Long perimetreId = (long) row.getCell(0).getNumericCellValue();
                String perimetreName = row.getCell(1).getStringCellValue();

                Document document = new Document();
                document.setPerimetreId(perimetreId);
                document.setTitre(perimetreName);
                document.setNature(NATURE_STATUS.STANDARD);
                document.setIsFolder(true);
                document.setIsSupprim(false);
                document.setIsArchived(false);
                document.setDateCreate(new Date());
                Document documentPerimetre = documentRepository.save(document);

                LoadInitialData.loadMetierDocument(perimetreId, documentPerimetre, documentRepository);
            }
            if (row.getCell(0) == null && row.getCell(1) == null){
                break;
            }
        }
        workbook.close();
        System.out.println("Documents data loading END...");
    }

    public static void loadMetierDocument(Long perimetreId, Document documentPerimetre, DocumentRepository documentRepository) throws IOException {
        // On initialise la liste des repertoires par metier
        List<String> folderList = List.of("Procédures", "Standards");

        Workbook workbook = getWorkBook();
        Sheet sheet = workbook.getSheet("Metier");
        for (Row row : sheet) {
            if (CellType.NUMERIC == row.getCell(0).getCellType() && row.getCell(0) != null && row.getCell(1) != null){ // skip first row
                Long metierId = (long) row.getCell(0).getNumericCellValue();
                String metierName = row.getCell(1).getStringCellValue();

                Document document = new Document();
                document.setPerimetreId(perimetreId);
                document.setMetierId(metierId);
                document.setTitre(metierName);
                document.setNature(NATURE_STATUS.STANDARD);
                document.setIsFolder(true);
                document.setIsSupprim(false);
                document.setIsArchived(false);
                document.setDateCreate(new Date());
                document.setDocument(documentPerimetre);
                Document documentMetier = documentRepository.save(document);

                List<String> standardFolderTitleList = LoadInitialData.loadFolderListByMetier(0);
                List<Document> standardFolderList = LoadInitialData.loadChildsMetierDocument(standardFolderTitleList, documentMetier, documentRepository);

                // On crée
                standardFolderList.forEach(
                        folder -> {
                            List<String> folderTitleListByMetier = LoadInitialData.loadFolderListByMetier(metierId.intValue());
                            LoadInitialData.loadChildsMetierDocument(folderTitleListByMetier, folder, documentRepository);
                        }
                );
            }
            if (row.getCell(0) == null && row.getCell(1) == null){
                break;
            }
        }
        workbook.close();
    }

    public static List<Document> loadChildsMetierDocument(List<String> folderList, Document parentFolder, DocumentRepository documentRepository) {

        // On initialise la liste vide des documents crées
        List<Document> documentList = new ArrayList<>();

        folderList.forEach(
            folder -> {
                // Creation des repertoires par metier
                Document standardDocument = new Document();
                standardDocument.setPerimetreId(parentFolder.getPerimetreId());
                standardDocument.setMetierId(parentFolder.getMetierId());
                standardDocument.setTitre(folder);
                standardDocument.setNature(NATURE_STATUS.STANDARD);
                standardDocument.setIsFolder(true);
                standardDocument.setIsSupprim(false);
                standardDocument.setIsArchived(false);
                standardDocument.setDateCreate(new Date());
                standardDocument.setDocument(parentFolder);
                documentList.add(documentRepository.save(standardDocument));
            }
        );

        return documentList;
    }

    public static List<String> loadFolderListByMetier(int metierId) {

        // On retourne la liste des dossiers standards par metier
        return switch (metierId) {
            // Aucun repertoire n'a été selectionné | on retourne la liste des repertoires relatifs aux perimetres
            case 1 ->  List.of(
                    "Comptabilité tiers et vente",
                    "Trésorerie",
                    "Stocks et immobilisations",
                    "Fiscalité",
                    "Clôture comptable, système d’information et consolidation");
            case 2 -> List.of(
                    "Sélection, contractualisation et évaluation des fournisseurs",
                    "Importations",
                    "Passation et suivi des commandes",
                    "Réception et facturation");
            case 3 -> List.of(
                    "Planification",
                    "Gestion des emballages et opérations spécifiques",
                    "Réception, expédition et transfert",
                    "Suivi et contrôle",
                    "Stockage et Valorisation");
            case 4 -> List.of(
                    "Identification des clients et contractualisation",
                    "Impayés et réclamations clients",
                    "Ventes et réductions commerciales",
                    "Evaluation, suivi et contrôle",
                    "Publicités, gratuits, marketing et mécénat");
            case 5 -> List.of(
                    "Recrutement & Intégration",
                    "Gestion du personnel : Paie, Congés & Absences et Notes de frais",
                    "Obligations légales et exigences Santé & Environnement",
                    "Formation , évaluation et suivi",
                    "Gestion des départs");
            default -> List.of("Procédures", "Standards");
        };
    }
}
