"use client"
import Landing from "@/components/Landing";
import LoginModal from "@/components/LoginModal";
import { useLoginModalState } from "@/store/store";


export default function Home() {

  const isOpen = useLoginModalState((state) => state.isOpen)
  console.log(isOpen)
  return (
    <main className="min-h-screen w-full">
      <Landing/>   
      {
        isOpen && <LoginModal/>
      }
    </main>
  );
}
