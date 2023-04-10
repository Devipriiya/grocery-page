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
const householdsSchema=mongoose.Schema(
    {
        households:[{  
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

var Households = mongoose.model('households', householdsSchema);
householdsSchema.plugin(Households);
const households={
   households:[{
    image:{
        data:"Scrubs___Sponges-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Scrubs & Sponges",
    price:"Rs.192",
    quantity:"6",
    offer:"20%"
},
  {
    image:{
        data:"Household_Bucket_Mops-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Household Bucket Mops.",
    price:"Rs.645",
    quantity:"1",
    offer:"30%"
},
{
    image:{
        data:"Cleaning_Brushes.-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Cleaning Brushes",
    price:"Rs.240",
    quantity:"2",
    offer:"20%"
},
{
    image:{
        data:"brooms-removebg-preview.png",
contentType:"image/png"
    },
    productname:"Brooms stick",
    price:"Rs.189",
    quantity:"1",
    offer:"10%"
}

]}
// connectDB();
const app=express();
app.use(express.json());




router.get('/',(req,res) =>
{
    try{
        res.status(200).send(households);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Households.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            households:result
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
            const newImage = new Households({
               households:req.body.households
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Households.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            households:req.body.households

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_households:result       
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
       Households.deleteOne({_id:req.params.id},{
            $set:{
               
                households:req.body.households
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_households:result       
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
    
          Households.deleteMany({households},(err,result)=>{
            if(err) throw err
            res.send(households)
            })
        })

        export default router;
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(households);
        // });