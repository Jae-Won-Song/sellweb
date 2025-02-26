import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';

export const authOptions = {
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30일
      },
    },
  },
  session: {
    strategy: 'jwt' as 'jwt' | 'database',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '이름', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const user = await User.findOne({ userId: credentials?.username });
          if (!user) {
            throw new Error('아이디 또는 비밀번호를 확인해주세요.');
          }

          const isValidPassword = await bcrypt.compare(
            credentials?.password || '',
            user.password
          );
          if (!isValidPassword) {
            throw new Error('아이디 또는 비밀번호를 확인해주세요.');
          }

          return {
            id: user._id.toString(),
            name: user.userName,
            email: user.email,
          };
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : String(error)
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: Record<string, unknown>;
      user?: { id: string; name: string; email: string };
      account?: { access_token?: string; provider?: string };
    }) {
      if (user) {
        token.userId = user.id;
        token.userName = user.name;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: {
        user: {
          userId: string;
          name: string;
          accessToken: string;
          provider: string;
        };
      };
      token: Record<string, unknown>;
    }) {
      if (token) {
        session.user.userId = token.userId as string;
        session.user.name = token.userName as string;
        session.user.accessToken = token.accessToken as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
