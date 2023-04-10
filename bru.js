import express from "express";
import multer from "multer";
import mongoose from "mongoose";
// import connectDB from "./db.js";

const router =express.Router();
// connectDB();
// const app=express();
// app.use(express.json());
const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const bruSchema=mongoose.Schema({
  bru:[ {
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

var Bru = mongoose.model('Bru',bruSchema);
bruSchema.plugin(Bru);
const brubrand={
  bru:[ {
    image:{
        data:"https://www.kindpng.com/picc/m/579-5792844_coffee-jar-png-image-bru-instant-coffee-powder.png",
contentType:"image/png"
    },
    productname:"Instant",
    price:"Rs.550",
    quantity:"500gm",
    offer:"30%"
},
  {
    image:{
        data:"https://cdn.shopify.com/s/files/1/0485/9900/7399/products/brugreenlale_800x600.png?v=1649156121",
contentType:"image/png"
    },
    productname:"Green Label",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:{
        data:"https://www.vrindasupermart.in/wp-content/uploads/2021/09/290185_13-bru-gold-instant-coffee-100-pure-authentic-taste.png",
contentType:"image/png"
    },
    productname:"Bru gold",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:{
        data:"https://opoto.in/image/cache/catalog/products/Health%20Drinks/iD%20Filter%20Coffee%20500%20gms-600x600.png",
contentType:"image/png"
    },
    productname:"Instant Decoction",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
}

]
}
// connectDB();
// const app=express();
// app.use(express.json());




router.get('/',(req,res) =>
{
    try{
        res.status(200).send(brubrand);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
     Bru.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            Brubrand:result
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
            const newBru = new Bru({
               bru:req.body.bru
            })
            newBru.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Bru.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            bru:req.body.bru

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_brubrand:result       
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
        Bru.deleteOne({_id:req.params.id},{
            $set:{
               
                bru:req.body.bru
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_brubrand:result       
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
    
          Bru.deleteMany({brubrand},(err,result)=>{
            if(err) throw err
            res.send(brubrand)
            })
        })

        export default router;
//         const port=5000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
// });