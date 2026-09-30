import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(_request: NextRequest) {
  void _request;
  return NextResponse.json(
    {
      status: 'ok',
      service: 'llakaservices',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}
