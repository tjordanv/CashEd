package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.TransactionSubcategory;

import java.security.Principal;
import java.util.List;

public interface TransactionSubcategoryDao {
    List<TransactionSubcategory> getActiveSubcategoriesByUser(Principal principal);
    List<TransactionSubcategory> getSubcategoriesByUser(Principal principal);
    void updateUserSubcategories(Principal principal, String subcategoryIdsToSave, String subcategoriesToDelete);
    List<TransactionSubcategory> getSubcategoriesByMonth(Principal principal, int month, int year);
}
