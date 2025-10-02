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
@Table(name = "STUDIO")
public class StudioBean extends Auditable {

    @Id
    @GeneratedValue(generator = "prefixed-id")
    @GenericGenerator(
            name = "prefixed-id",
            type = PrefixedIdGenerator.class,
            parameters = @org.hibernate.annotations.Parameter(name = PrefixedIdGenerator.PREFIX_PARAMETER, value = "STU")
    )
    @Column(name = "STUDIO_ID")
    private String studioId;

    @Column(name = "STUDIO_NAME")
    private String studioName;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "STUDIO_LOGO")
    private String studioLogo;

    @Column(name = "WEBSITE")
    private String website;

}