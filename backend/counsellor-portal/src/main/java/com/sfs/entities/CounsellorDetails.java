package com.sfs.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table( name = "CounsellorDetails")
public class CounsellorDetails {
	@Id
	@Column(name = "cid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cid;
	private String name;
	private String email;
	private String password;
	private String phno;
	
	@OneToMany(mappedBy = "counsellorDetails", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<Enquiries> enquiries;
	
	public List<Enquiries> getEnquiries() {
		return enquiries;
	}
	public void setEnquiries(List<Enquiries> enquiries) {
		this.enquiries = enquiries;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhno() {
		return phno;
	}
	public void setPhno(String phno) {
		this.phno = phno;
	}
	
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	@Override
	public String toString() {
		return "CounsellorDetails [cid=" + cid + ", name=" + name + ", email=" + email + ", password=" + password
				+ ", phno=" + phno + ", enquiries=" + enquiries + "]";
	}
	
	
	
	

}
