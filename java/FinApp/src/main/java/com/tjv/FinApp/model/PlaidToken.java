package com.tjv.FinApp.model;

public class PlaidToken {
    private int id;
    private String token;
    private String tokenType;

    public PlaidToken(){}

    public PlaidToken(int id, String token, String tokenType) {
        this.id = id;
        this.token = token;
        this.tokenType = tokenType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
