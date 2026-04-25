import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const readme = await prisma.readme.findUnique({
    where: { id, userId: session.user.id },
  });

  return NextResponse.json({ data: readme }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const readme = await prisma.readme.findUnique({ where: { id } });

  if (!readme || readme.userId !== session.user.id) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  await prisma.readme.delete({ where: { id } });

  return NextResponse.json(null, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  await prisma.readme.update({
    where: { id, userId: session.user.id },
    data: { ...data },
  });

  return NextResponse.json(null, { status: 200 });
}
