package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.TransactionSubcategory;

import java.security.Principal;
import java.util.List;

public interface TransactionSubcategoryDao {
    List<TransactionSubcategory> getActiveSubcategoriesByUser(Principal principal);
}
