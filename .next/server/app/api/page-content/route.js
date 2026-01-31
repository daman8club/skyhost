"use strict";(()=>{var e={};e.id=860,e.ids=[860],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},71017:e=>{e.exports=require("path")},50253:(e,t,s)=>{s.r(t),s.d(t,{headerHooks:()=>h,originalPathname:()=>f,patchFetch:()=>y,requestAsyncStorage:()=>v,routeModule:()=>x,serverHooks:()=>m,staticGenerationAsyncStorage:()=>g,staticGenerationBailout:()=>b});var i={};s.r(i),s.d(i,{GET:()=>u});var a=s(95419),n=s(69108),r=s(99678),o=s(78070);let l=require("fs");var c=s.n(l),d=s(71017),p=s.n(d);async function u(e){try{let{searchParams:t}=new URL(e.url),s=t.get("url");if(!s)return o.default.json({error:"Page URL required"},{status:400});let i={"/":"app/page.tsx","/contact":"app/contact/page.tsx","/services/web-development":"app/services/web-development/page.tsx","/services/mobile-apps":"app/services/mobile-apps/page.tsx","/services/seo-marketing":"app/services/seo-marketing/page.tsx","/services/ui-ux-design":"app/services/ui-ux-design/page.tsx","/services/ai-integration":"app/services/ai-integration/page.tsx","/services/cloud-solutions":"app/services/cloud-solutions/page.tsx","/company/about":"app/company/about/page.tsx"}[s];if(!i)return o.default.json({error:"Page not found"},{status:404});let a=p().join(process.cwd(),i);if(!c().existsSync(a))return o.default.json({error:"File not found"},{status:404});let n=c().readFileSync(a,"utf-8"),r=n.match(/<title>(.*?)<\/title>/i)||n.match(/title:\s*['"`](.*?)['"`]/i)||n.match(/<h1[^>]*>(.*?)<\/h1>/i),l=r?r[1]:({"/":"Skyhost Digital - Home","/contact":"Contact Us - Skyhost Digital","/services/web-development":"Web Development Services","/services/mobile-apps":"Mobile App Development","/services/seo-marketing":"SEO & Marketing Services","/services/ui-ux-design":"UI/UX Design Services","/services/ai-integration":"AI Integration Services","/services/cloud-solutions":"Cloud Solutions","/company/about":"About Us - Skyhost Digital"})[s]||"Page Title",d=n.match(/description:\s*['"`](.*?)['"`]/i)||n.match(/<meta[^>]*name=['"`]description['"`][^>]*content=['"`](.*?)['"`]/i),u=d?d[1]:"Professional web development and digital services by Skyhost Digital.";return o.default.json({title:l,content:function(e){if(e.includes("Building the Future of"))return`<div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
  <section class="min-h-screen flex items-center justify-center px-6">
    <div class="max-w-7xl mx-auto">
      <div class="glass-card p-8 md:p-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="text-left space-y-8">
            <div class="inline-flex items-center px-4 py-2 glass rounded-full text-sm font-medium text-cyan-400 border border-cyan-400/30">
              <span>Next-Gen Digital Solutions</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span class="block text-white">Building the Future of</span>
              <span class="block gradient-text">Digital Experiences.</span>
            </h1>
            
            <p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Revolutionary web experiences that push boundaries and deliver exceptional results for forward-thinking businesses worldwide.
            </p>
            
            <div class="flex flex-wrap gap-8 py-6">
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-black text-white mb-1">500+</div>
                <div class="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-black text-white mb-1">99.9%</div>
                <div class="text-sm text-gray-400">Uptime</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-black text-white mb-1">340%</div>
                <div class="text-sm text-gray-400">Avg Growth</div>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button class="btn-neon-primary">Start Your Project</button>
              <button class="btn-neon-secondary">Get Quote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`;let t=e.match(/<div[^>]*className[^>]*>([\s\S]*?)<\/div>/m);return t?t[0].replace(/className=/g,"class=").replace(/onClick={[^}]*}/g,"").replace(/{[^}]*}/g,"").replace(/\s+/g," ").trim():`<div class="container mx-auto px-6 py-20">
  <h1 class="text-4xl font-bold text-white mb-6">Page Content</h1>
  <p class="text-gray-300 text-lg mb-8">Edit this content in the admin panel.</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="glass-card p-6">
      <h2 class="text-2xl font-bold text-white mb-4">Section 1</h2>
      <p class="text-gray-300">Your content here...</p>
    </div>
    
    <div class="glass-card p-6">
      <h2 class="text-2xl font-bold text-white mb-4">Section 2</h2>
      <p class="text-gray-300">Your content here...</p>
    </div>
  </div>
</div>`}(n),meta_description:u,raw_content:n})}catch(e){return o.default.json({error:"Failed to fetch content"},{status:500})}}let x=new a.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/page-content/route",pathname:"/api/page-content",filename:"route",bundlePath:"app/api/page-content/route"},resolvedPagePath:"E:\\skyhost\\app\\api\\page-content\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:v,staticGenerationAsyncStorage:g,serverHooks:m,headerHooks:h,staticGenerationBailout:b}=x,f="/api/page-content/route";function y(){return(0,r.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:g})}}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),i=t.X(0,[638,206],()=>s(50253));module.exports=i})();