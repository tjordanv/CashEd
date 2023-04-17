package com.tjv.FinApp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "User already Exists.")
public class UserAlreadyExistsException extends RuntimeException {
}
