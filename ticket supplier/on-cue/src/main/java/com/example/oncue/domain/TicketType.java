package com.example.oncue.domain;

public enum TicketType {

    VIP("VIP"),
    GENERAL("General Admission"),
    BALCONY("Balcony"),
    MEETGREET("Meet and Greet");

    private final String value;

    TicketType(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static TicketType fromValue(String v) {
        for (TicketType c: TicketType.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }


}
