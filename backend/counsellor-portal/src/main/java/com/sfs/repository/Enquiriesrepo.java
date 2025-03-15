package com.sfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sfs.entities.Enquiries;

@Repository
public interface Enquiriesrepo extends JpaRepository<Enquiries, Long>{

}
