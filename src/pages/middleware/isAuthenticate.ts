import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useCookies } from 'react-cookie';
 
function Authenticated(request: NextRequest) {
  const cookies = request.cookies;
  console.log(cookies);
  return cookies;
}
 export default Authenticated;