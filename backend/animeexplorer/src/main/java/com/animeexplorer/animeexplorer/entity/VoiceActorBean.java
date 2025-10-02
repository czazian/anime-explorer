package com.animeexplorer.animeexplorer.entity;

import com.animeexplorer.animeexplorer.entity.Helper.Auditable;
import com.animeexplorer.animeexplorer.util.PrefixedIdGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "VOICE_ACTORS")
public class VoiceActorBean extends Auditable {

    @Id
    @GeneratedValue(generator = "prefixed-id")
    @GenericGenerator(
            name = "prefixed-id",
            type = PrefixedIdGenerator.class,
            parameters = @org.hibernate.annotations.Parameter(name = PrefixedIdGenerator.PREFIX_PARAMETER, value = "VA")
    )
    @Column(name = "VA_ID")
    private String vaId;

    @Column(name = "VA_NAME")
    private String vaName;

    @Column(name = "VA_IMAGE")
    private String vaImage;

    @Column(name = "VA_BIRTHDATE")
    private Date vaBirthdate;

}
