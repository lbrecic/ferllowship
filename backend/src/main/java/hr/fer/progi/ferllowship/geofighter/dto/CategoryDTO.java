package hr.fer.progi.ferllowship.geofighter.dto;

import javax.persistence.Column;

public class CategoryDTO {

    private String categoryName;

    private Integer categoryPoints;

    public CategoryDTO(String categoryName, Integer categoryPoints) {
        this.categoryName = categoryName;
        this.categoryPoints = categoryPoints;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getCategoryPoints() {
        return categoryPoints;
    }

    public void setCategoryPoints(Integer categoryPoints) {
        this.categoryPoints = categoryPoints;
    }

}
