package com.tjv.FinApp.model;

import net.minidev.json.annotate.JsonIgnore;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class User {
    private int id;
    private String username;
    private String firstName;
    private String lastName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    private String email;
    private int activeSecurityQuestions;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private boolean activated;
    @JsonIgnore
    private Set<Authority> authorities = new HashSet<>();

    public User() { }

    public User(Integer id, String username, String firstName, String lastName, String password, String email, int activeSecurityQuestions, String authorities) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.activeSecurityQuestions = activeSecurityQuestions;
        this.activated = true;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public boolean isActivated() {
        return activated;
    }
    public void setActivated(boolean activated) {
        this.activated = activated;
    }
    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public int getActiveSecurityQuestions() {
        return activeSecurityQuestions;
    }

    public void setActiveSecurityQuestions(int activeSecurityQuestions) {
        this.activeSecurityQuestions = activeSecurityQuestions;
    }

    public void setAuthorities(String authorities) {
        String[] roles = authorities.split(",");
        for(String role : roles) {
            String authority = role.contains("ROLE_") ? role : "ROLE_" + role;
            this.authorities.add(new Authority(authority));
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, activated, authorities);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", activated=" + activated +
                ", authorities=" + authorities +
                ", email=" + email +
                '}';
    }
}
