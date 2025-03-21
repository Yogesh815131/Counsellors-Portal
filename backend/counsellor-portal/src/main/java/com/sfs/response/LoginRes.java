package com.sfs.response;

import com.sfs.entities.CounsellorDetails;

public class LoginRes {
	
	private CounsellorDetails counsellorDetails;
	private String errorMsg;
	
	
	public CounsellorDetails getCounsellorDetails() {
		return counsellorDetails;
	}
	public void setCounsellorDetails(CounsellorDetails counsellorDetails) {
		this.counsellorDetails = counsellorDetails;
	}
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	@Override
	public String toString() {
		return "LoginRes [counsellorDetails=" + counsellorDetails + ", errorMsg=" + errorMsg + "]";
	}
	

}
