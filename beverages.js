import express from "express";
import multer from "multer";
import mongoose from "mongoose";

const router =express.Router();

const beverageSchema=mongoose.Schema(
    {
    beverages:[{
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
           }]          })

var Beverage= mongoose.model('Beverage', beverageSchema);
beverageSchema.plugin(Beverage);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const beverage={
    beverages:[{
        image:{
            data:"7up-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"7up",
        price:"Rs.100",
        quantity:"2L",
        offer:"20%"
    },
      {
        image:{
            data:"sprite-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"Sprite",
        price:"Rs.50",
        quantity:"1 L",
        offer:"5% "
    },
    {
        image:{
            data:"cocacola-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"Cocacola",
        price:"Rs.50",
        quantity:"1 L",
        offer:"5%"
    },
    {
        image:{
            data:"bovonto-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"Bovonto",
        price:"Rs.80",
        quantity:"1.5L",
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
        res.status(200).send(beverage);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Beverage.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            beverages:result
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
            const newImage = new Beverage({
                beverages:req.body.beverages
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
  Beverage.findOneAndUpdate({_id:req.params.id},{
        $set:{
            beverages:req.body.beverages
          

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_beverages:result       
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
        Beverage.deleteOne({_id:req.params.id},{
            $set:{
               
                beverages:req.body.beverages
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_beverages:result       
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
    
           Beverage.deleteMany({beverage},(err,result)=>{
            if(err) throw err
            res.send(beverage)
            })
        })
        export default router;
    
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(beverage);
        // });