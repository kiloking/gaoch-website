import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// 作品詳細資料類型
interface WorkDetail {
  id: number;
  title: string;
  category: string;
  year: string;
  location: string;
  area: string;
  description: string;
  images: string[];
  nextWork?: {
    id: number;
    title: string;
    image: string;
  };
  prevWork?: {
    id: number;
    title: string;
    image: string;
  };
}

export default function WorkDetail() {
  const router = useRouter();
  const { id } = router.query;

  // 模擬作品詳細資料
  const workDetail: WorkDetail = {
    id: Number(id),
    title: "現代簡約住宅",
    category: "住宅設計",
    year: "2023",
    location: "台北市信義區",
    area: "180 坪",
    description:
      "這是一個強調現代簡約風格的住宅設計專案。運用大量的自然採光和開放空間，創造出舒適寬敞的生活環境。設計重點包括客製化的收納系統、整合式的照明設計，以及精心挑選的建材與家具...",
    images: [
      "/images/works/detail-1.jpg",
      "/images/works/detail-2.jpg",
      "/images/works/detail-3.jpg",
      "/images/works/detail-4.jpg",
    ],
    nextWork: {
      id: 2,
      title: "都會豪宅",
      image: "/images/works/work-2.jpg",
    },
    prevWork: {
      id: 3,
      title: "商業空間",
      image: "/images/works/work-3.jpg",
    },
  };

  return (
    <Layout>
      <div
        className=" min-h-screen  bg-cover bg-center bg-no-repeat  pt-[88px]"
        style={{
          backgroundImage: "url(https://web.forestdev.work/gaoch/s1-1_bg.png)",
        }}
      >
        <div className="container mx-auto px-4 ">
          {/* 返回按鈕 */}
          <Link
            href="/works"
            className="inline-flex items-center mb-8 text-gray-600 hover:text-black"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回作品列表
          </Link>

          {/* 作品標題資訊 */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{workDetail.title}</h1>
            <div className="flex gap-6 text-gray-600">
              <span>類別：{workDetail.category}</span>
              <span>年份：{workDetail.year}</span>
              <span>地點：{workDetail.location}</span>
              <span>面積：{workDetail.area}</span>
            </div>
          </div>

          {/* 主要圖片 */}
          <div className="relative aspect-video mb-12">
            <Image
              src={workDetail.images[0]}
              alt={workDetail.title}
              fill
              className="object-cover"
            />
          </div>

          {/* 專案說明 */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-bold mb-4">專案說明</h2>
            <p className="text-gray-600 leading-relaxed">
              {workDetail.description}
            </p>
          </div>

          {/* 其他圖片網格 */}
          <div className="grid grid-cols-2 gap-8 mb-16">
            {workDetail.images.slice(1).map((image, index) => (
              <div key={index} className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={`${workDetail.title} ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* 上一個/下一個作品 */}
          <div className="grid grid-cols-2 gap-8">
            {workDetail.prevWork && (
              <Link href={`/works/${workDetail.prevWork.id}`} className="group">
                <div className="relative aspect-[3/2] mb-4">
                  <Image
                    src={workDetail.prevWork.image}
                    alt={workDetail.prevWork.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                </div>
                <div className="text-sm text-gray-500 mb-2">上一個作品</div>
                <div className="font-bold">{workDetail.prevWork.title}</div>
              </Link>
            )}
            {workDetail.nextWork && (
              <Link
                href={`/works/${workDetail.nextWork.id}`}
                className="group text-right"
              >
                <div className="relative aspect-[3/2] mb-4">
                  <Image
                    src={workDetail.nextWork.image}
                    alt={workDetail.nextWork.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                </div>
                <div className="text-sm text-gray-500 mb-2">下一個作品</div>
                <div className="font-bold">{workDetail.nextWork.title}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
