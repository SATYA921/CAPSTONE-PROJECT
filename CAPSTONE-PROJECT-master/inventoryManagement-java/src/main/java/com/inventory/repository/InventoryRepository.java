package com.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entity.InventoryItem;

public interface InventoryRepository extends JpaRepository<InventoryItem, Long>{

}
