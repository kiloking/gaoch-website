import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/utils/api";
import { LoaderCircle } from "lucide-react";

export default function Works() {
  const { data: works, isLoading } = api.works.getAll.useQuery();

  return (
    <Layout>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat pt-[0px] bg-zinc-100 pb-[8%]">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
          style={{
            backgroundImage: "url(https://web.forestdev.work/gaoch/bg/05.png)",
          }}
        >
          {/* black 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
          <div className="text-white text-5xl font-bold  z-20 absolute bottom-10 left-10">
            Works <span className="text-white text-xl"> / 精彩力作</span>
          </div>
        </motion.div>
        <div className="container mx-auto px-4 mt-[5%]">
          {/* 作品分類選單 */}

          {/* 作品網格 */}
          {/* if isLoading add loading component */}
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-screen">
              <div className="flex flex-col items-center">
                <LoaderCircle className="w-10 h-10 animate-spin" />
                <div className="text-sm text-gray-500">Loading...</div>
              </div>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10"
            >
              <AnimatePresence mode="popLayout">
                {works &&
                  works.map((work) => (
                    <motion.div
                      key={work.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href={`/works/${work.id}`} className="group ">
                        <div className="relative  transform  border-0 border-black/10 rounded-md  bg-white/0 shadow- hover:shadow-xl transition-shadow duration-500">
                          <div className="  text-black py-1 px-2  ">
                            <div className=" transform  flex flex- gap-2 justify-center items-center ">
                              <h3 className="text-black font-bold mb-1 text-lg">
                                {work.title}
                              </h3>
                              <div className="text-black/80 text-sm">
                                <span>{work.year}</span>
                                <span className="mx-2">|</span>
                                <span>{work.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="inset-0 transform scale-[1] origin-center aspect-[14/9] rounded-md overflow-hidden relative group">
                            <Image
                              src={work.coverImage?.url || ""}
                              alt={work.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* 更明顯的傾斜反光 */}
                            <div
                              className="absolute inset-0 pointer-events-none shine-effect"
                              style={{
                                background:
                                  "linear-gradient(115deg, transparent 45%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 45%)",
                                transform: "skewX(0deg) translateX(0%)",
                                opacity: 0.4,
                              }}
                            />

                            {/* 添加 CSS 動畫 */}
                            <style
                              dangerouslySetInnerHTML={{
                                __html: `
                                .shine-effect {
                                  transition: transform 0.8s ease-in-out;
                                }
                                .group:hover .shine-effect {
                                  transition: transform 0.5s ease-out;
                                  transform: skewX(-5deg) translateX(100%) !important;
                                }
                              `,
                              }}
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* 無作品提示 */}
          <AnimatePresence>
            {works && works.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-center py-12 text-gray-500"
              >
                此分類目前沒有作品
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
