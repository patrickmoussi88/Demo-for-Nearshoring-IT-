package com.sp.somdiaa.grci.lib.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class LongListConverter implements AttributeConverter<List<Long>, String> {
	private static final String SPLIT_CHAR = ",";

	@Override
	public String convertToDatabaseColumn(List<Long> longList) {
		return longList != null ? String.join(SPLIT_CHAR, longList.stream().map(l -> l.toString()).toList()) : "";
	}

	@Override
	public List<Long> convertToEntityAttribute(String string) {
		return string != null ? Arrays.asList(string.split(SPLIT_CHAR)).stream().map(l -> Long.valueOf(l)).toList()
				: new ArrayList<Long>();
	}

}
