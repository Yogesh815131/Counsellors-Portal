package com.sfs.response;

public class DashbordRes {
	private Long totalEn;
	private Long openEn;
	private Long enrolledEn;
	private Long lostEn;
	
	
	public Long getEnrolledEn() {
		return enrolledEn;
	}
	public void setEnrolledEn(Long enrolledEn) {
		this.enrolledEn = enrolledEn;
	}
	public Long getTotalEn() {
		return totalEn;
	}
	public void setTotalEn(Long totalEn) {
		this.totalEn = totalEn;
	}
	public Long getOpenEn() {
		return openEn;
	}
	public void setOpenEn(Long openEn) {
		this.openEn = openEn;
	}
	public Long getLostEn() {
		return lostEn;
	}
	public void setLostEn(Long lostEn) {
		this.lostEn = lostEn;
	}
	@Override
	public String toString() {
		return "DashbordRes [totalEn=" + totalEn + ", openEn=" + openEn + ", enrolledEn=" + enrolledEn + ", lostEn="
				+ lostEn + "]";
	}
	
	
}
