package com.example.demo.service;

import com.example.demo.dto.BillGetDetailDto;
import com.example.demo.dto.BillPaymentDto;
import com.example.demo.dto.OrderProductDto;
import com.example.demo.entity.*;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.BillRepository;
import com.example.demo.repository.OrderDetailRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class BillService {
    private UserService userService;
    private OrderDetailService orderDetailService;
    private OrderDetailRepository orderDetailRepository;
    private UserRepository userRepository;
    private BillRepository billRepository;


    public List<BillGetDetailDto> getAllBill() {
        List<Bill> bills = billRepository.findAll();

        return bills.stream().map(bill -> BillGetDetailDto.builder()
                .id(bill.getId())
                .username(bill.getOrder().getUser().getUsername())
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
                    .holdAmount(orderDetail.getHoldAmount())
                    .build();
            orderProductDtos.add(dto);
        });

        return BillGetDetailDto.builder()
                .orderId(bill.getOrder().getId())
                .products(orderProductDtos)
                .id(bill.getId())
                .payDate(bill.getPayDate())
                .status(bill.getStatus())
                .username(bill.getOrder().getUser().getUsername())
                .totalPrice(bill.getTotalPrice())
                .build();
    }

    public void deleteBillById(String id) {
        checkExistBill(id);
        billRepository.deleteById(id);
    }

    public void deleteAllBill(){
        billRepository.deleteAll();
    }

    public void payBill(String id, BillPaymentDto dto) {
        // validation
        Bill bill = checkExistBill(id);
        User user = userService.getUserById(dto.userId());
        if (user.getBalance().compareTo(dto.payPrice()) < 0) {
            throw new InvalidInputParameter("You don't have enough balance.");
        }
        if (dto.payPrice().compareTo(bill.getTotalPrice()) < 0) {
            throw new InvalidInputParameter("Not enough for the bill.");
        }

        // update bill status, pay date, and user balance
        bill.setPayDate(LocalDate.now());
        bill.setStatus(BillStatus.PAID);
        bill.getOrder().setStatus(OrderStatus.DONE);
        BigDecimal updateBalance = user.getBalance().subtract(dto.payPrice());
        user.setBalance(updateBalance);

        // update order details and update inventory
        orderDetailService.addOrUpdateOrderDetail(new ArrayList<>(), bill.getOrder());

        // save
        userRepository.save(user);
        billRepository.save(bill);
    }

}
