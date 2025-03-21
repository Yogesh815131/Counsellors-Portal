package com.sfs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sfs.entities.Enquiries;
import com.sfs.response.DashbordRes;

import jakarta.transaction.Transactional;

@Repository
public interface Enquiriesrepo extends JpaRepository<Enquiries, Long>{
	
	@Query(value = "SELECT * from enquiries e WHERE e.cid = :cid", nativeQuery = true)
	List<Enquiries> getStatusByCount(@Param("cid") int cid);
	
	@Query(value = "SELECT DISTINCT e.* FROM enquiries e WHERE e.cid = :cid", nativeQuery = true)
	List<Enquiries> findByCid(@Param("cid") int cid);

	@Query(value = "select * from enquiries e where e.eid = :eid and e.cid = :cid", nativeQuery = true)
	Enquiries findByEid(@Param("eid") long eid, @Param("cid") int cid);
	
	
	@Query(value = "select * from enquiries where eid = :eid and cid = :cid", nativeQuery = true)
	public Enquiries findByEidAndCid(@Param("eid") long eid,@Param("cid") int cid); 
	
	Enquiries[] findByClassMode(String classMode);
	
	Enquiries[] findByCourse(String course);
	
	Enquiries[] findByStatus(String status);
	
	
	@Modifying
    @Transactional
    @Query(value = "UPDATE enquiries SET ename = :ename, phno = :phno, class_Mode = :classMode, course = :course, status = :status WHERE eid = :eid AND cid = :cid", 
           nativeQuery = true)
    int updateEnquiry(@Param("ename") String ename, 
                      @Param("phno") String phno,
                      @Param("classMode") String classMode,
                      @Param("course") String course,
                      @Param("status") String status,
                      @Param("eid") Long eid,
                      @Param("cid") int cid);
	
}
