import express from 'express';
import Stripe from 'stripe';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const root=path.resolve(__dirname,'..');
const app=express();
const port=Number(process.env.PORT||8080);
const appUrl=process.env.APP_URL||`http://localhost:${port}`;

const priceMap={
  solo:process.env.STRIPE_PRICE_SOLO,
  growth:process.env.STRIPE_PRICE_GROWTH,
  pro:process.env.STRIPE_PRICE_PRO,
  agency:process.env.STRIPE_PRICE_AGENCY,
  credits_500:process.env.STRIPE_PRICE_CREDITS_500,
  credits_2000:process.env.STRIPE_PRICE_CREDITS_2000,
  credits_5000:process.env.STRIPE_PRICE_CREDITS_5000
};

app.use(express.json({limit:'1mb'}));

app.post('/api/checkout',async(req,res)=>{
  const plan=String(req.body?.plan||'');
  const price=priceMap[plan];
  if(!process.env.STRIPE_SECRET_KEY || !price){
    return res.status(503).json({error:'Stripe is not configured. Add STRIPE_SECRET_KEY and the selected price ID.'});
  }
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
  const mode=plan.startsWith('credits_')?'payment':'subscription';
  const session=await stripe.checkout.sessions.create({
    mode,
    line_items:[{price,quantity:1}],
    success_url:`${appUrl}/index.html?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`${appUrl}/index.html?checkout=cancelled`,
    allow_promotion_codes:true,
    billing_address_collection:'auto'
  });
  res.json({url:session.url});
});

app.post('/api/support',(req,res)=>{
  const {email,topic,message}=req.body||{};
  if(!email || !message) return res.status(400).json({error:'email and message required'});
  const ticket=`PRO-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
  // Production: persist to DB and deliver through your helpdesk/email provider.
  console.log(JSON.stringify({ticket,email,topic,message,createdAt:new Date().toISOString()}));
  res.json({ok:true,ticket});
});

app.get('/api/health',(_req,res)=>res.json({ok:true,service:'prospecta'}));
app.use(express.static(root,{extensions:['html']}));
app.listen(port,()=>console.log(`Prospecta running at ${appUrl}`));
