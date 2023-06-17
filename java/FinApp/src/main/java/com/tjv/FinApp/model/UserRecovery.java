package com.tjv.FinApp.model;

public class UserRecovery {
    private String username;
    private String emailAddress;
    private boolean isPasswordReset;

    public UserRecovery() {}

    public UserRecovery(String username, String emailAddress, boolean isPasswordReset) {
        this.username = username;
        this.emailAddress = emailAddress;
        this.isPasswordReset = isPasswordReset;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public boolean getIsPasswordReset() {
        return isPasswordReset;
    }

    public void setIsPasswordReset(boolean isPasswordReset) {
        this.isPasswordReset = isPasswordReset;
    }
}
