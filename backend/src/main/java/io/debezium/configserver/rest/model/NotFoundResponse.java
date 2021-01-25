package io.debezium.configserver.rest.model;

import javax.json.bind.annotation.JsonbProperty;

public class NotFoundResponse {

    public final String message;

    @JsonbProperty("error_code")
    public final int errorCode;

    public NotFoundResponse(int errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }
}
