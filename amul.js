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
const amulSchema= mongoose.Schema({
  amul:[ {
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

const Amul = mongoose.model('Amul', amulSchema);
amulSchema.plugin(Amul);
const amulbrand={
  amul:[ {
    image:"https://toppng.com/uploads/preview/amul-lassi-115386790124dr3tgpk2f.png",
    productname:"Lassi",
    price:"Rs.550",
    quantity:"2L",
    offer:"30%"
},
  {
    image:"https://w7.pngwing.com/pngs/527/458/png-transparent-buttermilk-lassi-chaas-amul-milk-food-flavored-milk-grocery-store-thumbnail.png",
    productname:"Butter milk",
    price:"Rs.550",
    quantity:"1L",
    offer:"30%"
},
{
    image:"https://www.bigbasket.com/media/uploads/p/xxl/40178540_1-amul-camel-milk.jpg",
    productname:"camel milk",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:"https://e7.pngegg.com/pngimages/522/131/png-clipart-malai-indian-cuisine-paratha-dal-kaju-katli-gulab-jamun-food-recipe.png",
    productname:"rasmalai",
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
        res.status(200).send(amulbrand);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Amul.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            amulbrand:result
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
            const menu = new Amul({
               amul:req.body.amul
            })
            menu.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Amul.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            amul:req.body.amul

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_amulbrand:result       
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
        Amul.deleteOne({_id:req.params.id},{
            $set:{
               
                amul:req.body.amul
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_amulbrand:result       
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
    
          Amul.deleteMany({},(err,result)=>{
            if(err) throw err
            res.send(amulbrand)
            })
        })

        export default router;
//         const port=5000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
// });