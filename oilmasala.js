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
const masalaSchema=mongoose.Schema({
  oilsandmasala:[ {
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

 } ]
}
)

var Masala = mongoose.model('Masala', masalaSchema);
masalaSchema.plugin(Masala);
const masala={
  oilsandmasala:[ {
    image:{
        data:"gold-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Gold winner Oil",
    price:"Rs.300",
    quantity:"2L",
    offer:"30%"
},
  {
    image:{
        data:"usha-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Usha oil",
    price:"Rs.150",
    quantity:"1L",
    offer:"30%"
},
{
    image:{
        data:"garam-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Garam masala",
    price:"Rs.50",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:{
        data:"chicken-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Chicken masala",
    price:"Rs.50",
    quantity:"500 gm",
    offer:"30%"
}

]
}
// connectDB();
const app=express();
app.use(express.json());




router.get('/',(req,res) =>
{
    try{
        res.status(200).send(masala);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{cam
    
    console.log(req.params.id);
    Masala.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            masala:result
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
            const newImage = new Masala({
               oilsandmasala:req.body.oilsandmasala
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Masala.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            oilsandmasala:req.body.oilsandmasala

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_oilsandmasala:result       
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
        Masala.deleteOne({_id:req.params.id},{
            $set:{
               
                oilsandmasala:req.body.oilsandmasala
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_oilsandmasala:result       
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
    
        Masala.deleteMany({masala},(err,result)=>{
            if(err) throw err
            res.send(masala)
            })
        })
export default router;
     
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(masala);
        // });