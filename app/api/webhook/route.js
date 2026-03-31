import { NextResponse } from 'next/server';

// 1. GET: यह Meta (Facebook) को आपका Webhook वेरीफाई करने में मदद करेगा
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    // यहाँ अपना Secret Token लिखें जो आप Meta Dashboard में डालेंगे
    const VERIFY_TOKEN = "SKYHOST_SECRET_TOKEN"; 

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log("Skyhost Webhook Verified Successfully!");
        // Meta को 'challenge' वैल्यू वापस भेजना ज़रूरी है
        return new NextResponse(challenge, { status: 200 });
    }

    // अगर टोकन मैच नहीं होता या कोई और एरर है
    return new NextResponse('Verification Failed', { status: 403 });
}

// 2. POST: जब भी WhatsApp पर मैसेज आएगा, Meta इस फंक्शन को हिट करेगा
export async function POST(request) {
    try {
        const body = await request.json();

        // चेक करें कि डेटा WhatsApp Business Account से आ रहा है
        if (body.object === 'whatsapp_business_account') {
            
            // चेक करें कि क्या इसमें मैसेज डेटा मौजूद है
            if (body.entry?.[0]?.changes?.[0]?.value?.messages) {
                const message = body.entry[0].changes[0].value.messages[0];
                const from = message.from; // कस्टमर का फोन नंबर
                const text = message.text?.body || "Media or Non-text message received";

                console.log(`-----------------------------------`);
                console.log(`Skyhost New Message Log:`);
                console.log(`From: ${from}`);
                console.log(`Message: ${text}`);
                console.log(`-----------------------------------`);
                
                // यहाँ आप अपना Logic जोड़ सकते हैं (जैसे Database में सेव करना)
            }
            
            // Meta को 200 OK भेजना ज़रूरी है वरना वो बार-बार सेम मैसेज भेजता रहेगा
            return NextResponse.json({ status: 'success' }, { status: 200 });
        }

        return NextResponse.json({ error: 'Not a WhatsApp Event' }, { status: 404 });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
