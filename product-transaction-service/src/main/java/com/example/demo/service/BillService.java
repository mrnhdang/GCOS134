package com.example.demo.service;

import com.example.demo.dto.BillGetDetailDto;
import com.example.demo.dto.BillPaymentDto;
import com.example.demo.dto.OrderProductDto;
import com.example.demo.entity.Bill;
import com.example.demo.entity.BillStatus;
import com.example.demo.entity.OrderDetail;
import com.example.demo.entity.User;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.BillRepository;
import com.example.demo.repository.OrderDetailRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BillService {
    private BillRepository billRepository;
    private UserService userService;
    private OrderDetailRepository orderDetailRepository;
    private UserRepository userRepository;
    private OrderService orderService;

    public List<BillGetDetailDto> getAllBill() {
        List<Bill> bills = billRepository.findAll();

        return bills.stream().map(bill -> BillGetDetailDto.builder()
                .id(bill.getId())
                .user(bill.getOrder().getUser())
                .orderId(bill.getOrder().getId())
                .payDate(bill.getPayDate())
                .status(bill.getStatus())
                .totalPrice(bill.getTotalPrice())
                .build()).toList();
    }

    public Bill checkExistBill(String id) {
        return billRepository.findById(id).orElseThrow(() -> new NotFoundException("Bill with id " + id + " doesn't exist."));
    }

    public BillGetDetailDto getBillDetail(String id) {
        Bill bill = checkExistBill(id);

        List<OrderProductDto> orderProductDtos = new ArrayList<>();

        bill.getOrder().getProducts().forEach(product -> {
            OrderDetail orderDetail = orderDetailRepository.findByProductAndOrder(product.getId(), bill.getOrder().getId());
            OrderProductDto dto = OrderProductDto.builder()
                    .productId(product.getId())
                    .productName(product.getProductName())
                    .price(product.getPrice())
                    .orderAmount(orderDetail.getTotalAmount())
                    .build();
            orderProductDtos.add(dto);
        });

        return BillGetDetailDto.builder()
                .orderId(bill.getOrder().getId())
                .products(orderProductDtos)
                .id(bill.getId())
                .payDate(bill.getPayDate())
                .status(bill.getStatus())
                .user(bill.getOrder().getUser())
                .totalPrice(bill.getTotalPrice())
                .build();
    }

    public void deleteBillById(String id) {
        checkExistBill(id);
        billRepository.deleteById(id);
    }

    public void payBill(String id, BillPaymentDto dto) {
        Bill bill = checkExistBill(id);
        User user = userService.getUserById(dto.userId());
        if (user.getBalance().compareTo(dto.payPrice()) < 0) {
            throw new InvalidInputParameter("You don't have enough balance.");
        }
        if (dto.payPrice().compareTo(bill.getTotalPrice()) < 0) {
            throw new InvalidInputParameter("Not enough for the bill.");
        }
        bill.setPayDate(LocalDate.now());
        bill.setStatus(BillStatus.PAID);
        BigDecimal updateBalance = user.getBalance().subtract(dto.payPrice());
        user.setBalance(updateBalance);
        userRepository.save(user);
        billRepository.save(bill);
    }

}
