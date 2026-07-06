import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    
    if (!type || !data || !Array.isArray(data)) {
      return NextResponse.json({ message: 'Invalid payload parameters.' }, { status: 400 });
    }

    let fileName = "";
    if (type === "logs") {
      fileName = "transmission-log.json";
    } else if (type === "games") {
      fileName = "games.json";
    } else if (type === "team") {
      fileName = "team.json";
    } else {
      return NextResponse.json({ message: 'Invalid type parameter specified.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public/data', fileName);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return NextResponse.json({ success: true, message: `${type} config saved successfully.` });
    } catch (fsError: any) {
      console.warn('Writing to local filesystem failed:', fsError.message);
      return NextResponse.json({ 
        success: false, 
        message: 'Direct writing to the server filesystem is not supported on this platform. Use the download tool to update.', 
        isServerless: true 
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server error occurred.' }, { status: 500 });
  }
}
