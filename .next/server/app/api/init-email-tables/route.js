(()=>{var e={};e.id=711,e.ids=[711],e.modules={13878:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=13878,e.exports=t},30517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},41808:e=>{"use strict";e.exports=require("net")},77282:e=>{"use strict";e.exports=require("process")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},39512:e=>{"use strict";e.exports=require("timers")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},24758:(e,t,r)=>{"use strict";r.r(t),r.d(t,{headerHooks:()=>l,originalPathname:()=>N,patchFetch:()=>_,requestAsyncStorage:()=>d,routeModule:()=>E,serverHooks:()=>p,staticGenerationAsyncStorage:()=>A,staticGenerationBailout:()=>R});var s={};r.r(s),r.d(s,{GET:()=>u,POST:()=>c});var i=r(95419),a=r(69108),n=r(99678),o=r(78070),T=r(47033);async function u(){return o.default.json({message:"Use POST to create tables"})}async function c(){try{if(!T.db)return o.default.json({error:"Database not available"},{status:500});return await T.db.execute(`
      CREATE TABLE IF NOT EXISTS email_campaigns (
        id INT AUTO_INCREMENT PRIMARY KEY,
        campaign_id VARCHAR(255) UNIQUE NOT NULL,
        subject VARCHAR(500) NOT NULL,
        recipient_email VARCHAR(255) NOT NULL,
        sender_email VARCHAR(255) DEFAULT 'mail@skyhost.agency',
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('sent', 'delivered', 'opened', 'clicked') DEFAULT 'sent',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `),await T.db.execute(`
      CREATE TABLE IF NOT EXISTS email_opens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        campaign_id VARCHAR(255) NOT NULL,
        opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        INDEX idx_campaign_id (campaign_id)
      )
    `),await T.db.execute(`
      CREATE TABLE IF NOT EXISTS email_clicks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        campaign_id VARCHAR(255) NOT NULL,
        clicked_url VARCHAR(1000) NOT NULL,
        clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        INDEX idx_campaign_id (campaign_id)
      )
    `),await T.db.execute(`
      CREATE TABLE IF NOT EXISTS page_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_url VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        content LONGTEXT,
        meta_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `),o.default.json({success:!0,message:"Email tracking tables created"})}catch(e){return o.default.json({error:e instanceof Error?e.message:"Unknown error"},{status:500})}}let E=new i.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/init-email-tables/route",pathname:"/api/init-email-tables",filename:"route",bundlePath:"app/api/init-email-tables/route"},resolvedPagePath:"E:\\skyhost\\app\\api\\init-email-tables\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:A,serverHooks:p,headerHooks:l,staticGenerationBailout:R}=E,N="/api/init-email-tables/route";function _(){return(0,n.patchFetch)({serverHooks:p,staticGenerationAsyncStorage:A})}},47033:(e,t,r)=>{"use strict";r.r(t),r.d(t,{db:()=>i});var s=r(63069);let i=null;try{let e=process.env.DB_HOST?.includes("tidbcloud.com"),t={host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"3306"),user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",database:process.env.DB_NAME||"agency",waitForConnections:!0,connectionLimit:10,queueLimit:0};e&&(t.ssl={rejectUnauthorized:!0}),i=s.createPool(t)}catch(e){i=null}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,206,69],()=>r(24758));module.exports=s})();