package com.tjv.FinApp.model;

import java.util.Date;

public class Transaction {
    private int id;
    private int transactionId;
    private int accountId;
    private int userId;
    private int subcategoryId;
    private int paymentChannelId;
    private String name;
    private String description;
    private String merchantLogoUrl;
    private String merchantWebsite;
    private Date date;
    private float amount;
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

    public Transaction(int id, int transactionId, int accountId, int userId, int subcategoryId, int paymentChannelId, String name, String description, String merchantLogoUrl, String merchantWebsite, Date date, float amount, String checkNumber, String address, String city, String region, String postalCode, String country, Date createdDate, boolean isDeleted, Date deletedDate) {
        this.id = id;
        this.transactionId = transactionId;
        this.accountId = accountId;
        this.userId = userId;
        this.subcategoryId = subcategoryId;
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
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
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
}
