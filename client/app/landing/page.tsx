'use client'
import { AppSidebar } from "@/components/app-sidebar";
import { HomePageSelector } from "@/components/home-page-selector";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { setChatMode } from "@/lib/redux/slices/chatModeSlice";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";

export interface homePageDataInterface {
  optionName: string;
  optionDesc: string;
  onClick: () => void
}

export default function Landing() {
  const router = useRouter();
  const dispatch = useDispatch();
  const onChatClick = () => {
     dispatch(setChatMode("normal"))
     console.log("stored the redux state")
     router.push('/chat')
  }
  const onAiClick = () => {
    dispatch(setChatMode("ai"))
     console.log("stored the redux state")
    router.push('/ai')
  }
  const homePageData: homePageDataInterface[] = [
    {
      optionName: `Messaging/Video Page With Anonmys people`,
      optionDesc: `Engage in conversations and video calls with people from all over the world without revealing your identity. It's a great way to meet new friends and share stories in a safe, private space.`,
      onClick: onChatClick
    },
    {
      optionName: `Chat with AI personalities`,
      optionDesc: `Explore a new kind of conversation with a diverse cast of AI characters. Whether you want to roleplay, learn something new, or just chat, there's an AI waiting to connect with you.`,
      onClick: onAiClick
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />

          {/* Wrapper that centers content only on desktop */}
          <div className="flex flex-col items-center md:justify-center md:min-h-screen">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-6 lg:mb-25">
              Chattable
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              {homePageData.map((data, index) => (
                <HomePageSelector
                  optionName={data.optionName}
                  optionDesc={data.optionDesc}
                  key={index}
                  onClick={data.onClick}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
