package com.animeexplorer.animeexplorer.util;

import org.hibernate.annotations.GenericGenerator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@GenericGenerator(
        name = "prefixed-id",
        type = PrefixedIdGenerator.class
)
public @interface PrefixedId {
    String value();
}