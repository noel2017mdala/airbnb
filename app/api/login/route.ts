export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
}
