import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Post from '../../../../../models/Post';

export async function GET(
  _: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  await connectDB();
  const post = await Post.findById(params.id);
  if (!post) {
    return NextResponse.json({ message: '게시글 없음' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  await connectDB();
  const { reply } = await req.json();

  const updatedPost = await Post.findByIdAndUpdate(
    params.id,
    { reply },
    { new: true }
  );
  return NextResponse.json(updatedPost);
}
