import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Work {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
  location: string;
}

export default function Works() {
  const [currentCategory, setCurrentCategory] = useState<string>("全部作品");
  const categories = ["全部作品", "住宅設計", "豪宅設計", "商業設計"];

  const allWorks: Work[] = [
    {
      id: 1,
      title: "高誠帝景",
      category: "住宅設計",
      image: "w01s.png",
      year: "2023",
      location: "中壢區",
    },
    {
      id: 2,
      title: "高誠帝景",
      category: "豪宅設計",
      image: "w02s.png",
      year: "2023",
      location: "中壢區",
    },
    {
      id: 3,
      title: "高誠帝景",
      category: "商業設計",
      image: "w03s.png",
      year: "2022",
      location: "中壢區",
    },
  ];

  const filteredWorks =
    currentCategory === "全部作品"
      ? allWorks
      : allWorks.filter((work) => work.category === currentCategory);

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat pt-[88px]"
        style={{
          backgroundImage: "url(https://web.forestdev.work/gaoch/s1-1_bg.png)",
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">精彩力作</h1>

          {/* 作品分類選單 */}
          <div className="flex gap-6 mb-12 relative">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCurrentCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors relative  ${
                  currentCategory === category
                    ? "text-white bg-black "
                    : "hover:bg-gray-300"
                }`}
              >
                {currentCategory === category && (
                  <motion.div
                    layoutId="categoryBackground"
                    className="absolute inset-0 bg-black rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>

          {/* 作品網格 */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14"
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
                  <Link
                    href={`/works/${work.id}`}
                    className="group hover:translate-y-[-10px]"
                  >
                    <div className="relative aspect-[35/43] overflow-hidden transform skew-x-[-12deg]">
                      <div className="absolute inset-0 transform skew-x-[12deg] scale-[1.3] origin-center">
                        <Image
                          src={`https://web.forestdev.work/gaoch/works/${work.image}`}
                          alt={work.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 transform skew-x-[12deg] flex flex-col justify-end p-6">
                          <h3 className="text-white text-xl font-bold mb-2">
                            {work.title}
                          </h3>
                          <div className="text-white/80 text-sm">
                            <span>{work.category}</span>
                            <span className="mx-2">|</span>
                            <span>{work.year}</span>
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
