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
    } else if (type === "services") {
      fileName = "services.json";
    } else {
      return NextResponse.json({ message: 'Invalid type parameter specified.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public/data', fileName);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return NextResponse.json({ success: true, message: `${type} config saved successfully.` });
    } catch (fsError: any) {
      console.warn('Writing to local filesystem failed:', fsError.message);

      // Check if GitHub Integration credentials exist
      const githubToken = process.env.GITHUB_TOKEN;
      const githubOwner = process.env.GITHUB_OWNER;
      const githubRepo = process.env.GITHUB_REPO;

      if (githubToken && githubOwner && githubRepo) {
        try {
          const targetPath = `public/data/${fileName}`;
          const getUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${targetPath}`;
          
          // 1. Fetch existing file to extract SHA
          const getRes = await fetch(getUrl, {
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Abyss-CMS'
            }
          });
          
          let sha = "";
          if (getRes.ok) {
            const fileData = await getRes.json();
            sha = fileData.sha;
          }
          
          // 2. Commit the base64-encoded JSON update
          const fileContent = JSON.stringify(data, null, 2);
          const base64Content = Buffer.from(fileContent).toString('base64');
          
          const putRes = await fetch(getUrl, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
              'User-Agent': 'Abyss-CMS'
            },
            body: JSON.stringify({
              message: `cms: update ${fileName} database`,
              content: base64Content,
              sha: sha || undefined
            })
          });
          
          if (putRes.ok) {
            return NextResponse.json({ 
              success: true, 
              isGitHubSaved: true,
              message: `GitHub repository updated successfully. Vercel rebuild triggered.` 
            });
          } else {
            const errData = await putRes.json();
            throw new Error(errData.message || "Failed to write commit to GitHub");
          }
        } catch (ghError: any) {
          console.error('GitHub API update failed:', ghError.message);
          return NextResponse.json({ 
            success: false, 
            message: `GitHub Sync Failure: ${ghError.message}. Falling back to manual download.`, 
            isServerless: true 
          });
        }
      }

      // No credentials -> Fall back to manual JSON file download trigger
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
