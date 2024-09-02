package com.example.demo.service;

import com.example.demo.dto.ListCategoriesPostDto;
import com.example.demo.entity.Category;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CategoryService {
    private CategoryRepository categoryRepository;

    public Category checkExistCategory(String categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(
                () -> new InvalidInputParameter("Category with id " + categoryId + " doesn't exist."));
    }

    public List<Category> createListCategory(ListCategoriesPostDto listCategoriesPostDto) {
        return categoryRepository.saveAll(listCategoriesPostDto.categoryNameList().stream()
                .map(Category::new).toList()).stream().toList();
    }

    public Category updateCategory(String categoryId, String categoryName) {
        Category category = checkExistCategory(categoryId);
        category.setCategoryName(categoryName);
        return categoryRepository.save(category);
    }

    public void deleteCategory(String categoryId) {
        checkExistCategory(categoryId);
        categoryRepository.deleteById(categoryId);
    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }
}
