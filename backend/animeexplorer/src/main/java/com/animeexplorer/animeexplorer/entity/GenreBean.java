package com.animeexplorer.animeexplorer.entity;

import com.animeexplorer.animeexplorer.entity.Helper.Auditable;
import com.animeexplorer.animeexplorer.util.PrefixedIdGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "GENRES")
public class GenreBean extends Auditable {

    @Id
    @GeneratedValue(generator = "prefixed-id")
    @GenericGenerator(
            name = "prefixed-id",
            type = PrefixedIdGenerator.class,
            parameters = @org.hibernate.annotations.Parameter(name = PrefixedIdGenerator.PREFIX_PARAMETER, value = "GEN")
    )
    @Column(name = "GENRE_ID")
    private String genreId;

    @Column(name = "GENRE_NAME")
    private String genreName;

}
