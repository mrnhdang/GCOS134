package com.example.demo.controller;

import com.example.demo.dto.InventoryPatchDto;
import com.example.demo.entity.Inventory;
import com.example.demo.service.InventoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {
    private InventoryService inventoryService;

    @PatchMapping("/{id}")
    public ResponseEntity<Inventory> updateInventoryAmount(@PathVariable("id") String id, @RequestBody InventoryPatchDto dto) {
        return ResponseEntity.ok(inventoryService.editInventory(id, dto));
    }

}
