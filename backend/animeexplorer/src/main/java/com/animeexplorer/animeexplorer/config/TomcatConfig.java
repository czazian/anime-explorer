package com.animeexplorer.animeexplorer.config;

import org.apache.coyote.http11.Http11NioProtocol;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TomcatConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomcatCustomizer() {
        return factory -> {
            factory.addConnectorCustomizers(connector -> {
                Http11NioProtocol protocol = (Http11NioProtocol) connector.getProtocolHandler();

                // Set max swallow size to handle large file uploads
                protocol.setMaxSwallowSize(16 * 1024 * 1024); // 16MB

                // Set connection timeout
                protocol.setConnectionTimeout(60000); // 60 seconds

                // Set max post size
                connector.setMaxPostSize(16 * 1024 * 1024); // 16MB

                // Set max save post size
                connector.setMaxSavePostSize(16 * 1024 * 1024); // 16MB

                // Set keep alive timeout
                protocol.setKeepAliveTimeout(60000); // 60 seconds
            });
        };
    }
}
