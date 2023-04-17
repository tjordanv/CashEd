package com.tjv.FinApp.model;

import java.util.Objects;

public class Authority {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Authority(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Authority authority = (Authority) obj;
        return name == authority.name;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return "Authority{" +
                "name=" + name +
                '}';
    }
}
