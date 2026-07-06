import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();
    const secretKey = process.env.ADMIN_KEY || "abyss";
    
    if (passcode === secretKey) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Invalid decryption passcode." }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Server authentication error.' }, { status: 500 });
  }
}
