package com.example.demo.service;

import com.example.demo.entity.Order;
import com.example.demo.entity.OrderDetail;
import com.example.demo.entity.OrderStatus;
import com.example.demo.repository.OrderDetailRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class OrderDetailService {
    private OrderDetailRepository orderDetailRepository;

    public void addOrUpdateOrderDetail(List<OrderDetail> orderDetails, Order order) {
        // validate order
        List<OrderDetail> orderDetailList = orderDetailRepository.findByOrder(order.getId());

        // update the order details
        if (!orderDetailList.isEmpty()) {
            orderDetailList.forEach(orderDetail -> {
                if (OrderStatus.DONE.equals(order.getStatus())) {
                    orderDetail.setTotalAmount(orderDetail.getHoldAmount());
                }
                orderDetails.add(orderDetail);
            });
        }

        // update the order details order id
        orderDetails.forEach(orderDetail -> orderDetail.setOrder(order));

        // save or update the order details
        orderDetailRepository.saveAll(orderDetails);
    }
}
