import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Permission,Role} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            
        }
    }

    async updatePost(slug, {title, content,featuredImage, status,userid}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            
        }
    }
    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

        async getPost(slug) {
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug   // fetch by ID
        );
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error);
        return false;
    }
}



    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
           return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
           ) 
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            const uploadedFile =  await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                 [
                Permission.read(Role.any()) // ✅ allow public read
            ]
            )
            return uploadedFile
        } catch (error) {
            console.log("Appwrite service :: uploadfile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFileView(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;      


