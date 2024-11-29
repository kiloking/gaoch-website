import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { WORKS } from "@/constants/works";
import { motion } from "framer-motion";

export default function WorkDetail() {
  const router = useRouter();
  const { id } = router.query;

  // 找到當前作品
  const currentWork = WORKS.find((work) => work.id === Number(id));

  // 找到前一個和下一個作品
  const currentIndex = WORKS.findIndex((work) => work.id === Number(id));
  const prevWork = currentIndex > 0 ? WORKS[currentIndex - 1] : null;
  const nextWork =
    currentIndex < WORKS.length - 1 ? WORKS[currentIndex + 1] : null;

  if (!currentWork) return null;

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat pt-[0px]"
        style={{
          backgroundImage: "url(https://web.forestdev.work/gaoch/s1-1_bg.png)",
        }}
      >
        <div className="flex justify-center items-center w-full bg-zinc-100 aspect-[15/8] bg-cover bg-center bg-no-repeat relative -z-0">
          <motion.div
            key={currentWork.bgimg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={`https://web.forestdev.work/gaoch/works/${currentWork.bgimg}`}
              alt={currentWork.title}
              fill
              className="object-cover"
            />
          </motion.div>
          {/* black 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10" />
          <motion.div
            key={currentWork.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white  z-20 absolute bottom-8 left-10"
          >
            <div className="   ">
              <div className="text-base mb-1">
                {currentWork.year} {currentWork.location}
              </div>
              <div className="text-5xl font-bold">{currentWork.title}</div>
              <div className=" h-[1px] w-full bg-white/50 my-4"></div>
              <div className="max-w-3xl mb-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h3 className="font-medium text-white">基地位置</h3>
                    <p>{currentWork.details?.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">基地面積</h3>
                    <p>{currentWork.details?.area}</p>
                  </div>
                  {currentWork.details?.units && (
                    <div>
                      <h3 className="font-medium text-white">戶數規劃</h3>
                      <p>{currentWork.details.units}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-white">樓層規劃</h3>
                    <p>{currentWork.details?.floors}</p>
                  </div>
                  {currentWork.details?.houseTypes && (
                    <div>
                      <h3 className="font-medium text-white">坪數規劃</h3>
                      <p>{currentWork.details.houseTypes}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-white">建築設計</h3>
                    <p>{currentWork.details?.architect}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">施工營造</h3>
                    <p>{currentWork.details?.constructor}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="absolute bottom-10 right-10 z-20">
            <div className="flex gap-4 bg-black/50  rounded-lg p-2">
              <Link
                href="/works"
                className="inline-flex items-center  text-white/80 hover:text-white "
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
              {/* Next  if no next, hide */}

              {/* Prev */}
              {prevWork && (
                <Link
                  href={`/works/${prevWork?.id}`}
                  className="inline-flex items-center  text-white/80 hover:text-white "
                >
                  上一個作品
                </Link>
              )}
              {nextWork && (
                <Link
                  href={`/works/${nextWork?.id}`}
                  className="inline-flex items-center  text-white/80 hover:text-white "
                >
                  下一個作品
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-[5%]">
          {/* YouTube 影片 */}
          {currentWork.ytVideoUrl && (
            <div className="w-full mb-16">
              <h2 className="text-2xl font-bold mb-4">建案影片</h2>
              <div className="aspect-video">
                <iframe
                  src={currentWork.ytVideoUrl.replace("watch?v=", "embed/")}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* 主要圖片 */}
          <div className="relative aspect-video mb-12">
            <Image
              src={`https://web.forestdev.work/gaoch/works/${currentWork.image}`}
              alt={currentWork.title}
              fill
              className="object-cover"
            />
          </div>

          {/* 上一個/下一個作品 */}
          <div className="grid grid-cols-2 gap-8">
            {prevWork && (
              <Link href={`/works/${prevWork.id}`} className="group">
                <div className="relative aspect-[3/2] mb-4">
                  <Image
                    src={`https://web.forestdev.work/gaoch/works/${prevWork.image}`}
                    alt={prevWork.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                </div>
                <div className="text-sm text-gray-500 mb-2">上一個作品</div>
                <div className="font-bold">{prevWork.title}</div>
              </Link>
            )}
            {nextWork && (
              <Link href={`/works/${nextWork.id}`} className="group text-right">
                <div className="relative aspect-[3/2] mb-4">
                  <Image
                    src={`https://web.forestdev.work/gaoch/works/${nextWork.image}`}
                    alt={nextWork.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                </div>
                <div className="text-sm text-gray-500 mb-2">下一個作品</div>
                <div className="font-bold">{nextWork.title}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
