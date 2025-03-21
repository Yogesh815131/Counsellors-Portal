package com.sfs.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sfs.entities.CounsellorDetails;
import com.sfs.entities.Enquiries;
import com.sfs.excetion.ResourcesNotFoundException;
import com.sfs.request.ReqParam;
import com.sfs.response.DashbordRes;
import com.sfs.response.LoginRes;
import com.sfs.service.CounsellorService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CounsellerController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CounsellerController.class);
	
	
	private CounsellorService service;
	
	public CounsellerController(CounsellorService service) {
		this.service = service;
	}

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
	public ResponseEntity<LoginRes> login(@RequestBody CounsellorDetails details){
		if(details == null) {
			throw new ResourcesNotFoundException("Login Details should not be empty...");
		}		
		ResponseEntity<LoginRes> response= null;
		LOGGER.info("User Login id -> " + details.getCid());
		response = service.login(details);		
		LOGGER.info("User Login response -> "+response);		
		return response;
	}
	
	@PostMapping("/addenquiry")
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
	public ResponseEntity<Enquiries> getEnquiry(@RequestParam int cid, @PathVariable long eid){		
		ResponseEntity<Enquiries> response= null;
		LOGGER.info("Enquiry Fetch : eid -> "+ eid);
		response = service.getEnquiry(eid, cid);		
		LOGGER.info("Enqury Fetch");		
		return response;
	}
	
	@PutMapping("/updateEn")
	public ResponseEntity<String> updateEnquiry(@RequestBody Enquiries enquiry){		
		ResponseEntity<String> response= null;
		LOGGER.info("Enquiry Update : eid -> "+ enquiry.getEid());
		response = service.updateEnquiry(enquiry);		
		LOGGER.info("Enqury Updated");		
		return response;
	}
	
	@GetMapping("/statuscount/{cid}")
	public ResponseEntity<DashbordRes> getEnquiryStatus(@PathVariable int cid){		
		ResponseEntity<DashbordRes> response= null;
		LOGGER.info("Enquiry Fetching...");
		response = service.getStatusByCount(cid);	
		LOGGER.info("Enquiry Data Fetched.");		
		return response;
	}
	
	@GetMapping("/all/enquiries/{cid}")
	public ResponseEntity<List<Enquiries>> getAllEnquiries(@PathVariable int cid){
		ResponseEntity<List<Enquiries>> response = null;
		LOGGER.info("All Enquiries Fetching...");
		response = service.getAllEnquiries(cid);
		LOGGER.info("All Enquiries Fetched.");
		return response;
	}
	
	@PostMapping("/filter/{cid}")
	public ResponseEntity<List<Enquiries>> getByFilter(@RequestBody ReqParam req, @PathVariable int cid) {
	    LOGGER.info("Fetching enquiries for CID: {} with Class Mode: {}", cid);
	    ResponseEntity<List<Enquiries>> response = service.getByFilter(req, cid);
	    LOGGER.info("All enquiries fetched.");
	    return response;
	}
}
