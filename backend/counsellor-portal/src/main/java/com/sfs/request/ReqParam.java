package com.sfs.request;

public class ReqParam {
	private String classMode;
	private String course;
	private String status;
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
		return "ReqParam [classMode=" + classMode + ", course=" + course + ", status=" + status + "]";
	}
	
	
}
