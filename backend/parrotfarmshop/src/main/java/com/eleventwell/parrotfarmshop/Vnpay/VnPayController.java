package com.eleventwell.parrotfarmshop.Vnpay;

import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.service.impl.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value = "/api/vnpay")
public class VnPayController {
    PayService payService;

    @Autowired
    OrderService orderService;

    public VnPayController(PayService payService) {
        this.payService = payService;
    }

    @PostMapping("/payment")
    public String pay(@RequestBody OrderDTO orderDTO, HttpServletRequest request){
        try {
            return payService.payWithVNPAY(orderDTO, request);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/payment_infor")
    public ResponseEntity<?> transaction(
            @RequestParam(value = "vnp_Amount") Double amount,
            @RequestParam(value = "vnp_BankCode") String bankCode,
            @RequestParam(value = "vnp_ResponseCode") String responseCode,
            @RequestParam(value = "vnp_TxnRef") String txnRef
    ) {
                TransactionDTO transactionDTO = new TransactionDTO();

        // Kiểm tra responseCode
        if ("00".equals(responseCode)) {
            // Trạng thái thành công
            transactionDTO.setStatus("OK");
            transactionDTO.setMessage("Success");
            transactionDTO.setData("");
            orderService.changeStatus(Long.parseLong(txnRef));
        } else {
            // Trạng thái thất bại
            transactionDTO.setStatus("No");
            transactionDTO.setMessage("Fail");
            transactionDTO.setData("");
        }

        return ResponseEntity.status(HttpStatus.OK).body(transactionDTO);


    }




}
