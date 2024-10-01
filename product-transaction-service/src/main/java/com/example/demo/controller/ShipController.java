package com.example.demo.controller;

import com.example.demo.dto.ShipDetailDto;
import com.example.demo.dto.ShipPostDto;
import com.example.demo.entity.Ship;
import com.example.demo.service.ShipService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Validated
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/ship")
public class ShipController {
    private ShipService shipService;

    @GetMapping("")
    public ResponseEntity<List<ShipDetailDto>> getAllShip() {
        return ResponseEntity.ok(shipService.getAllShip());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShipDetailDto> getShippingDetail(@PathVariable("id") String shipId) {
        return ResponseEntity.ok(shipService.getShipDetail(shipId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Ship>> searchShippingOrder(@RequestParam("from") LocalDate from, @RequestParam("from") LocalDate to) {
        return ResponseEntity.ok(shipService.searchShippingOrder(from, to));
    }

    @PostMapping("")
    public ResponseEntity<Ship> createShip(@RequestBody ShipPostDto dto) {
        return new ResponseEntity<>(shipService.createShip(dto), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<Ship> confirmShippedOrder(@PathVariable("id") String shipId) {
        return ResponseEntity.ok(shipService.confirmShippedOrder(shipId));
    }

    @DeleteMapping("/{id}")
    public void deleteOrderShipping(@PathVariable("id") String shipId) {
        shipService.deleteOrderShipping(shipId);
    }
}
