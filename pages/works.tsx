import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { WORKS } from "@/constants/works";

export default function Works() {
  const filteredWorks = WORKS;

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat pt-[0px]"
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
          <div className="text-white text-5xl font-bold  z-20 absolute bottom-10 left-10">
            Our Works <span className="text-white text-xl"> / 精彩力作</span>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-[5%]">
          {/* 作品分類選單 */}

          {/* 作品網格 */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/works/${work.id}`} className="group ">
                    <div className="relative  transform  border border-black/10 rounded-md  bg-white/20 shadow-lg hover:shadow-xl transition-shadow duration-500">
                      <div className=" inset-0 transform  scale-[1] origin-center aspect-[14/8] rounded-md overflow-hidden">
                        <Image
                          src={`https://web.forestdev.work/gaoch/works/${work.image}`}
                          alt={work.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="  text-black py-1 px-2  ">
                        <div className=" transform  flex flex-col justify-end ">
                          <h3 className="text-black font-bold mb-1">
                            {work.title}
                          </h3>
                          <div className="text-black/80 text-sm">
                            <span>{work.year}</span>
                            <span className="mx-2">|</span>
                            <span>{work.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* 無作品提示 */}
          <AnimatePresence>
            {filteredWorks.length === 0 && (
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
