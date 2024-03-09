import BackButton from "@/components/back-button";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="grid h-dvh place-items-center relative">
      <div className="absolute top-8 left-8">
        <BackButton />
      </div>
      <SignUp />
    </main>
  );
}
