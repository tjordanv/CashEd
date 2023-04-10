package com.tjv.FinApp.model;

public class TestModel {
    private String city;
    private int minimumPrice;

    public TestModel() {

    }

    public TestModel(String city, int minimumPrice) {
        this.city = city;
        this.minimumPrice = minimumPrice;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getMinimumPrice() {
        return minimumPrice;
    }

    public void setMinimumPrice(int minimumPrice) {
        this.minimumPrice = minimumPrice;
    }
}
