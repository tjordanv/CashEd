package com.tjv.FinApp.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

public class Transaction {
    private int id;
    private String transactionId;
    // The accountId in this case is the FK id from the accounts table, not the accountId
    private int accountId;
    private String accountName;
    private int userId;
    private int subcategoryId;
    private String subcategoryName;
    private int categoryId;
    private int paymentChannelId;
    private String name;
    private String description;
    private String merchantLogoUrl;
    private String merchantWebsite;
    private LocalDate date;
    private Double amount;
    private String checkNumber;
    private String address;
    private String city;
    private String region;
    private String postalCode;
    private String country;
    private Date createdDate;
    private boolean isDeleted;
    private Date deletedDate;

    public Transaction() {
    }

    public Transaction(int id, String transactionId, int accountId, int userId, int subcategoryId, int paymentChannelId, String name, String subcategoryName, String accountName,
                       String description, String merchantLogoUrl, String merchantWebsite, LocalDate date, Double amount, String checkNumber, int categoryId,
                       String address, String city, String region, String postalCode, String country, Date createdDate, boolean isDeleted, Date deletedDate) {
        this.id = id;
        this.transactionId = transactionId;
        this.accountId = accountId;
        this.userId = userId;
        this.subcategoryId = subcategoryId;
        this.categoryId = categoryId;
        this.paymentChannelId = paymentChannelId;
        this.name = name;
        this.description = description;
        this.merchantLogoUrl = merchantLogoUrl;
        this.merchantWebsite = merchantWebsite;
        this.date = date;
        this.amount = amount;
        this.checkNumber = checkNumber;
        this.address = address;
        this.city = city;
        this.region = region;
        this.postalCode = postalCode;
        this.country = country;
        this.createdDate = createdDate;
        this.isDeleted = isDeleted;
        this.deletedDate = deletedDate;
        this.subcategoryName = subcategoryName;
        this.accountName = accountName;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(int subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public int getPaymentChannelId() {
        return paymentChannelId;
    }

    public void setPaymentChannelId(int paymentChannelId) {
        this.paymentChannelId = paymentChannelId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMerchantLogoUrl() {
        return merchantLogoUrl;
    }

    public void setMerchantLogoUrl(String merchantLogoUrl) {
        this.merchantLogoUrl = merchantLogoUrl;
    }

    public String getMerchantWebsite() {
        return merchantWebsite;
    }

    public void setMerchantWebsite(String merchantWebsite) {
        this.merchantWebsite = merchantWebsite;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCheckNumber() {
        return checkNumber;
    }

    public void setCheckNumber(String checkNumber) {
        this.checkNumber = checkNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Date getDeletedDate() {
        return deletedDate;
    }

    public void setDeletedDate(Date deletedDate) {
        this.deletedDate = deletedDate;
    }

    public String getSubcategoryName() {
        return subcategoryName;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public void setSubcategoryName(String subcategoryName) {
        this.subcategoryName = subcategoryName;
    }

    @Override
    public String toString() {
        return String.format("""
                        Id: %d
                        transaction Id: %s
                        account Id: %d
                        user Id: %d
                        subcategory Id: %d
                        payment channel Id: %d
                        name: %s
                        description: %s
                        merchant logo url: %s
                        merchant website: %s
                        date: %s
                        amount: %f
                        check number: %s
                        address: %s
                        city: %s
                        region: %s
                        postal code: %s
                        country: %s
                        created date: %s
                        isDeleted: %s
                        deleted date: %s""",
                this.id, this.transactionId, this.accountId, this.userId, this.subcategoryId,
                this.paymentChannelId, this.name, this.description, this.merchantLogoUrl, this.merchantWebsite,
                this.date, this.amount, this.checkNumber, this.address, this.city, this.region, this.postalCode,
                this.country, this.createdDate, this.isDeleted, this.deletedDate);
    }
}
