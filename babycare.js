import express from "express";
import multer from "multer";
import mongoose from "mongoose";

const router =express.Router();

const babycareSchema=mongoose.Schema(
    {
        babycare:[{
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

var Babycare= mongoose.model('Babycare',babycareSchema);
babycareSchema.plugin(Babycare);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const babycare={
    babycare:[{
        image:{
            data:"baby_dove-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"dove soap",
        price:"Rs.170",
        quantity:"1",
        offer:"20%"
    },
      {
        image:{
            data:"johnsons_baby_powder-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"johnsons baby powder",
        price:"Rs.165",
        quantity:"1 ",
        offer:"15% "
    },
    {
        image:{
            data:"himalaya_baby_powder-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"himalaiya baby powder",
        price:"Rs.389",
        quantity:"1 ",
        offer:"25%"
    },
    {
        image:{
            data:"pampers-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"pampers",
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
        res.status(200).send(babycare);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Babycare.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            babycare:result
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
            const newImage = new Babycare({
                babycare:req.body.babycare
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Babycare.findOneAndUpdate({_id:req.params.id},{
        $set:{
            babycare:req.body.babycare
          

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_babycare:result       
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
        Babycare.deleteOne({_id:req.params.id},{
            $set:{
               
                babycare:req.body.babycare
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_babycare:result       
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
    
            Babycare.deleteMany({babycare},(err,result)=>{
            if(err) throw err
            res.send(babycare)
            })
        })
        export default router;
    
        // const port=3000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(babycare);
        // });