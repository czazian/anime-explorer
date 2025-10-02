package com.animeexplorer.animeexplorer.entity;

import com.animeexplorer.animeexplorer.entity.Helper.Auditable;
import com.animeexplorer.animeexplorer.enums.Season;
import com.animeexplorer.animeexplorer.util.PrefixedIdGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Anime")
public class AnimeBean extends Auditable {

    @Id
    @GeneratedValue(generator = "prefixed-id")
    @GenericGenerator(
            name = "prefixed-id",
            type = PrefixedIdGenerator.class,
            parameters = @org.hibernate.annotations.Parameter(name = PrefixedIdGenerator.PREFIX_PARAMETER, value = "ANE")
    )
    @Column(name = "ANIME_ID")
    private String animeId;

    @Column(name = "ANIME_NAME")
    private String animeName;

    @Column(name = "ANIME_NAME_JP")
    private String animeNameJp;

    @Column(name = "ANIME_PV_URL")
    private String animePvUrl;

    @Column(name = "ANIME_IMAGE")
    private String animeImage;

    @Column(name = "ANIME_POSTER")
    private String animePoster;

    @Column(name = "ANIME_DESCRIPTION", columnDefinition = "TEXT")
    private String animeDescription;

    @Column(name = "ANIME_RATING")
    private Double animeRating;

    @Column(name = "ANIME_RELEASE_DATE")
    private Timestamp animeReleaseDate;

    @Column(name = "ANIME_VIEWS")
    private Integer animeViews;

    @Column(name = "ANIME_STATUS")
    private String animeStatus;

    @Column(name = "GENRE_ID")
    private String genreId;

    @Column(name = "STUDIO_ID")
    private String studioId;

    @Column(name = "SEASON")
    @Enumerated(EnumType.STRING)
    private Season season;

    @Column(name = "CHARACTER_ID")
    private String characterId;

}
