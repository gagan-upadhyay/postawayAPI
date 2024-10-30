import LikeRepository from "./like.repository.js";



export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async getAllLikes(req, res){
        try{
            console.log("User ID from getAllLikes controller", req.params.id);
            const result = await this.likeRepository.getAllLikes(req.params.id);
            if(!result){
                return res.status(404).send("No likes on this item");
            }
            return res.status(200).send(result);

        }catch(err){
            console.log("Error in like getAllLikes section\n", err);
            return res.status(500).send("internal server error");
        }
    }

    async toggleLike(req, res){
        try{
            const result = await this.likeRepository.toggleLike(req.params.id, req.body.userID);
            if(result){
                return res.status(200).send('Liked/unliked the item');
            }
        }catch(err){
            console.log("Error in like getAllLikes section\n", err);
            return res.status(500).send("internal server error");
        }
        
    }
}