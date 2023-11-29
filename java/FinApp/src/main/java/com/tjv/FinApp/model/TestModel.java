package com.tjv.FinApp.model;

public class TestModel {
    private String name;
    private int num;
    private boolean include_optional_metadata;
    private String institutionId;

    public TestModel(String name, int num, boolean include_optional_metadata, String institutionId) {
        this.name = name;
        this.num = num;
        this.include_optional_metadata = include_optional_metadata;
        this.institutionId = institutionId;
    }

    public boolean isInclude_optional_metadata() {
        return include_optional_metadata;
    }

    public void setInclude_optional_metadata(boolean include_optional_metadata) {
        this.include_optional_metadata = include_optional_metadata;
    }

    public String getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(String institutionId) {
        this.institutionId = institutionId;
    }

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
