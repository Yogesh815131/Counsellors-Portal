package com.sfs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sfs.entities.Enquiries;
import com.sfs.response.StatusCount;

import jakarta.transaction.Transactional;

@Repository
public interface Enquiriesrepo extends JpaRepository<Enquiries, Long>{
	
	@Query(value = "SELECT e.status, COUNT(e.status) as count FROM enquiries e WHERE e.cid = :cid GROUP BY e.status", nativeQuery = true)
	List<StatusCount> getStatusByCount(@Param("cid") int cid);
	
	@Query(value = "SELECT DISTINCT e.* FROM enquiries e WHERE e.cid = :cid", nativeQuery = true)
	Enquiries[] findByCid(@Param("cid") int cid);

	@Query(value = "select * from enquiries e where e.eid = :eid", nativeQuery = true)
	Enquiries findByEid(@Param("eid") long eid);
	
}
