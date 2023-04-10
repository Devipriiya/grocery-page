import express from "express";
import multer from "multer";
import mongoose from "mongoose";


const router =express.Router();

const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const beautySchema=mongoose.Schema({
         beautyhygiene:[{  
            image:{
            data:String,
            contentType: String   
        },
    productname:{
        type:String,
       
        },
  price:{
         type:String,
      
     },
     quantity:{
        type:String,
     
    },
offer:{
    type:String,
}
        }]
                    
    })

var Beauty = mongoose.model('Beauty', beautySchema);
beautySchema.plugin(Beauty);
const beauty={
   beautyhygiene:[{
    image:{
        data:"ponds-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Ponds Skin care",
    price:"Rs.200",
    quantity:"1",
    offer:"15%"
},
  {
    image:{
        data:"hair_oil-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Hair Oil",
    price:"Rs.315",
    quantity:"1",
    offer:"30%"
},
{
    image:{
        data:"sunscreen-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Sunscreen",
    price:"Rs.140",
    quantity:"1",
    offer:"10%"
},
{
    image:{
        data:"colgate_paste-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Colcate paste",
    price:"Rs.159",
    quantity:"1",
    offer:"10%"
}

]
}
// connectDB();
const app=express();
app.use(express.json());




router.get('/',(req,res) =>
{
    try{
        res.status(200).send(beauty);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Beauty.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            beauty:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})

router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Beauty({
                beautyhygiene:req.body.beautyhygiene
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Beauty.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            beautyhygiene:req.body.beautyhygiene

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_beauty:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    router.delete('/:id',(req,res)=>{
        console.log(req.params.id);
        Beauty.deleteOne({_id:req.params.id},{
            $set:{
               
                beautyhygiene:req.body.beautyhygiene
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_beauty:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        router.delete('/',(req,res)=>{
    
        Beauty.deleteMany({beauty},(err,result)=>{
            if(err) throw err
            res.send(beauty)
            })
        })

        export default router;
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(beauty);
        // });