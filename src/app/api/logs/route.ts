import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const logs = await request.json();
    
    // Basic validation
    if (!Array.isArray(logs)) {
      return NextResponse.json({ message: 'Invalid data format, expected an array.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public/data/transmission-log.json');
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), 'utf-8');
      return NextResponse.json({ success: true, message: 'Logs saved successfully to the local filesystem.' });
    } catch (fsError: any) {
      console.warn('Writing to local filesystem failed (expected on serverless platforms):', fsError.message);
      return NextResponse.json({ 
        success: false, 
        message: 'Writing directly to the server filesystem is not supported on this platform. Please download the configuration file and commit it to your repository.', 
        isServerless: true 
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server error occurred.' }, { status: 500 });
  }
}
