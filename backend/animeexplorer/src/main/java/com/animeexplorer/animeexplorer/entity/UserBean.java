package com.animeexplorer.animeexplorer.entity;

import com.animeexplorer.animeexplorer.entity.Helper.Auditable;
import org.hibernate.annotations.Parameter;
import com.animeexplorer.animeexplorer.util.PrefixedIdGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "USERS")
public class UserBean extends Auditable implements Serializable {

    @Id
    @GeneratedValue(generator = "prefixed-id")
    @GenericGenerator(
            name = "prefixed-id",
            type = PrefixedIdGenerator.class,
            parameters = @Parameter(name = PrefixedIdGenerator.PREFIX_PARAMETER, value = "USR")
    )
    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PROFILE_IMAGE")
    private String profileImage;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PROFILE_DESCRIPTION")
    private String profileDescription;

    @Column(name = "ROLE")
    private String role;

}
