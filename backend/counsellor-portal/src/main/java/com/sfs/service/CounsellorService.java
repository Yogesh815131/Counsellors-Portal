package com.sfs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sfs.entities.CounsellorDetails;
import com.sfs.repository.CounsellorRepo;

@Service
public class CounsellorService {
	
	@Autowired
	private CounsellorRepo repo;

	public ResponseEntity<String> register(CounsellorDetails details) {		
		CounsellorDetails userDetail = null, userDetails1 = null;
		ResponseEntity<String> response = null;
		
		
		try {
			userDetails1 = repo.findByEmail(details.getEmail());
			if(userDetails1 != null) {
				response = new ResponseEntity<String>("Email Already exists...", HttpStatus.OK);
			}else {
				userDetail = repo.save(details);
				if (userDetail != null) {
					response = new ResponseEntity<String>("Registration Successfully...", HttpStatus.OK);
				}else {
					response = new ResponseEntity<String>("Something went wrong...", HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return response;
	}
	
	public ResponseEntity<String> login(CounsellorDetails details){
		CounsellorDetails userDetails = null;
		ResponseEntity<String> response = null;		
		userDetails = repo.findByEmail(details.getEmail());
		if(userDetails != null) {
			if(details.getPassword().equals(userDetails.getPassword())) {
				response = new ResponseEntity<>(userDetails.toString(), HttpStatus.OK);
			}else {
				response = new ResponseEntity<>("UserName and Password Invalid", HttpStatus.UNAUTHORIZED);
			}
		}else {
			response = new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
		}		
		return response;
	}

}
