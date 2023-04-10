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
const cadburySchema=mongoose.Schema({
  cadbury:[ {
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

var Cadbury = mongoose.model('Cadbury', cadburySchema);
cadburySchema.plugin(Cadbury);
const cadburybrand={
  cadbury:[ {
    image:{
        data:"https://w7.pngwing.com/pngs/104/321/png-transparent-chocolate-bar-cadbury-dairy-milk-world-chocolate-day-food-heroes-milk-chocolate.png",
contentType:"image/png"
    },
    productname:"Dairy Milk",
    price:"Rs.550",
    quantity:"500gm",
    offer:"30%"
},
  {
    image:{
        data:"https://www.seekpng.com/png/detail/257-2571809_product-image-cadbury-dinky-deckers-120g.png",
       contentType:"image/png"
    },
    productname:"Dinky Deckers",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:{
        data:"https://w7.pngwing.com/pngs/948/127/png-transparent-cadbury-roses-cadbury-dairy-milk-chocolate-fudge-catalog-food-grocery-store-fudge-thumbnail.png",
contentType:"image/png"
    },
    productname:"Roses",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:{
        data:"https://cdn.shopify.com/s/files/1/0528/8801/0912/products/CadburyFudgeBites120g_jpg_45c2eda0-a1cf-469a-b527-eba6a50b944a_800x.png?v=1671253071",
contentType:"image/png"
    },
    productname:"Fudge minis",
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
        res.status(200).send(cadburybrand);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
     Cadbury.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            cadburybrand:result
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
            const newCadbury = new Cadbury({
               cadbury:req.body.cadbury
            })
            newCadbury.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Cadbury.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            cadbury:req.body.cadbury

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_cadburybrand:result       
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
        Cadbury.deleteOne({_id:req.params.id},{
            $set:{
               
                cadbury:req.body.cadbury
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_cadburybrand:result       
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
    
          Cadbury.deleteMany({cadburybrand},(err,result)=>{
            if(err) throw err
            res.send(cadburybrand)
            })
        })

        export default router;
//         const port=5000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
// });