import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { api } from "@/utils/api";
import { z } from "zod";
import { GetServerSideProps } from "next";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
// getServerSideProps url 帶 id
const paramSchema = z.object({
  work_id: z.coerce.number(),
});
type Param = z.infer<typeof paramSchema>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedResult = paramSchema.safeParse(context.params);

  if (!parsedResult.success) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...parsedResult.data,
    },
  };
};

export default function WorkDetail(props: Param) {
  const { data: currentWork } = api.works.getById.useQuery({
    id: props.work_id,
  });
  // 找到當前作品

  // 使用單一查詢獲取相鄰作品
  const { data: adjacentWorks } = api.works.getAdjacentWorks.useQuery({
    currentId: props.work_id,
  });

  // 解構相鄰作品
  const prevWork = adjacentWorks?.prev;
  const nextWork = adjacentWorks?.next;

  if (!currentWork) {
    //return fullscreen loading circle
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col items-center">
          <LoaderCircle className="w-10 h-10 animate-spin" />
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat pt-[0px] bg-zinc-100">
        <div className="flex justify-center items-center w-full bg-zinc-100 aspect-[15/8] bg-cover bg-center bg-no-repeat relative -z-0">
          <motion.div
            key={currentWork.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={currentWork.bgimg?.url || ""}
              alt={currentWork.title}
              fill
              className="object-cover"
            />
          </motion.div>
          {/* black 遮罩 */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/5 to-transparent z-10" /> */}
          <div className=" absolute w-[40%] h-full left-0 top-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
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
                    <p>{currentWork?.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">基地面積</h3>
                    <p>{currentWork?.area}</p>
                  </div>
                  {currentWork?.units && (
                    <div>
                      <h3 className="font-medium text-white">戶數規劃</h3>
                      <p>{currentWork.units}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-white">樓層規劃</h3>
                    <p>{currentWork?.floors}</p>
                  </div>
                  {currentWork?.houseTypes && (
                    <div>
                      <h3 className="font-medium text-white">坪數規劃</h3>
                      <p>{currentWork.houseTypes}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-white">建築設計</h3>
                    <p>{currentWork?.architect}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">施工營造</h3>
                    <p>{currentWork?.company}</p>
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
              <h2 className="text-xl font-bold mb-4 flex  ">
                <p className="bg-white/90 text-black/60 rounded-full  px-4 py-2">
                  建案影片
                </p>
              </h2>
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
          <h2 className="text-xl font-bold mb-4 flex  ">
            <p className="bg-white/90 text-black/60 rounded-full  px-4 py-2">
              外觀圖片
            </p>
          </h2>
          <div className="relative aspect-video mb-12">
            <Image
              src={currentWork.bgimg?.url || ""}
              alt={currentWork.title}
              fill
              className="object-cover"
            />
          </div>

          {/* 上一個/下一個作品 */}
          <div className="flex justify-between">
            {prevWork ? (
              <Link
                href={`/works/${prevWork.id}`}
                className="group w-[20%] flex items-center "
              >
                <div className="text-sm text-gray-500 mb-2">
                  <ChevronLeft />
                </div>
                <div className="relative aspect-[16/9] mb-4 rounded-xl overflow-hidden w-full border-4 border-black/10">
                  <Image
                    src={prevWork.coverImage?.url || ""}
                    alt={prevWork.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors" />
                  <div className="font-bold absolute text-white top-0 w-full h-full flex items-center justify-center text-xl">
                    {prevWork.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-[30%]"></div>
            )}
            {nextWork && (
              <Link
                href={`/works/${nextWork.id}`}
                className="group text-right w-[20%] flex items-center"
              >
                <div className="relative aspect-[16/9] mb-4 rounded-xl overflow-hidden w-full border-4 border-black/10">
                  <Image
                    src={nextWork.coverImage?.url || ""}
                    alt={nextWork.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors" />
                  <div className="font-bold absolute text-white top-0 w-full h-full flex items-center justify-center text-xl">
                    {nextWork.title}
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  <ChevronRight />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
