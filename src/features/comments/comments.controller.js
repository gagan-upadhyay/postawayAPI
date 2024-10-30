import CommentRepository from "./comments.repository.js";


export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
    }

    async getComment(req, res){
        try{
            const result = await this.commentRepository.getComments(req.params.postId);
            if(!result){
                return res.status(200).send('No Comments yet!');
            }
            return res.status(200).send(result);
        }catch(err){
            console.log("Error at getComment:\n", err);
            return res.status(500).send('Internal server Error');
        }
    }
    async postComment(req, res){
        console.log(req.body.userID);
        try{
            const result = await this.commentRepository.addComment(
                req.params.postId, 
                req.body.userID, 
                req.body.comment
            );
            return res.status(200).send(result);
        }catch(err){
            console.log("Error at getComment:\n", err);
            return res.status(500).send('Internal server Error');
        }
    }

    async delComment(req, res){
        try{
            console.log("Inside delcomment");
            const result = await this.commentRepository.delComment(
                req.params.commentId, 
                req.body.userID,
                req.body.postId
            );
            console.log("Value of result in delCOmment", result);
            if(result.message==='Not authorised'){
                return res.status(401).send('Unauthorised')
            }
            return res.status(200).send(result);
            
        }catch(err){
            console.log("Error at delComment:\n", err);
            return res.status(500).send('Internal server Error');
        }
    }
}