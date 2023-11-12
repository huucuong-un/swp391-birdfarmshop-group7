package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.dto.OTPDTO;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.entity.DeliveryInformationEntity;
import com.eleventwell.parrotfarmshop.entity.EmailDetailsEntity;
import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.repository.DeliveryInformationRepository;
import com.eleventwell.parrotfarmshop.repository.OrderDetailRepository;
import com.eleventwell.parrotfarmshop.repository.OrderRepository;
import com.eleventwell.parrotfarmshop.repository.UserRepository;
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
import java.util.Random;


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
    private UserService userService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private DeliveryInformationRepository deliveryInformationRepository;
    @Autowired
    private OTPService otpService;

    @Value("${spring.mail.username}")
    private String sender;


    private String processThymeleafTemplate(Long id) {
        OrderEntity orderEntity =  orderRepository.findOneById(id);
        List<OrderDetailHistoryModel>  orderDetailHistoryModel = orderDetailService.createOrderDetailHistoryModelList(id);

        Context context = new Context();

        context.setVariable("customerName", orderEntity.getUser().getFullName());
     context.setVariable("delivery",orderEntity.getDeliveryInformation());

        context.setVariable("orderDetailHistoryModelList", orderDetailHistoryModel);


        context.setVariable("totalPrice", orderEntity.getTotalPrice());
        context.setVariable("shopLink", "https://huucuong-un.github.io/htmlcss-1112studio/?fbclid=IwAR177w5Ref1WUBg432KBNieE9wKll9rdKw70B_YpFL8V1vJNGZZWgOlBfLE#");

        return templateEngine.process("email-template", context);
    }
    private String getDeliveryUserName(Long id){
        DeliveryInformationEntity  deliveryInformationEntity = orderRepository.findOneByOrderId(id);
        return deliveryInformationEntity.getName();
    }
    private String getPhoneNumber(Long id){
        DeliveryInformationEntity  deliveryInformationEntity = orderRepository.findOneByOrderId(id);
        return deliveryInformationEntity.getPhoneNumber();
    }
    private String getAddress(Long id){
        DeliveryInformationEntity  deliveryInformationEntity = orderRepository.findOneByOrderId(id);
        return deliveryInformationEntity.getName();
    }



    private String processThymeleafTemplate(String email) {
        Context context = new Context();
        Random random = new Random();

        // Generate a random 6-digit number
        int min = 100000;
        int max = 999999;
        int random6DigitNumber = random.nextInt(max - min + 1) + min;
        String numberAsString = Integer.toString(random6DigitNumber);

        String userName  = userService.getUserNameByEmail(email);
        OTPDTO otpdto = new OTPDTO(email,numberAsString);
        otpService.save(otpdto);
        context.setVariable("customerName", userName);
        context.setVariable("OTP", numberAsString);




        return templateEngine.process("resetPassword-template", context);
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
            String emailContent=null;
            if(details.getCheck().equals("order")) {
                emailContent = processThymeleafTemplate(details.getOrderId());
            }else if(details.getCheck().equals("password")){

         emailContent = processThymeleafTemplate(details.getRecipient());

            }
            mimeMessageHelper.setSubject(details.getSubject());
            mimeMessageHelper.setText(emailContent, true); // Set the content type to HTML

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            e.printStackTrace();
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
    emailDetailsEntity.setCheck("order");
    emailDetailsEntity.setOrderId(id);
    emailDetailsEntity.setMsgBody("Test send mail Parrot Farm Shop project \n\nThis is a Simple Email \n\nThanks");

    sendSimpleMail(emailDetailsEntity);

    }
    public void createEmailDetailForRestPassword(String email){

        EmailDetailsEntity emailDetailsEntity = new EmailDetailsEntity();
        emailDetailsEntity.setRecipient(email);
        emailDetailsEntity.setSubject("[11-Twell Parrot Shop] - Reset Password");
        emailDetailsEntity.setCheck("password");
        emailDetailsEntity.setMsgBody("Test send mail Parrot Farm Shop project \n\nThis is a Simple Email \n\nThanks");
        sendSimpleMail(emailDetailsEntity);

    }
}
