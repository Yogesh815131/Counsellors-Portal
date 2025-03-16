package com.sfs.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "enquiries")
public class Enquiries {
	
	@Id
	@Column(name = "eid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long eid;
	@Column(name = "ename")
	private String ename;
	@Column(name = "phno")
	private String phno;
	@Column(name = "classMode")
	private String classMode;
	@Column(name = "course")
	private String course;
	@Column(name = "status")
	private String status;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "cid", referencedColumnName = "cid")
	@JsonBackReference
	private CounsellorDetails counsellorDetails;
	
	
	public CounsellorDetails getCounsellorDetails() {
		return counsellorDetails;
	}
	public void setCounsellorDetails(CounsellorDetails counsellorDetails) {
		this.counsellorDetails = counsellorDetails;
	}
	public Long getEid() {
		return eid;
	}
	public void setEid(Long eid) {
		this.eid = eid;
	}
	public String getEname() {
		return ename;
	}
	public void setEname(String ename) {
		this.ename = ename;
	}
	public String getPhno() {
		return phno;
	}
	public void setPhno(String phno) {
		this.phno = phno;
	}
	public String getClassMode() {
		return classMode;
	}
	public void setClassMode(String classMode) {
		this.classMode = classMode;
	}
	public String getCourse() {
		return course;
	}
	public void setCourse(String course) {
		this.course = course;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Enquiries [eid=" + eid + ", ename=" + ename + ", phno=" + phno + ", classMode=" + classMode
				+ ", course=" + course + ", status=" + status + "]";
	}
	

}
