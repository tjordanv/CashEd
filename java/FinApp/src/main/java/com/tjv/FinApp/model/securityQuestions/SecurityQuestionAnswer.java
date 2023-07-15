package com.tjv.FinApp.model.securityQuestions;

public class SecurityQuestionAnswer {
    private String answer;
    private int answer_id;
    private int question_id;

    public SecurityQuestionAnswer() {};

    public SecurityQuestionAnswer(String answer, int answer_id, int question_id) {
        this.answer = answer;
        this.answer_id = answer_id;
        this.question_id = question_id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getAnswer_id() {
        return answer_id;
    }

    public void setAnswer_id(int answer_id) {
        this.answer_id = answer_id;
    }

    public int getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(int question_id) {
        this.question_id = question_id;
    }
}
