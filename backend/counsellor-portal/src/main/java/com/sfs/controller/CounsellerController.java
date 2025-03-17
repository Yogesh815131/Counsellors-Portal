package com.sfs.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sfs.entities.CounsellorDetails;
import com.sfs.entities.Enquiries;
import com.sfs.excetion.ResourcesNotFoundException;
import com.sfs.request.ReqParam;
import com.sfs.response.StatusCount;
import com.sfs.service.CounsellorService;

@RestController
@RequestMapping("/api")
public class CounsellerController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CounsellerController.class);
	
	@Autowired
	private CounsellorService service;
	
	@GetMapping("/health")
	public ResponseEntity<String> getHealth(){
		return new ResponseEntity<>("Application Health is Good...", HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registration(@RequestBody CounsellorDetails details){
		if(details == null) {
			throw new ResourcesNotFoundException("Register Details should not be empty...");
		}		
		ResponseEntity<String> response= null;
		LOGGER.info("User Registation Start...");
		response = service.register(details);		
		LOGGER.info("User Registration Successfully Complete...");		
		return response;
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody CounsellorDetails details){
		if(details == null) {
			throw new ResourcesNotFoundException("Login Details should not be empty...");
		}		
		ResponseEntity<String> response= null;
		LOGGER.info("User Registation Start...");
		response = service.login(details);		
		LOGGER.info("User Registration Successfully Complete...");		
		return response;
	}
	
	@PostMapping("/enquiry")
	public ResponseEntity<String> enquiry(@RequestBody Enquiries details){
		if(details == null) {
			throw new ResourcesNotFoundException("Enquiry Details should not be empty...");
		}		
		ResponseEntity<String> response= null;
		LOGGER.info("Enquiry Insert Start...");
		response = service.addEnquiry(details);		
		LOGGER.info("Enquiry Insert Successfully Completed...");		
		return response;
	}
	
	@GetMapping("/enquiry/{eid}")
	public ResponseEntity<Enquiries> getEnquiry(@PathVariable long eid){		
		ResponseEntity<Enquiries> response= null;
		LOGGER.info("Enquiry Insert Start...");
		response = service.getEnquiry(eid);		
		LOGGER.info("Enquiry Insert Successfully Completed...");		
		return response;
	}
	
	@GetMapping("/statuscount/{cid}")
	public ResponseEntity<List<StatusCount>> getEnquiryStatus(@PathVariable int cid){		
		ResponseEntity<List<StatusCount>> response= null;
		LOGGER.info("Enquiry Fetching...");
		response = service.getStatusByCount(cid);	
		LOGGER.info("Enquiry Data Fetched.");		
		return response;
	}
	
	
	@GetMapping("/all/enquiries/{cid}")
	public ResponseEntity<Enquiries[]> getAllEnquiries(@PathVariable int cid){
		ResponseEntity<Enquiries[]> response = null;
		LOGGER.info("All Enquiries Fetching...");
		response = service.getAllEnquiries(cid);
		LOGGER.info("All Enquiries Fetched.");
		return response;
	}
	
	@PostMapping("/classmode")
	public ResponseEntity<Enquiries[]> getClassMode(@RequestBody ReqParam classMode){
		ResponseEntity<Enquiries[]> response = null;
		LOGGER.info("All Enquiries Fetching...");
		response = service.getClassMode(classMode.getClassMode());
		LOGGER.info("All Enquiries Fetched.");
		return response;
	}
	
	@PostMapping("/course")
	public ResponseEntity<Enquiries[]> getCourse(@RequestBody ReqParam course){
		ResponseEntity<Enquiries[]> response = null;
		LOGGER.info("All Enquiries Fetching...");
		response = service.getCourse(course.getCourse());
		LOGGER.info("All Enquiries Fetched.");
		return response;
	}
	
	@PostMapping("/status")
	public ResponseEntity<Enquiries[]> getStatus(@RequestBody ReqParam status){
		ResponseEntity<Enquiries[]> response = null;
		LOGGER.info("All Enquiries Fetching...");
		response = service.getStatus(status.getStatus());
		LOGGER.info("All Enquiries Fetched.");
		return response;
	}	

}
