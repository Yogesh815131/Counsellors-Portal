package com.sfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sfs.entities.CounsellorDetails;

@Repository
public interface CounsellorRepo extends JpaRepository<CounsellorDetails, Integer>{
	
	public CounsellorDetails findByEmail(String email);

}
