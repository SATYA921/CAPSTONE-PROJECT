package com.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.entity.InventoryItem;
import com.inventory.repository.InventoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;

    public InventoryItem createItem(InventoryItem item) {
        return inventoryRepository.save(item);
    }

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public Optional<InventoryItem> getItemById(Long id) {
        return inventoryRepository.findById(id);
    }

    public InventoryItem updateItem(Long id, InventoryItem item) {
        if (inventoryRepository.existsById(id)) {
            item.setId(id);
            return inventoryRepository.save(item);
        }
        return null;
    }

    public void deleteItem(Long id) {
        inventoryRepository.deleteById(id);
    }
}
