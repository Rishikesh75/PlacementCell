package com.example.placementicsbackend.services.analytics.impl;

import com.example.placementicsbackend.dtos.AlumniStatistics;
import com.example.placementicsbackend.dtos.CompanyAlumniCount;
import com.example.placementicsbackend.dtos.CompanyInsights;
import com.example.placementicsbackend.dtos.CompanyRanking;
import com.example.placementicsbackend.dtos.DashboardStats;
import com.example.placementicsbackend.dtos.MonthlyPlacementData;
import com.example.placementicsbackend.dtos.PlacementTrends;
import com.example.placementicsbackend.dtos.PositionCount;
import com.example.placementicsbackend.dtos.RecentPlacement;
import com.example.placementicsbackend.dtos.RecommendedResources;
import com.example.placementicsbackend.dtos.TopBookResource;
import com.example.placementicsbackend.dtos.TopLinkResource;
import com.example.placementicsbackend.dtos.YearlyPlacementCount;
import com.example.placementicsbackend.dtos.YearlyPlacementData;
import com.example.placementicsbackend.helpers.SqlQueryLoader;
import com.example.placementicsbackend.models.feedbacks.AlumniFeedBackonCompany;
import com.example.placementicsbackend.models.interviewrounds.BookResource;
import com.example.placementicsbackend.models.interviewrounds.LinkResource;
import com.example.placementicsbackend.models.interviewrounds.Resources;
import com.example.placementicsbackend.repositories.AlumniFeedBackonCompanyRepository;
import com.example.placementicsbackend.services.analytics.interfaces.IPlacementAnalyticsService;
import java.math.BigDecimal;
import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlacementAnalyticsService implements IPlacementAnalyticsService {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final SqlQueryLoader sqlQueryLoader;
    private final AlumniFeedBackonCompanyRepository alumniFeedBackonCompanyRepository;

    @Override
    public DashboardStats getDashboardStats() {
        DashboardStats stats = new DashboardStats();

        jdbcTemplate.query(sqlQueryLoader.loadQuery("Dashboard", "GetDashboardStats"), rs -> {
            if (rs.next()) {
                stats.setTotalStudents(rs.getInt("total_students"));
                stats.setTotalAlumni(rs.getInt("total_alumni"));
                stats.setTotalCompanies(rs.getInt("total_companies"));
                stats.setTotalFeedbacks(rs.getInt("total_feedbacks"));
                stats.setActiveOpenings(rs.getInt("active_openings"));
                stats.setTotalTeachers(rs.getInt("total_teachers"));
            }
        });

        stats.setRecentPlacements(getRecentPlacements(5));
        return stats;
    }

    @Override
    public List<CompanyRanking> getTopCompaniesRanking(int topN) {
        String rankingSql = sqlQueryLoader.loadQuery("Companies", "GetTopCompaniesRanking");
        MapSqlParameterSource params = new MapSqlParameterSource("p_top_n", topN);

        List<CompanyRanking> rankings = jdbcTemplate.query(rankingSql, params, (rs, rowNum) -> {
            BigDecimal avgPackage = rs.getBigDecimal("average_Package");
            if (rs.wasNull() || avgPackage == null || avgPackage.compareTo(BigDecimal.ZERO) <= 0) {
                return buildRanking(rs, "N/A");
            }
            return buildRanking(rs, String.format("%.2f LPA", avgPackage));
        });

        String yearlySql = sqlQueryLoader.loadQuery("Companies", "GetCompanyYearlyPlacements");
        for (CompanyRanking ranking : rankings) {
            MapSqlParameterSource yearlyParams = new MapSqlParameterSource("p_CompanyId", ranking.getCompanyId());
            List<YearlyPlacementCount> yearlyPlacements = jdbcTemplate.query(
                    yearlySql,
                    yearlyParams,
                    (rs, rowNum) -> new YearlyPlacementCount(rs.getInt("year"), rs.getInt("placement_count")));
            ranking.setYearlyPlacements(yearlyPlacements);
        }

        return rankings;
    }

    @Override
    public CompanyInsights getCompanyInsights(String companyId) {
        String sql = sqlQueryLoader.loadQuery("Companies", "GetCompanyInsights");
        MapSqlParameterSource params = new MapSqlParameterSource("p_CompanyId", companyId);

        List<CompanyInsights> results = jdbcTemplate.query(sql, params, (rs, rowNum) -> {
            CompanyInsights insights = new CompanyInsights();
            insights.setCompanyId(rs.getString("CompanyId"));
            insights.setCompanyName(rs.getString("CompanyName"));
            insights.setIndustry(rs.getString("Industry"));
            insights.setTotalAlumniPlaced(rs.getInt("total_alumni_placed"));
            insights.setTotalFeedbacks(rs.getInt("total_feedbacks"));
            insights.setAverageCTC(rs.getBigDecimal("average_ctc"));
            if (rs.wasNull()) {
                insights.setAverageCTC(BigDecimal.ZERO);
            }
            insights.setJobProfiles(readStringArray(rs, "job_profiles"));
            insights.setLocations(readStringArray(rs, "locations"));
            return insights;
        });

        if (results.isEmpty()) {
            CompanyInsights empty = new CompanyInsights();
            empty.setCompanyId(companyId);
            return empty;
        }
        return results.get(0);
    }

    @Override
    public AlumniStatistics getAlumniStatistics() {
        AlumniStatistics stats = new AlumniStatistics();

        jdbcTemplate.query(sqlQueryLoader.loadQuery("Alumni", "GetAlumniStatistics"), rs -> {
            if (rs.next()) {
                stats.setTotalAlumni(rs.getInt("total_alumni"));
                stats.setUniqueCompanies(rs.getInt("unique_companies"));
            }
        });

        List<CompanyAlumniCount> companyWiseList = jdbcTemplate.query(
                sqlQueryLoader.loadQuery("Alumni", "GetAlumniByCompany"),
                (rs, rowNum) -> {
                    CompanyAlumniCount company = new CompanyAlumniCount();
                    company.setCompanyId(rs.getString("CompanyId"));
                    company.setCompanyName(rs.getString("CompanyName"));
                    company.setTotalAlumniCount(rs.getInt("total_alumni_count"));
                    company.setPositionWiseCount(new ArrayList<>());
                    return company;
                });

        String positionsSql = sqlQueryLoader.loadQuery("Alumni", "GetPositionsByCompany");
        for (CompanyAlumniCount company : companyWiseList) {
            MapSqlParameterSource params = new MapSqlParameterSource("p_CompanyId", company.getCompanyId());
            List<PositionCount> positions = jdbcTemplate.query(
                    positionsSql,
                    params,
                    (rs, rowNum) -> new PositionCount(rs.getString("position_name"), rs.getInt("total_count")));
            company.setPositionWiseCount(positions);
        }

        stats.setCompanyWiseCount(companyWiseList);
        return stats;
    }

    @Override
    public List<RecentPlacement> getRecentPlacements(int count) {
        String sql = sqlQueryLoader.loadQuery("Dashboard", "GetRecentPlacements");
        MapSqlParameterSource params = new MapSqlParameterSource("p_count", count);
        return jdbcTemplate.query(sql, params, this::mapRecentPlacement);
    }

    @Override
    public PlacementTrends getPlacementTrends() {
        PlacementTrends trends = new PlacementTrends();

        jdbcTemplate.query(sqlQueryLoader.loadQuery("Placements", "GetPlacementTrendsSummary"), rs -> {
            if (rs.next()) {
                trends.setTotalPlacements(rs.getInt("total_placements"));
            }
        });

        List<YearlyPlacementData> yearlyData = jdbcTemplate.query(
                sqlQueryLoader.loadQuery("Placements", "GetYearlyPlacementData"),
                (rs, rowNum) -> {
                    YearlyPlacementData year = new YearlyPlacementData();
                    year.setYear(rs.getInt("year"));
                    year.setTotalPlacements(rs.getInt("total_placements"));
                    year.setUniqueCompanies(rs.getInt("unique_companies"));
                    year.setPositionWiseCount(new ArrayList<>());
                    year.setMonthlyData(new ArrayList<>());
                    return year;
                });

        String positionsByYearSql = sqlQueryLoader.loadQuery("Placements", "GetPositionsByYear");
        String monthlySql = sqlQueryLoader.loadQuery("Placements", "GetMonthlyPlacementData");
        String positionsByYearMonthSql = sqlQueryLoader.loadQuery("Placements", "GetPositionsByYearMonth");

        for (YearlyPlacementData year : yearlyData) {
            MapSqlParameterSource yearParams = new MapSqlParameterSource("p_year", year.getYear());
            year.setPositionWiseCount(jdbcTemplate.query(
                    positionsByYearSql,
                    yearParams,
                    (rs, rowNum) -> new PositionCount(rs.getString("position_name"), rs.getInt("total_count"))));

            List<MonthlyPlacementData> monthlyData = jdbcTemplate.query(
                    monthlySql,
                    yearParams,
                    (rs, rowNum) -> {
                        MonthlyPlacementData month = new MonthlyPlacementData();
                        month.setMonth(rs.getInt("month"));
                        month.setMonthName(rs.getString("month_name").trim());
                        month.setPlacementCount(rs.getInt("placement_count"));
                        month.setPositionWiseCount(new ArrayList<>());
                        return month;
                    });

            for (MonthlyPlacementData month : monthlyData) {
                MapSqlParameterSource monthParams = new MapSqlParameterSource()
                        .addValue("p_year", year.getYear())
                        .addValue("p_month", month.getMonth());
                month.setPositionWiseCount(jdbcTemplate.query(
                        positionsByYearMonthSql,
                        monthParams,
                        (rs, rowNum) -> new PositionCount(rs.getString("position_name"), rs.getInt("total_count"))));
            }

            year.setMonthlyData(monthlyData);
        }

        trends.setYearlyData(yearlyData);
        return trends;
    }

    @Override
    @Transactional(readOnly = true)
    public RecommendedResources getTopRecommendedResources(int topN) {
        List<AlumniFeedBackonCompany> feedbacks = alumniFeedBackonCompanyRepository.findAll().stream()
                .filter(feedback -> feedback.getResourcesInfo() != null)
                .filter(feedback -> {
                    Resources resources = feedback.getResourcesInfo();
                    return (resources.getLinks() != null && !resources.getLinks().isEmpty())
                            || (resources.getBooks() != null && !resources.getBooks().isEmpty());
                })
                .toList();

        List<TopLinkResource> topLinks = feedbacks.stream()
                .filter(feedback -> feedback.getResourcesInfo().getLinks() != null)
                .flatMap(feedback -> feedback.getResourcesInfo().getLinks().stream())
                .collect(Collectors.groupingBy(
                        link -> link.getUrl().toLowerCase(),
                        Collectors.toList()))
                .values()
                .stream()
                .map(group -> {
                    LinkResource first = group.get(0);
                    TopLinkResource resource = new TopLinkResource();
                    resource.setTitle(first.getTitle());
                    resource.setUrl(first.getUrl());
                    resource.setDescription(first.getDescription());
                    resource.setCategory(first.getCategory());
                    resource.setRecommendationCount(group.size());
                    return resource;
                })
                .sorted(Comparator.comparingInt(TopLinkResource::getRecommendationCount).reversed())
                .limit(topN)
                .toList();

        List<TopBookResource> topBooks = feedbacks.stream()
                .filter(feedback -> feedback.getResourcesInfo().getBooks() != null)
                .flatMap(feedback -> feedback.getResourcesInfo().getBooks().stream())
                .collect(Collectors.groupingBy(
                        book -> book.getBookName().toLowerCase() + "|" + book.getAuthor().toLowerCase(),
                        Collectors.toList()))
                .values()
                .stream()
                .map(group -> {
                    BookResource first = group.get(0);
                    TopBookResource resource = new TopBookResource();
                    resource.setBookName(first.getBookName());
                    resource.setAuthor(first.getAuthor());
                    resource.setDescription(first.getDescription());
                    resource.setCategory(first.getCategory());
                    resource.setRecommendationCount(group.size());
                    return resource;
                })
                .sorted(Comparator.comparingInt(TopBookResource::getRecommendationCount).reversed())
                .limit(topN)
                .toList();

        RecommendedResources resources = new RecommendedResources();
        resources.setTotalFeedbacksWithResources(feedbacks.size());
        resources.setTopLinks(topLinks);
        resources.setTopBooks(topBooks);
        return resources;
    }

    private CompanyRanking buildRanking(ResultSet rs, String averagePackage) throws SQLException {
        CompanyRanking ranking = new CompanyRanking();
        ranking.setCompanyId(rs.getString("CompanyId"));
        ranking.setCompanyName(rs.getString("CompanyName"));
        ranking.setIndustry(rs.getString("Industry"));
        ranking.setTotalPlacements(rs.getInt("total_placements"));
        ranking.setRank(rs.getInt("rank"));
        ranking.setAveragePackage(averagePackage);
        ranking.setYearlyPlacements(new ArrayList<>());
        return ranking;
    }

    private RecentPlacement mapRecentPlacement(ResultSet rs, int rowNum) throws SQLException {
        RecentPlacement placement = new RecentPlacement();
        placement.setPlacementId(rs.getInt("placement_id"));
        placement.setId(rs.getString("student_id"));
        placement.setStudentName(rs.getString("student_name"));
        placement.setCompanyName(rs.getString("CompanyName"));
        placement.setJobTitle(rs.getString("job_Title"));
        placement.setPlacementDate(rs.getObject("placement_Date", LocalDate.class));
        placement.setPkg(rs.getString("Package"));
        return placement;
    }

    private List<String> readStringArray(ResultSet rs, String column) throws SQLException {
        Array array = rs.getArray(column);
        if (array == null || rs.wasNull()) {
            return List.of();
        }
        Object value = array.getArray();
        if (value instanceof String[] strings) {
            return Arrays.asList(strings);
        }
        return List.of();
    }
}
