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
const nestleSchema=mongoose.Schema({
  nestle:[ {
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

var Nestle = mongoose.model('Nestle', nestleSchema);
nestleSchema.plugin(Nestle);
const nestlebrand={
  nestle:[ {
    image:{
        data:"https://w7.pngwing.com/pngs/787/1007/png-transparent-instant-noodle-indian-cuisine-maggi-noodles-masala-chai-food-recipe-cooking.png",
        contentType:"image/png"
    },
    productname:"Maggie",
    price:"Rs.550",
    quantity:"2L",
    offer:"30%"
},
  {
    image:{
        data:"https://www.pngfind.com/pngs/m/21-215791_9-oz-bottle-of-nestle-pure-life-purified.png",
contentType:"image/png"
    },
    productname:"Pure Life",
    price:"Rs.550",
    quantity:"1L",
    offer:"30%"
},
{
    image:{
        data:"https://e7.pngegg.com/pngimages/648/793/png-clipart-instant-coffee-tea-espresso-latte-coffee-nescafe-jar-food-coffee.png",
        contentType:"image/png"
    },
    productname:"Nescafe",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:{
        data:"https://e7.pngegg.com/pngimages/187/627/png-clipart-chocolate-bar-kit-kat-smarties-white-chocolate-bounty-kit-kat-food-wafer.png",
contentType:"image/png"
    },
    productname:"Kitkat",
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
        res.status(200).send(nestlebrand);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Nestle.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            nestlebrand:result
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
            const newNestle = new Nestle({
               nestle:req.body.amul
            })
            newNestle.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    nestlebrand.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            nestle:req.body.amul

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_nestlebrand:result       
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
        nestlebrand.deleteOne({_id:req.params.id},{
            $set:{
               
                nestle:req.body.amul
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_nestlebrand:result       
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
    
          nestlebrand.deleteMany({nestlebrand},(err,result)=>{
            if(err) throw err
            res.send(nestlebrand)
            })
        })

        export default router;
//         const port=5000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
// });