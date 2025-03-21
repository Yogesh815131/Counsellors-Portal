package com.sfs.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.sfs.entities.CounsellorDetails;
import com.sfs.entities.Enquiries;
import com.sfs.repository.CounsellorRepo;
import com.sfs.repository.Enquiriesrepo;
import com.sfs.request.ReqParam;
import com.sfs.response.DashbordRes;
import com.sfs.response.LoginRes;

import io.micrometer.common.util.StringUtils;

@Service
public class CounsellorService {
	
	private CounsellorRepo repo;
	private Enquiriesrepo enquiriesrepo;
	
	public CounsellorService(CounsellorRepo repo, Enquiriesrepo enquiriesrepo) {
		this.repo = repo;
		this.enquiriesrepo = enquiriesrepo;
	}

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
	
	public ResponseEntity<LoginRes> login(CounsellorDetails details){
		CounsellorDetails userDetails = null;
		ResponseEntity<LoginRes> response = null;	
		LoginRes loginRes = new LoginRes();
		userDetails = repo.findByEmail(details.getEmail());
		if(userDetails != null) {
			if(details.getPassword().equals(userDetails.getPassword())) {
				loginRes.setCounsellorDetails(userDetails);
				response = new ResponseEntity<>(loginRes, HttpStatus.OK);
			}else {
				loginRes.setErrorMsg("Credintial Invalid");
				response = new ResponseEntity<>(loginRes, HttpStatus.UNAUTHORIZED);
			}
		}else {
			loginRes.setErrorMsg("User Not Found");
			response = new ResponseEntity<>(loginRes, HttpStatus.NOT_FOUND);
		}		
		return response;
	}
	
	public ResponseEntity<String> addEnquiry(@RequestBody Enquiries reqEnquiry){
		ResponseEntity<String> response = null;
		Enquiries enquiry = new Enquiries();
		
		try {
			enquiry = enquiriesrepo.save(reqEnquiry);
			if(enquiry != null) {
				response = new ResponseEntity<>("Inquiry Inserted successfully...", HttpStatus.OK);
			}else {
				response = new ResponseEntity<>("somthing went wrong...", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return response;
	}
	
	public ResponseEntity<DashbordRes> getStatusByCount(int cid){
		ResponseEntity<DashbordRes> response = null;
		List<Enquiries> obj = null; 
		DashbordRes dr = new DashbordRes();
		try {
			obj = enquiriesrepo.getStatusByCount(cid);
			if(obj != null) {
				
				long totalEn = obj.size();
				
				long lostEn = obj.stream()
				   .filter(e -> e.getStatus().equals("Lost"))
				   .count();
				
				long openEn = obj.stream()
						   .filter(e -> e.getStatus().equals("Open"))
						   .count();
				
				long enrolledEn = obj.stream()
						   .filter(e -> e.getStatus().equals("Enrolled"))
						   .count();
				
				dr.setTotalEn(totalEn);
				dr.setEnrolledEn(enrolledEn);
				dr.setLostEn(lostEn);
				dr.setOpenEn(openEn);
				response = new ResponseEntity<DashbordRes>(dr, HttpStatus.OK);
			}else {
				response = new ResponseEntity<DashbordRes>(dr, HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	
	public ResponseEntity<Enquiries> getEnquiry(long eid, int cid){
		ResponseEntity<Enquiries> response = null;
		Enquiries obj = null; 
		try {
			obj = enquiriesrepo.findByEid(eid, cid);
			if(obj != null) {
				response = new ResponseEntity<>(obj, HttpStatus.OK);
			}else {
				response = new ResponseEntity<>(obj, HttpStatus.NOT_FOUND);
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	public ResponseEntity<String> updateEnquiry(Enquiries enquiry){
		ResponseEntity<String> response = null;
		Enquiries obj = new Enquiries(); 
		try {
			obj= enquiriesrepo.findByEidAndCid(enquiry.getEid(), enquiry.getCounsellorDetails().getCid());			
			if(obj != null) {
				enquiriesrepo.updateEnquiry(enquiry.getEname(), enquiry.getPhno(), enquiry.getClassMode(), enquiry.getCourse(), enquiry.getStatus(), enquiry.getEid(), enquiry.getCounsellorDetails().getCid());
				response = new ResponseEntity<>("Enquiry updated successful.", HttpStatus.OK);
			}else {
				response = new ResponseEntity<>("Enquiry Not Updated.", HttpStatus.OK);
			}							
		} catch (Exception e) {
			e.printStackTrace();
			response = new ResponseEntity<>("Somthing went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	
	public ResponseEntity<List<Enquiries>> getAllEnquiries(int cid){
		ResponseEntity<List<Enquiries>> response = null;
		List<Enquiries> obj = null;
		try {
			obj = enquiriesrepo.findByCid(cid);
			if(obj != null) {
				response = new ResponseEntity<>(obj, HttpStatus.OK);
			}else {
				response = new ResponseEntity<>(obj, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	public ResponseEntity<List<Enquiries>> getByFilter(ReqParam reqP, int cid){
		ResponseEntity<List<Enquiries>> response = null;
		Enquiries enq = new Enquiries();
		List<Enquiries> enqList = null;
		CounsellorDetails cd = null;
		try {
			
			if(StringUtils.isNotEmpty(reqP.getClassMode())) {
				enq.setClassMode(reqP.getClassMode().toLowerCase());
			}
			
			if(StringUtils.isNotEmpty(reqP.getCourse().toLowerCase())) {
				enq.setCourse(reqP.getCourse());
			}
			
			if(StringUtils.isNotEmpty(reqP.getStatus().toLowerCase())) {
				enq.setStatus(reqP.getStatus());
			}
			cd = repo.findById(cid).orElse(null);
			
			enq.setCounsellorDetails(cd);
			
			Example<Enquiries> of = Example.of(enq);
			
			enqList = enquiriesrepo.findAll(of);
			if(enqList != null) {
				response = new ResponseEntity<List<Enquiries>>(enqList, HttpStatus.OK);
			}else {
				response = new ResponseEntity<List<Enquiries>>(enqList, HttpStatus.NOT_FOUND);
			}			
		} catch (Exception e) {
			e.printStackTrace();		
		}
		return response;
	}	
}
