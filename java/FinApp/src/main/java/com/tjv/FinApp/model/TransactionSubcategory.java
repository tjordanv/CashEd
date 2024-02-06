package com.tjv.FinApp.model;

import java.util.List;

public class TransactionSubcategory {
    private int id;
    private String name;
    private int categoryId;
    private String detailedName;
    private String description;
    private boolean isDeleted;
    private boolean isActive;
    private Double total;
    private List<Transaction> transactions;
    public TransactionSubcategory() {
    }

    public TransactionSubcategory(int id, String name, int categoryId, String detailedName, String description, boolean isDeleted, boolean isActive, Double total, List<Transaction> transactions) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.detailedName = detailedName;
        this.description = description;
        this.isDeleted = isDeleted;
        this.isActive = isActive;
        this.total = total;
        this.transactions = transactions;
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

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
    public void updateTotal() {
        this.total = this.transactions.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
    public void addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
    }
}
