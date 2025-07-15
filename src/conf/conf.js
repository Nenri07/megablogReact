const conf = {
appwriteUrl:String(import.meta.env.Vite_APPWRITE_URL),
appwriteProjectId:String(import.meta.env.Vite_APPWRITE_PROJECT_ID),
appwriteCollectionId:String(import.meta.env.Vite_APPWRITE_COLLECTION_ID),
appwriteDatabaseId:String(import.meta.env.Vite_APPWRITE_DATABASE_ID),
appwriteBucketId:String(import.meta.env.Vite_APPWRITE_BUCKET_ID)

}
export default conf