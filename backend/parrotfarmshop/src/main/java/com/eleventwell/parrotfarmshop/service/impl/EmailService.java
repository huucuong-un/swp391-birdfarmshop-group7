package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.entity.EmailDetailsEntity;
import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.repository.OrderDetailRepository;
import com.eleventwell.parrotfarmshop.repository.OrderRepository;
import com.eleventwell.parrotfarmshop.service.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;


import java.io.File;
import java.util.List;


@Service
public class EmailService implements IEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

@Autowired
private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderDetailService orderDetailService;

    @Value("${spring.mail.username}")
    private String sender;


    private String processThymeleafTemplate(Long id) {
        OrderEntity orderEntity =  orderRepository.findOneById(id);
        List<OrderDetailHistoryModel>  orderDetailHistoryModel = orderDetailService.createOrderDetailHistoryModelList(id);
        Context context = new Context();
        context.setVariable("customerName", orderEntity.getUser().getFullName());
        context.setVariable("orderDetailHistoryModelList", orderDetailHistoryModel);



        context.setVariable("totalPrice", orderEntity.getTotalPrice());
        context.setVariable("shopLink", "https://huucuong-un.github.io/htmlcss-1112studio/?fbclid=IwAR177w5Ref1WUBg432KBNieE9wKll9rdKw70B_YpFL8V1vJNGZZWgOlBfLE#");

        return templateEngine.process("email-template", context);
    }

    //Method 1
    //To send a simple mail
    @Override
    public String sendSimpleMail(EmailDetailsEntity details) {
        try {
            //Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            String emailContent = processThymeleafTemplate(details.getOrderId());

            mimeMessageHelper.setSubject(details.getSubject());
            mimeMessageHelper.setText(emailContent, true); // Set the content type to HTML

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            return "Error while Sending Mail";
        }

    }




    // Method 2
    // To send an email with attachment
    @Override
    public String sendMailWithAttachment(EmailDetailsEntity details) {
        // Creating a mime message
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

        // Setting multipart as true for attachments to
        // be send

        mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        mimeMessageHelper.setFrom(sender);
        mimeMessageHelper.setTo(details.getRecipient());

        mimeMessageHelper.setSubject(details.getSubject());

        String htmlContent = processThymeleafTemplate(details.getOrderId());
        mimeMessageHelper.setText(htmlContent, true);


            // Adding the attachment
        FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));

        mimeMessageHelper.addAttachment(file.getFilename(), file);

        // Sending the mail
        javaMailSender.send(mimeMessage);
        return "Mail sent Successfully";
    }

    // Catch block to handle MessagingException
        catch (MessagingException e) {

        // Display message when exception occurred
        return "Error while sending mail!!!";
    }
    }

    public void createEmailDetailByOrderId(Long id){

    OrderEntity orderEntity =  orderRepository.findOneById(id);
    EmailDetailsEntity emailDetailsEntity = new EmailDetailsEntity();
    emailDetailsEntity.setRecipient(orderEntity.getUser().getEmail());
    emailDetailsEntity.setSubject("Order Confirmation");
    emailDetailsEntity.setOrderId(id);
    emailDetailsEntity.setMsgBody("Test send mail Parrot Farm Shop project \n\nThis is a Simple Email \n\nThanks");

    sendSimpleMail(emailDetailsEntity);

    }
}
