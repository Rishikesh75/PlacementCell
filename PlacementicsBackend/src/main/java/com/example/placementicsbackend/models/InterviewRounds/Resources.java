package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.ResourceCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resources {

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ResourcesInfo_Links")
    private List<LinkResource> links = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ResourcesInfo_Books")
    private List<BookResource> books = new ArrayList<>();
}
