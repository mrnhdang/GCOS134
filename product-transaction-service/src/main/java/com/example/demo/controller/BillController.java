package com.example.demo.controller;

import com.example.demo.dto.BillGetDetailDto;
import com.example.demo.dto.BillPaymentDto;
import com.example.demo.entity.Bill;
import com.example.demo.service.BillService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/bill")
public class BillController {
    private BillService billService;

    @GetMapping("")
    public ResponseEntity<List<BillGetDetailDto>> getAllBill() {
        return ResponseEntity.ok(billService.getAllBill());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillGetDetailDto> getBillDetails(@PathVariable("id") String id) {
        return ResponseEntity.ok(billService.getBillDetail(id));
    }

    @PatchMapping("/payment/{id}")
    public void payBill(@PathVariable("id") String id, @RequestBody BillPaymentDto billPaymentDto) {
        billService.payBill(id, billPaymentDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBill(@PathVariable("id") String id) {
        billService.deleteBillById(id);
    }
}
