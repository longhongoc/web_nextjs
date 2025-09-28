import postgres from 'postgres';
import { NextResponse } from 'next/server';
import { registerSchema } from '@/app/lib/actions';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const data = await sql`
        SELECT * FROM registration_infor
        `;
    return NextResponse.json(data);
  } catch {
    console.error(' Fetching data failed');
    return NextResponse.json(
      { error: 'Fetching data failed' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error }, { status: 400 });
    }

    const { fullName, email, password, age, gender, terms } = parsed.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO registration_infor (full_name, email, password, age, gender, terms)
      VALUES (${fullName}, ${email}, ${hashedPassword}, ${age}, ${gender}, ${terms})`;

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: `Failed to register user. ${err}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    // Xoá user theo id
    await sql`DELETE FROM registration_infor WHERE id = ${userId}`;

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
