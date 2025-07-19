import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
client= new Client();
account;
constructor() {
    
   this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);    
  }

async createAccount({email,password,name}){
    try {
      const userAccount=  await this.account.create(ID.unique(),email,password,name);
      if(userAccount){
//login logic
        return this.login({email,password})
      }
      else{
        return userAccount;
      }
    } catch (error) {
        throw error;
        
    }
} 

async login({email,password}){
    try {
       return this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
}


async getCurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
        // If unauthorized, return null (user not logged in)
        if (error && error.code === 401) {
            return null;
        }
        console.log("Error getting current user:", error);
        return null;
    }
}

async logout(){
    try {
      return  await this.account.deleteSessions();
    } catch (error) {
        console.log("Error logging out:", error); 
    }
}
}

const authService = new AuthService();
export default authService;