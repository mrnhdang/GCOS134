package com.example.demo.controller;

import com.example.demo.dto.InventoryPatchDto;
import com.example.demo.entity.Inventory;
import com.example.demo.service.InventoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {
    private InventoryService inventoryService;

    @GetMapping("")
    public ResponseEntity<List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Inventory> updateInventoryAmount(@PathVariable("id") String id, @RequestBody InventoryPatchDto dto) {
        return ResponseEntity.ok(inventoryService.editInventory(id, dto));
    }

}
