package com.animeexplorer.animeexplorer.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
public enum Season {
    WINTER("Winter", "January - March"),
    SPRING("Spring", "April - June"),
    SUMMER("Summer", "July - September"),
    FALL("Fall", "October - December");

    private final String displayName;
    private final String months;
}