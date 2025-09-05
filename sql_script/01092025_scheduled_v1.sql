
CREATE TABLE Users
(
    USER_ID             VARCHAR(255) PRIMARY KEY,
    USERNAME            VARCHAR(50)  NOT NULL,
    PROFILE_IMAGE       VARCHAR(255),
    PASSWORD            VARCHAR(255) NOT NULL,
    EMAIL               VARCHAR(100) NOT NULL UNIQUE,
    PROFILE_DESCRIPTION VARCHAR(500),
    ROLE                VARCHAR(50),
    CREATED_BY          VARCHAR(255) NOT NULL,
    CREATED_AT          TIMESTAMP,
    UPDATED_BY          VARCHAR(255),
    UPDATED_AT          TIMESTAMP
);
alter table users
    add column ROLE VARCHAR(50) NOT NULL default 'User';

