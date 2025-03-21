import axios from "axios";

export class UserService {

    static URL = "http://localhost:8080/api";
    
    static register(formData) {
        const response = axios.post('http://localhost:8080/api/register', {
            name : formData.name,
            email : formData.email,
            password : formData.password,
            phno: formData.phno
        })
        return response;
    }

    static async login(formData) {
        try {
            const response = await axios.post(`${UserService.URL}/login`, {
                email: formData.email,
                password: formData.password
            });
    
            return response.data; // Return only the data part of the response
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    }

    static async getAllEnquiries() {
        try {
            const response = await axios.get(`${UserService.URL}/all/enquiries/${sessionStorage.getItem("isLoggedIn")}`);
            return response.data;
        } catch (error) {    
            console.error("Get All Enquiries Error:", error);
            throw error;
        }
    }

    static async getDashboardData() {
        try {
            const response = await axios.get(`${UserService.URL}/statuscount/${sessionStorage.getItem("isLoggedIn")}`);
            return response.data;
        } catch (error) {    
            console.error("Get All Enquiries Error:", error);
            throw error;
        }
    }
    
    // Insert a enquiry
    static async addEnquiry(formData) {
        try{
            const response = axios.post(`${UserService.URL}/addenquiry`, {
                ename : formData.name,
                email : formData.email,
                phno: formData.phno,
                classMode: formData.classMode,
                course: formData.course,
                status: formData.status,
                counsellorDetails:{
                    cid:sessionStorage.getItem("isLoggedIn")
                }
            });
            return response;
        }catch(error){
            console.error("Add Enquiry Error:", error);
            throw error;
        }
    }

    //get enquiry by id
    static async getEnquiryById(eid) {
        try {
            const response = await axios.get(`${UserService.URL}/enquiry/${eid}`,{
                params: {
                    cid: sessionStorage.getItem("isLoggedIn")
                }
            });
            return response.data;
        } catch (error) {
            console.error("Get Enquiry By ID Error:", error);
            throw error;
        }
    }

     //update enquiry by id
     static async updateEnquiry(formData) {
        try {
            const response = await axios.put(`${UserService.URL}/updateEn`,{
                eid : formData.eid,
                ename : formData.ename,
                email : formData.email,
                phno: formData.phno,
                classMode: formData.classMode,
                course: formData.course,
                status: formData.status,
                counsellorDetails:{
                    cid:sessionStorage.getItem("isLoggedIn")
                }
            });
            return response.data;
        } catch (error) {
            console.error("Get Enquiry By ID Error:", error);
            throw error;
        }
    }


}