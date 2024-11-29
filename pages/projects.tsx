import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  location: string;
  status: "熱銷中" | "即將完工" | "即將開案";
  logoimg: string;
  image: string;
  price: string;
  area: string;
  link: string;
  details: {
    基地位置: string;
    基地面積: string;
    規劃坪數: string;
    規劃樓層: string;
    規劃戶車: string;
    建築設計: string;
    施工營造: string;
  };
}

export default function Projects() {
  // 專案資料
  const projects: Project[] = [
    {
      id: 1,
      title: "(暫)高誠君閱",
      location: "桃園市大園區",
      status: "熱銷中",
      logoimg: "p01_logo.png",
      image: "p01_p01.png",
      price: "12,000萬起",
      area: "32-48坪",
      link: "https://market.591.com.tw/5868761",
      details: {
        基地位置: "桃園市大園區科一街、科三街",
        基地面積: "953.67坪",
        規劃坪數: "31-47坪",
        規劃樓層: "11F+B2F",
        規劃戶車: "84戶+84車",
        建築設計: "康文在建築師事務所",
        施工營造: "高華營造有限公司",
      },
    },
    {
      id: 2,
      title: "(暫)都心/雅苑",
      location: "台北市大安區",
      status: "即將完工",
      logoimg: "p01_logo.png",
      image: "p01_p01.png",
      price: "16,000萬起",
      area: "42-56坪",
      link: "https://market.591.com.tw/5868761",
      details: {
        基地位置: "台北市大安區",
        基地面積: "未知",
        規劃坪數: "未知",
        規劃樓層: "未知",
        規劃戶車: "未知",
        建築設計: "未知",
        施工營造: "未知",
      },
    },
    {
      id: 3,
      title: "(暫)河岸/風華",
      location: "新北市板橋區",
      status: "即將開案",
      logoimg: "p02_logo.png",
      image: "p01_p01.png",
      price: "8,800萬起",
      area: "28-42坪",
      link: "https://market.591.com.tw/5868761",
      details: {
        基地位置: "新北市板橋區",
        基地面積: "未知",
        規劃坪數: "未知",
        規劃樓層: "未知",
        規劃戶車: "未知",
        建築設計: "未知",
        施工營造: "未知",
      },
    },
    // 可以添加更多專案...
  ];

  return (
    <Layout>
      <div
        className=" min-h-screen  bg-cover bg-center bg-no-repeat  pt-[0px]"
        style={{
          backgroundImage: "url(https://web.forestdev.work/gaoch/s1-1_bg.png)",
        }}
      >
        <div
          className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
          style={{
            backgroundImage: "url(https://web.forestdev.work/gaoch/bg08.jpg)",
          }}
        >
          {/* black 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
          <div className="text-white/80 text-3xl font-bold z-20 absolute bottom-10 left-10">
            新案鑑賞 / Project
          </div>
        </div>
        <div className="container mx-auto px-4 mt-[5%]">
          {/* 頁面標題 */}

          {/* 專案狀態篩選 */}
          <div className="flex gap-6 mb-12">
            <button className="px-6 py-2 bg-black text-white rounded-full">
              全部案件
            </button>
            <button className="px-6 py-2 hover:bg-gray-100 rounded-full">
              熱銷中
            </button>
            <button className="px-6 py-2 hover:bg-gray-100 rounded-full">
              即將完工
            </button>
            <button className="px-6 py-2 hover:bg-gray-100 rounded-full">
              即將開案
            </button>
          </div>

          {/* 專案列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-14">
            {projects.map((project) => (
              <Link
                href={project.link}
                key={project.id}
                className="group"
                target="_blank"
              >
                <div className="bg-white/0 rounded-lg flex items-start justify-between w-full gap-8">
                  {/* 專案圖片 */}
                  <div
                    className="relative w-1/2"
                    style={{ aspectRatio: "15/19" }}
                  >
                    <div className="relative w-full h-full  rounded-lg overflow-hidden">
                      <Image
                        src={`https://web.forestdev.work/gaoch/projects/${project.image}`}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 "
                      />
                    </div>
                    {/* link icon top right */}
                    <div className="absolute top-3 right-3">
                      <FaExternalLinkAlt className="text-white/80 text-base" />
                    </div>
                  </div>

                  {/* 專案資訊 */}
                  <div className="p-2 w-2/3">
                    {/* 狀態標籤 */}
                    <div className="mb-2">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm
                          ${project.status === "熱銷中" ? "bg-red-500" : ""}
                          ${project.status === "即將完工" ? "bg-green-500" : ""}
                          ${project.status === "即將開案" ? "bg-blue-500" : ""}
                          text-white
                        `}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="space-y-2 text-gray-600">
                      {/* detail */}
                      {Object.entries(project.details).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <span className="font-bold">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
