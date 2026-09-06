package com.example.placementicsbackend.config;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class R2PublicUrlBuilder {

    private final String publicBaseUrl;

    public R2PublicUrlBuilder(@Value("${app.r2.public-base-url}") String publicBaseUrl) {
        this.publicBaseUrl = stripTrailingSlash(publicBaseUrl);
    }

    public String toPublicUrl(String imageFileName) {
        if (imageFileName == null || imageFileName.isBlank()) {
            return null;
        }
        String encoded = URLEncoder.encode(imageFileName.trim(), StandardCharsets.UTF_8)
                .replace("+", "%20");
        return publicBaseUrl + "/" + encoded;
    }

    private static String stripTrailingSlash(String url) {
        if (url == null || url.isBlank()) {
            return "";
        }
        String trimmed = url.trim();
        return trimmed.endsWith("/") ? trimmed.substring(0, trimmed.length() - 1) : trimmed;
    }
}
