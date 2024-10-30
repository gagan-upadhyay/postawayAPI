import PostRepository from "./posts.repository.js";

export default class PostController{
    constructor(){
        this.postRepo = new PostRepository();
    }

    async getAllFeed(req, res){
        try{
            const result = await this.postRepo.allFeed();
            if(!result){
                return res.status(404).send("No data found, try to add data");
            }
            return res.status(200).send(result)

        }catch(err){
            console.log("Error from :\n",err)
        }
    }

    async getUserPosts(req, res){
        try{
            const result = await this.postRepo.getUserPosts(req.params.userId);
            if(!result){
                return res.status(404).send('No post from this user');
            }
            return res.status(200).send(result);

        }catch(err){
            console.log("Error from :\n",err)
        }
    }

    async addPost(req, res){
        try{
            const {imageUrl, caption, userID} = req.body;
            console.log("Value of req.body.userID", req.body.userID);
            const result = await this.postRepo.addPost(userID, caption, imageUrl);
            if(!result){
                return res.status(400).send("Something went wrong");
            }else{
                return res.status(201).send("Post created");
            }

        }catch(err){
            console.log("Error from :\n",err)
        }
    }

    async getPostbyID(req, res){
        try{
            const {postId} = req.params;
            const result = await this.postRepo.getPostById(postId);

            if(!result){
                return res.status(404).send("No post found with the this postId");
            }else{
                return res.status(200).send(result);
            }
        }catch(err){
            console.log("Error from :\n",err)
        }
    }

    async deletePost(req, res){
        try{
            const {postId} = req.params;
            const result = await this.postRepo.deletePost(postId);
            if(!result){
                return res.status(404).send("No post found with the this postId");
            }else{
                return res.status(200).send("Post deleted successfully");
            }
            
        }catch(err){
            console.log("Error from :\n",err)
        }
    }


    async updatePost(req, res){
        try{
            const {caption, imageUrl} = req.body;   
            const result = await this.postRepo.updatePost(req.params.postId, caption, imageUrl);
            if(!result){
                return res.status(404).send("No post found with the this postId");
            }else{
                return res.status(301).send("Post updated successfully");
            }

        }catch(err){
            console.log("Error from :\n",err)
        }
    }
    
}

