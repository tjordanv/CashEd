package com.tjv.FinApp.model;

public class TransactionSubcategory {
    private int id;
    private String name;
    private int categoryId;
    private String detailedName;
    private String description;

    public TransactionSubcategory() {
    }

    public TransactionSubcategory(int id, String name, int categoryId, String detailedName, String description) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.detailedName = detailedName;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getDetailedName() {
        return detailedName;
    }

    public void setDetailedName(String detailedName) {
        this.detailedName = detailedName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
