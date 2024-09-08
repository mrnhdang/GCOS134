package com.example.demo.service;

import com.example.demo.dto.BillPaymentDto;
import com.example.demo.entity.Bill;
import com.example.demo.entity.BillStatus;
import com.example.demo.entity.User;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.BillRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class BillService {
    private BillRepository billRepository;
    private UserService userService;

    public List<Bill> getAllBill() {
        return billRepository.findAll();
    }

    public Bill getBillDetails(String id) {
        return billRepository.findById(id).orElseThrow(() -> new NotFoundException("Bill with id " + id + " doesn't exist."));
    }

    public void deleteBillById(String id) {
        getBillDetails(id);
        billRepository.deleteById(id);
    }

    public void payBill(String id, BillPaymentDto dto) {
        Bill bill = getBillDetails(id);
        User user = userService.getUserById(dto.userId());
        if(user.getBalance().compareTo(dto.payPrice()) < 0){
            throw new InvalidInputParameter("You don't have enough balance.");
        }
        if (dto.payPrice() != null && dto.payPrice().compareTo(bill.getTotalPrice()) < 0) {
            throw new InvalidInputParameter("Not enough for the bill.");
        }
        bill.setPayDate(LocalDate.now());
        bill.setStatus(BillStatus.PAID);
        billRepository.save(bill);
    }

}
