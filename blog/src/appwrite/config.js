import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query, Permission, Role } from 'appwrite'

export class ConfigService{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, status, featuredImage, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userID
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, {title, content, status, featuredImage}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    // file upload service — public read so featured images work in <img> for all visitors
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                [Permission.read(Role.any())]
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
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
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    /**
     * Thumbnail / transformed image (Appwrite has limits, e.g. very large source files on preview).
     */
    getFilePreview(fileId) {
        if (fileId == null || fileId === '') {
            return null
        }
        return this.bucket.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId,
        })
    }

    /**
     * URL for <img src> cover images — uses the /view endpoint (original file) instead of /preview.
     * Preview can return errors for some files; view matches what users expect for featured photos.
     * Requires read permission (see uploadFile: Permission.read(Role.any())).
     */
    getFeaturedImageUrl(fileId) {
        if (fileId == null || fileId === '') {
            return null
        }
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId,
        })
    }
}

const appwriteService = new ConfigService();
export default appwriteService;

