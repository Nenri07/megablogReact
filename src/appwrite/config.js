import conf from "../conf/conf";
import { Client, Databases, Storage,Query,ID } from "appwrite";

export class Service{
 client= new Client();
 databases;
 bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases= new Databases(this.client);
        this.bucket= new Storage(this.client);    
    }  
   async createPost({title, slug, featuredImage,content,userId, status}){
    try {
      return  await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                featuredImage,
                content,
                userId,
                status
            }
        )
        
    } catch (error) {
        console.log("Error creating post:", error);
        
    }
   }   
   
   async updatePost(slug,{title, featuredImage,content, status}){
    try {
        const updated=await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                featuredImage,
                content,
                status
            }
        )
        return updated;
    } catch (error) {
        console.log("Error updating post:", error);
        
    }
   }

   async deletePost(slug){
    try {
       await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        ); 
        return true;
    } catch (error) {
        console.log("Error deleting post:", error);
        return false;
        
    }
   }

   async getPost(slug){
    try {
       return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    } catch (error) {
        console.log("Error getting post:", error);
        return false
        
    }
   }

   async getPosts(queries=[Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );
    } catch (error) {
        console.log("Error getting posts:", error);
        return false;
        
    }
   }

   //files services

   async uploadFile(file){
    try {
        return  await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Error uploading file:", error);
        return false;
        
    }
   }

   async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        );
        return true;
    } catch (error) {
        console.log("Error deleting file:", error);
        return false;
        
    }
   }
    
   getfilePreview(fileId){
    try {
        
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        );
    } catch (error) {
        console.log("Error getting file preview:", error);
        return false;
        
    }
   }    
}
const service= new Service();

export default service;