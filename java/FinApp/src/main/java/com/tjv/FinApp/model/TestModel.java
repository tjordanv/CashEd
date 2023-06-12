package com.tjv.FinApp.model;

public class TestModel {
    private String name;
    private int num;

    public TestModel() {

    }

    public TestModel(String name, int num) {
        this.name = name;
        this.num = num;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
