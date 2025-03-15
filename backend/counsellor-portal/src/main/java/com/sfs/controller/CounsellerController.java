package com.sfs.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sfs.entities.CounsellorDetails;
import com.sfs.excetion.ResourcesNotFoundException;
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
	

}
