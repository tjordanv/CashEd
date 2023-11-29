package com.tjv.FinApp.model;

public class Account {
    private int id;
    private String accountId;
    private Balances balances;
    private String mask;
    private String name;
    private String officialName;
    private String logo;
    private String persistentAccountId;
    private String subtype;
    private String type;
    private String nickname;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Account() {};
    // Getters and setters for each field

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public Balances getBalances() {
        return balances;
    }

    public void setBalances(Balances balances) {
        this.balances = balances;
    }

    public String getMask() {
        return mask;
    }

    public void setMask(String mask) {
        this.mask = mask;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOfficialName() {
        return officialName;
    }

    public void setOfficialName(String officialName) {
        this.officialName = officialName;
    }

    public String getPersistentAccountId() {
        return persistentAccountId;
    }

    public void setPersistentAccountId(String persistentAccountId) {
        this.persistentAccountId = persistentAccountId;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Inner class for Balances
    public static class Balances {
        private double available;
        private double current;
        private String isoCurrencyCode;
        private Double limit;  // Note: This field can be null, so using Double instead of double
        private String unofficialCurrencyCode;

        // Getters and setters for each field

        public double getAvailable() {
            return available;
        }

        public void setAvailable(double available) {
            this.available = available;
        }

        public double getCurrent() {
            return current;
        }

        public void setCurrent(double current) {
            this.current = current;
        }

        public String getIsoCurrencyCode() {
            return isoCurrencyCode;
        }

        public void setIsoCurrencyCode(String isoCurrencyCode) {
            this.isoCurrencyCode = isoCurrencyCode;
        }

        public Double getLimit() {
            return limit;
        }

        public void setLimit(Double limit) {
            this.limit = limit;
        }

        public String getUnofficialCurrencyCode() {
            return unofficialCurrencyCode;
        }

        public void setUnofficialCurrencyCode(String unofficialCurrencyCode) {
            this.unofficialCurrencyCode = unofficialCurrencyCode;
        }
    }
}
