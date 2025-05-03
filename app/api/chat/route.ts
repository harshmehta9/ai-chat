import axios from "axios";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(req: Request, res: Response) {
    const { message } = await req.json();
    console.log(message);

    try {
        const responce = await axios.post("https://openrouter.ai/api/v1/chat/completions", 
            {
                model: 'meta-llama/llama-4-maverick:free',
                messages: message,
                temperature: 0.7, 
                max_tokens: 1000,
                
            },
            {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
                    'HTTP-Referer': 'http://localhost:3000', 
                },
            }
        )

        const reply = responce.data.choices[0].message.content;
        return NextResponse.json({reply});
    } catch (error) {
        console.error('Error:', error.response?.data || error);
        return NextResponse.json({message: "There is some error"}) 
    }
}

export async function GET() {
    return new Response(JSON.stringify({ message: "Only POST request is allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
    });
}