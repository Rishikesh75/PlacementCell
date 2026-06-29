package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.ResourceCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookResource {

    private String bookName = "";
    private String author = "";
    private String description = "";
    private String isbn;
    private String publisher;
    private ResourceCategory category = ResourceCategory.DSA;
}
