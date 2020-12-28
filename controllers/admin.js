import Restaurants from '../models/restaurants';
import Pharmacies from '../models/pharmacies';
import Groceries from '../models/groceries';
import e from 'express';

exports.addProduct = async (req, res, next)=>{
id = req.body.id;
type = req.body.type;
Name= req.body.name;
description = req.body.description;
location = req.body.location;
imageUrl = req.body.imageUrl;
address = req.body.address;
openingHours = req.body.openingHours;
menuId = req.body.menuId;
rate = req.body.rate;
const Error;
let place;

if(type=== 'restaurants'){
place = new Restaurants();
}
if(type=== 'pharmacies'){
place = new Pharmacies();
}
if(type === 'groceries'){
place = new Groceries();
}else{
    Error = 'not valid type ';
}
place({
    name:Name,
    type:type,
    description:description,
    location:location,
    imageUrl:imageUrl,
    address:address,
    openingHours:openingHours,
    menuId:menuId,
    rate:rate
});
await place.save();
res.status(200).json({ message:  type+'created' , placeId: place._id });


};

exports.getProducts =async(req, res, next)=>{
    id = req.body.id;
    type = req.body.type;
    Name= req.body.name;
 const Error;
 let place;
if(type=== 'restaurants'){
    place = new Restaurants();
    }
    if(type=== 'pharmacies'){
    place = new Pharmacies();
    }
    if(type === 'groceries'){
    place = new Groceries();
    }else{
        Error = 'not valid type ';
    }      

   const places = await place.find();
res.status(200).json({ message:  'data fetched' , places: places });
   
}