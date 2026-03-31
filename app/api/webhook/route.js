import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    const VERIFY_TOKEN = "SKYHOST_SECRET_TOKEN"; // इसे आप Meta Dashboard में भी इस्तेमाल करेंगे

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        return new NextResponse(challenge, { status: 200 });
    }
    return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("Skyhost Received Webhook:", JSON.stringify(body, null, 2));
        
        // यहाँ से आप मैसेज को डेटाबेस (जैसे 'leads' फोल्डर में जो लॉजिक है) में भेज सकते हैं
        
        return NextResponse.json({ status: 'ok' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
