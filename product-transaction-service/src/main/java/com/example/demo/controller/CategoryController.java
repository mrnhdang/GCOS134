package com.example.demo.controller;

import com.example.demo.dto.ListCategoriesPostDto;
import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/category")
public class CategoryController {
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategory() {
        return ResponseEntity.ok(categoryService.getAllCategory());
    }

    @PostMapping("")
    public ResponseEntity<List<Category>> createCategories(@RequestBody ListCategoriesPostDto listCategoriesPostDto) {
        return new ResponseEntity<>(categoryService.createListCategory(listCategoriesPostDto), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Category> editCategory(@PathVariable("id") String categoryId, @RequestBody String categoryName) {
        return ResponseEntity.ok(categoryService.updateCategory(categoryId, categoryName));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCategory(@PathVariable("id") String categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}
