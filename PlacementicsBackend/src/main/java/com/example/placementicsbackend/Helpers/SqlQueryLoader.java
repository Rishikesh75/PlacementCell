namespace PlacementCellBackend.Helpers
{
    /// <summary>
    /// Loads SQL queries from files in the SQL/Queries folder.
    /// Queries are cached in memory for performance.
    /// </summary>
    public static class SqlQueryLoader
    {
        private static readonly Dictionary<string, string> _queryCache = new();
        private static readonly object _lock = new();
        private static string? _basePath;

        /// <summary>
        /// Gets the base path for SQL query files
        /// </summary>
        private static string BasePath
        {
            get
            {
                if (_basePath == null)
                {
                    _basePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "SQL", "Queries");
                }
                return _basePath;
            }
        }

        /// <summary>
        /// Load a SQL query from file. Queries are cached for performance.
        /// </summary>
        /// <param name="category">Folder name (e.g., "Dashboard", "Companies", "Alumni", "Placements")</param>
        /// <param name="queryName">File name without extension (e.g., "GetDashboardStats")</param>
        /// <returns>The SQL query string</returns>
        /// <exception cref="FileNotFoundException">Thrown when the SQL file is not found</exception>
        public static string LoadQuery(string category, string queryName)
        {
            var cacheKey = $"{category}/{queryName}";

            // Check cache first (thread-safe read)
            if (_queryCache.TryGetValue(cacheKey, out var cachedQuery))
            {
                return cachedQuery;
            }

            // Load from file (thread-safe write)
            lock (_lock)
            {
                // Double-check after acquiring lock
                if (_queryCache.TryGetValue(cacheKey, out cachedQuery))
                {
                    return cachedQuery;
                }

                var filePath = Path.Combine(BasePath, category, $"{queryName}.sql");

                if (!File.Exists(filePath))
                {
                    throw new FileNotFoundException(
                        $"SQL query file not found: {filePath}. " +
                        $"Ensure the file exists and is set to 'Copy to Output Directory'.",
                        filePath);
                }

                var query = File.ReadAllText(filePath).Trim();
                _queryCache[cacheKey] = query;

                return query;
            }
        }

        /// <summary>
        /// Preload all queries at startup for better performance.
        /// Call this in Program.cs during application startup.
        /// </summary>
        public static void PreloadAllQueries()
        {
            if (!Directory.Exists(BasePath))
            {
                Console.WriteLine($"[SqlQueryLoader] Warning: SQL Queries folder not found at {BasePath}");
                return;
            }

            var loadedCount = 0;

            foreach (var categoryDir in Directory.GetDirectories(BasePath))
            {
                var category = Path.GetFileName(categoryDir);

                foreach (var sqlFile in Directory.GetFiles(categoryDir, "*.sql"))
                {
                    var queryName = Path.GetFileNameWithoutExtension(sqlFile);

                    try
                    {
                        LoadQuery(category, queryName);
                        loadedCount++;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"[SqlQueryLoader] Warning: Failed to load {category}/{queryName}: {ex.Message}");
                    }
                }
            }

            Console.WriteLine($"[SqlQueryLoader] Preloaded {loadedCount} SQL queries from {BasePath}");
        }

        /// <summary>
        /// Clear the query cache (useful for hot-reload scenarios during development)
        /// </summary>
        public static void ClearCache()
        {
            lock (_lock)
            {
                _queryCache.Clear();
            }
        }

        /// <summary>
        /// Get the count of cached queries
        /// </summary>
        public static int CachedQueryCount => _queryCache.Count;
    }
}
