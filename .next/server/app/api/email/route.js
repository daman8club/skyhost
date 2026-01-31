(()=>{var e={};e.id=433,e.ids=[433],e.modules={13878:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=13878,e.exports=t},30517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},41808:e=>{"use strict";e.exports=require("net")},77282:e=>{"use strict";e.exports=require("process")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},39512:e=>{"use strict";e.exports=require("timers")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},40177:(e,t,r)=>{"use strict";r.r(t),r.d(t,{headerHooks:()=>O,originalPathname:()=>T,patchFetch:()=>x,requestAsyncStorage:()=>d,routeModule:()=>l,serverHooks:()=>_,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>g});var s={};r.r(s),r.d(s,{GET:()=>u,POST:()=>p});var a=r(95419),i=r(69108),o=r(99678),n=r(78070),c=r(47033);async function u(){try{if(!c.db)return n.default.json({campaigns:[],stats:{}});let[e]=await c.db.execute(`
      SELECT 
        ec.campaign_id,
        ec.subject,
        ec.recipient_email,
        ec.sent_at,
        ec.status,
        COUNT(eo.id) as open_count,
        MAX(eo.opened_at) as last_opened
      FROM email_campaigns ec
      LEFT JOIN email_opens eo ON ec.campaign_id = eo.campaign_id
      GROUP BY ec.campaign_id
      ORDER BY ec.sent_at DESC
    `),[t]=await c.db.execute(`
      SELECT 
        COUNT(DISTINCT ec.campaign_id) as total_emails,
        COUNT(DISTINCT CASE WHEN eo.id IS NOT NULL THEN ec.campaign_id END) as opened_emails,
        COUNT(eo.id) as total_opens
      FROM email_campaigns ec
      LEFT JOIN email_opens eo ON ec.campaign_id = eo.campaign_id
    `);return n.default.json({campaigns:e,stats:t[0]||{total_emails:0,opened_emails:0,total_opens:0}})}catch(e){return n.default.json({campaigns:[],stats:{}})}}async function p(e){try{let{subject:t,recipient_email:r,campaign_id:s}=await e.json();if(!c.db)return n.default.json({error:"Database not available"},{status:500});return await c.db.execute("INSERT INTO email_campaigns (campaign_id, subject, recipient_email) VALUES (?, ?, ?)",[s,t,r]),n.default.json({success:!0,campaign_id:s})}catch(e){return n.default.json({error:"Failed to create campaign"},{status:500})}}let l=new a.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/email/route",pathname:"/api/email",filename:"route",bundlePath:"app/api/email/route"},resolvedPagePath:"E:\\skyhost\\app\\api\\email\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:m,serverHooks:_,headerHooks:O,staticGenerationBailout:g}=l,T="/api/email/route";function x(){return(0,o.patchFetch)({serverHooks:_,staticGenerationAsyncStorage:m})}},47033:(e,t,r)=>{"use strict";r.r(t),r.d(t,{db:()=>a});var s=r(63069);let a=null;try{let e=process.env.DB_HOST?.includes("tidbcloud.com"),t={host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"3306"),user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",database:process.env.DB_NAME||"agency",waitForConnections:!0,connectionLimit:10,queueLimit:0};e&&(t.ssl={rejectUnauthorized:!0}),a=s.createPool(t)}catch(e){a=null}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,206,69],()=>r(40177));module.exports=s})();