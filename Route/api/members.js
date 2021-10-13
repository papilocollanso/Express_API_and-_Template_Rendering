const express=require('express');
const members=require('../../members');
const uuid=require('uuid');
const Router= new express();


//Get all members
Router.get('/',(req,res)=>{

    res.json(members);
    
    });
    //get single member
    
    Router.get('/:id',(req,res)=>{
        const found=members.some(member=>member.id===parseInt(req.params.id));
    
        if(found){
            res.send(members.filter(member=>member.id===parseInt(req.params.id)));
        }
    else{
        res.status(400).json({msg: `member not found at id ${req.params.id}`});
    }
    
    
    });

    // create member post
    Router.post('/',(req,res)=>{
   const newMember={
       id: uuid.v4(),
       name: req.body.name,
       email: req.body.email,
       status:'active'
   }
   if(!newMember.name || !newMember.email){
     return  res.status(400).json({msg:'please include name and email'});
   }
members.push(newMember);
//res.json(members);
res.redirect('/');
    });

    //update members

  Router.put('/:id',(req,res)=>{
        const found=members.some(member=>member.id===parseInt(req.params.id));
    
        if(found){
         const updates=req.body
         members.forEach(member=>{
             if(member.id===parseInt(req.params.id)){
                 member.name=updates.name?updates.name:member.name;
                 member.email=updates.email?updates.email:member.email;
                 res.json({msg:member});
             }
         })
        }
    else{
        res.status(400).json({msg: `member not found at id ${req.params.id}`});
    }
    
    
    });



    //delete members
    Router.delete('/:id',(req,res)=>{
        const found=members.some(member=>member.id===parseInt(req.params.id));
    
        if(found){
            res.send({msg:"Members deleted", members: members.filter(member=>member.id!==parseInt(req.params.id))});
        }
    else{
        res.status(400).json({msg: `member not found at id ${req.params.id}`});
    }
    
    
    });
    
    module.exports=Router;