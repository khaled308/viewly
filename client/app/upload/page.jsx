import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";
import Upload from "@/components/Upload";

export default async function UploadPage() {
  const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
  };
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return <Upload />;
}
