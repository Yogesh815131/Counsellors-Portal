package com.sfs.response;

public class StatusCount {
	private String status;
	private Long count;
	private String error;
	
	public StatusCount(String status, Long count) {
		super();
		this.status = status;
		this.count = count;
//		this.error = error;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	@Override
	public String toString() {
		return "StatusCount [status=" + status + ", count=" + count + "]";
	}
}
