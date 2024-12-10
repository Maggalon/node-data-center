import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://72.5.42.40:3107/map-data');
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch map data' }, 
      { status: 500 }
    );
  }
}