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
@Table(name = "CHARACTERS")
public class CharacterBean extends Auditable {

    @Id
    @GeneratedValue(generator = "prefixed-id")
    @GenericGenerator(
            name = "prefixed-id",
            type = PrefixedIdGenerator.class,
            parameters = @org.hibernate.annotations.Parameter(name = PrefixedIdGenerator.PREFIX_PARAMETER, value = "CHA")
    )
    @Column(name = "CHARACTER_ID")
    private String characterId;

    @Column(name = "CHARACTER_NAME")
    private String characterName;

    @Column(name = "CHARACTER_IMAGE")
    private String characterImage;

    @Column(name = "ANIME_ID")
    private String animeId;

}
