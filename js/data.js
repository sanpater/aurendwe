const DEMO_USERS=[
{id:"U001",name:"Ravi Kumar",phone:"9000000001",role:"farmer",village:"Rampur",district:"East Champaran",state:"Bihar"},
{id:"U002",name:"Suresh Yadav",phone:"9000000002",role:"owner",village:"Motihari",district:"East Champaran",state:"Bihar"},
{id:"U003",name:"Krishi Seva FPO",phone:"9000000003",role:"institution",village:"Patna",district:"Patna",state:"Bihar"},
{id:"U004",name:"Admin Demo",phone:"9000000004",role:"admin",village:"Patna",district:"Patna",state:"Bihar"},
{id:"U005",name:"Rahul Kumar",phone:"9000000011",role:"farmer",village:"Vaishali",district:"Vaishali",state:"Bihar"},
{id:"U006",name:"Amit Singh",phone:"9000000012",role:"owner",village:"Nalanda",district:"Nalanda",state:"Bihar"}
];
const LOCATIONS={Motihari:[26.6486,84.9166],Patna:[25.5941,85.1376],Nalanda:[25.1357,85.4436],Muzaffarpur:[26.1209,85.3647],Gaya:[24.7914,85.0002],Vaishali:[25.6838,85.3547],Rampur:[26.66,84.92]};
const CATEGORIES=["Tractor","Rotavator","Power Tiller","Seed Drill","Thresher","Harvester","Sprayer","Water Pump","Cultivator","Trailer","Other"];
const NAMES=["Mahindra Tractor 575 DI","Swaraj Tractor 744 FE","John Deere 5310","Mahindra Rotavator","Shaktiman Rotavator","VST Power Tiller","Kartar Seed Drill","Swaraj Thresher","Kartar Harvester","Kisan Sprayer","Honda Water Pump","Fieldking Cultivator","Mahindra Trailer","Sonalika Tractor","Kubota Harvester","Captain Power Tiller","Beri Seed Drill","Kisan Thresher","Jai Kisan Sprayer","Swaraj Cultivator"];
const OWNER_IDS=["U002","U006"];
const locations=Object.keys(LOCATIONS);
const DEMO_EQUIPMENT=NAMES.map((name,i)=>{let loc=locations[i%locations.length],cat=CATEGORIES[i%CATEGORIES.length];return{
id:"E"+String(i+1).padStart(3,"0"),name,category:cat,ownerId:OWNER_IDS[i%2],owner:i%2?"Amit Singh":"Suresh Yadav",location:loc,district:loc==="Motihari"||loc==="Rampur"?"East Champaran":loc,priceHourly:700+(i%7)*100,priceDaily:5000+(i%6)*500,rating:Number((4.2+(i%7)*.1).toFixed(1)),reviews:8+i*3,verified:i%4!==0,operator:i%3!==0,delivery:i%4!==0,available:i%5!==0,condition:i%3===0?"Excellent":"Good",year:2020+(i%6),brand:name.split(" ")[0],model:"MVP-"+(100+i),description:"Well-maintained demo equipment available for nearby farm work.",lat:LOCATIONS[loc][0]+((i%3)-1)*.006,lng:LOCATIONS[loc][1]+((i%4)-2)*.006
}});
const DEMO_BOOKINGS=Array.from({length:10},(_,i)=>({id:"KS-2026-"+String(i+1).padStart(4,"0"),equipmentId:"E"+String((i%8)+1).padStart(3,"0"),farmerId:i%2?"U005":"U001",ownerId:i%2?"U006":"U002",date:"2026-08-"+String(18+(i%7)).padStart(2,"0"),time:"10:00",duration:2+(i%3),service:i%3===0?"operator":"equipment",equipmentCost:1800+i*120,operatorCost:i%3===0?500:0,deliveryCost:0,serviceFee:100,total:1900+i*120,status:["completed","confirmed","requested","on_the_way","started"][i%5],payment:"Demo Payment",createdAt:Date.now()-i*86400000}));
const DEMO_REVIEWS=[1,2,3,4,5].map((i)=>({id:"R00"+i,equipmentId:"E00"+i,farmerId:"U001",rating:4+(i%2),text:"Good machine and timely service.",createdAt:"2026-08-"+(10+i)}));
const DEMO_COMPLAINTS=[];
window.KS_DATA={users:DEMO_USERS,equipment:DEMO_EQUIPMENT,bookings:DEMO_BOOKINGS,reviews:DEMO_REVIEWS,complaints:DEMO_COMPLAINTS,locations:LOCATIONS,categories:CATEGORIES};