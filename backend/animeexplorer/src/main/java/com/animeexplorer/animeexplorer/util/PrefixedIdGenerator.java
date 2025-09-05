package com.animeexplorer.animeexplorer.util;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.id.Configurable;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;

import java.io.Serializable;
import java.security.SecureRandom;
import java.util.Properties;

public class PrefixedIdGenerator implements IdentifierGenerator, Configurable {

    private static final String ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final int LENGTH_OF_RANDOM_PART = 8;

    public static final String PREFIX_PARAMETER = "prefix";

    private String prefix;

    @Override
    public void configure(Type type, Properties properties, ServiceRegistry serviceRegistry) throws HibernateException {
        this.prefix = properties.getProperty(PREFIX_PARAMETER);
        if (prefix == null || prefix.trim().isEmpty()) {
            throw new HibernateException("Prefix parameter is required for PrefixedIdGenerator");
        }
        this.prefix = prefix.toUpperCase();
    }

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        return generatePrefixedId(this.prefix);
    }

    private String generatePrefixedId(String prefix) {
        String randomPart = generateAlphanumericId();
        return prefix + randomPart;
    }

    private String generateAlphanumericId() {
        StringBuilder sb = new StringBuilder(LENGTH_OF_RANDOM_PART);
        for (int i = 0; i < LENGTH_OF_RANDOM_PART; i++) {
            int index = secureRandom.nextInt(ALPHANUMERIC.length());
            sb.append(ALPHANUMERIC.charAt(index));
        }
        return sb.toString();
    }
}