package com.example.demo.service;

import com.example.demo.dto.InventoryPatchDto;
import com.example.demo.entity.Inventory;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.InventoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class InventoryService {
    private InventoryRepository inventoryRepository;

    private Inventory checkInventoryExist(String id) {
        return inventoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Inventory with id " + id + " doesn't exist."));
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory editInventory(String inventoryId, InventoryPatchDto dto) {
        Inventory inventory = checkInventoryExist(inventoryId);
        inventory.setCurrentQuantity(dto.currentAmount());
        return inventoryRepository.save(inventory);
    }
}
