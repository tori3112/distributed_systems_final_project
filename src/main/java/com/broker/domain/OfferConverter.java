package com.broker.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import javax.persistence.AttributeConverter;
import java.util.ArrayList;
import java.util.List;


public class OfferConverter implements AttributeConverter<List<String>, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<String> strings) {
        try {
            return objectMapper.writeValueAsString(strings);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<String> convertToEntityAttribute(String jsonOffer) {
        if (jsonOffer == null || jsonOffer.trim().isEmpty()) {

            return new ArrayList<>(); // or Collections.emptyList()
        }
        try{
            //TypeReference is needed to retain the types inside your JSON
            //Objects inside of JSON are generics
            //During run time generics are gone -- type erasure

            return objectMapper.readValue(jsonOffer, new TypeReference<List<String>>(){});
        } catch (Exception e) {
            throw new IllegalArgumentException("Could not convert JSON to list", e);
        }
    }



}
