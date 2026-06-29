package com.example.placementicsbackend.Helpers;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

@Component
public class SqlQueryLoader {

    private static final String QUERY_BASE = "classpath:sql/queries/";

    private final ConcurrentHashMap<String, String> queryCache = new ConcurrentHashMap<>();

    public String loadQuery(String category, String queryName) {
        String cacheKey = category + "/" + queryName;
        return queryCache.computeIfAbsent(cacheKey, key -> readQuery(category, queryName));
    }

    @PostConstruct
    public void preloadAllQueries() {
        try {
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            Resource[] resources = resolver.getResources(QUERY_BASE + "**/*.sql");
            int loadedCount = 0;
            for (Resource resource : resources) {
                String filename = resource.getFilename();
                if (filename == null) {
                    continue;
                }
                String queryName = filename.replace(".sql", "");
                String uri = resource.getURI().toString();
                int queriesIndex = uri.indexOf("/queries/");
                if (queriesIndex < 0) {
                    continue;
                }
                String relative = uri.substring(queriesIndex + "/queries/".length());
                int slashIndex = relative.lastIndexOf('/');
                if (slashIndex < 0) {
                    continue;
                }
                String category = relative.substring(0, slashIndex);
                loadQuery(category, queryName);
                loadedCount++;
            }
            System.out.println("[SqlQueryLoader] Preloaded " + loadedCount + " SQL queries");
        } catch (IOException ex) {
            System.out.println("[SqlQueryLoader] Warning: Failed to preload queries: " + ex.getMessage());
        }
    }

    public int getCachedQueryCount() {
        return queryCache.size();
    }

    private String readQuery(String category, String queryName) {
        String path = QUERY_BASE + category + "/" + queryName + ".sql";
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        try {
            Resource resource = resolver.getResource(path);
            if (!resource.exists()) {
                throw new IllegalStateException("SQL query file not found: " + path);
            }
            try (InputStream inputStream = resource.getInputStream()) {
                return StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8).trim();
            }
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to load SQL query: " + path, ex);
        }
    }
}
