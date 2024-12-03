import Layout from "@/components/layouts/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { RELATED_COMPANIES } from "@/constants";

export default function History() {
  const router = useRouter();

  return (
    <Layout>
      <div
        className=" min-h-screen  bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://web.forestdev.work/gaoch/s1-1_bg.png)",
        }}
      >
        <div className="w-full  flex items-center justify-center h-screen ">
          {/* 左側導航和企業列表 */}
          <div className="w-1/2 h-full">
            {/* 頂部導航 */}
            <div className="pt-[20%] px-[10%]">
              <div className="flex gap-10">
                <Link
                  href="/brand"
                  className={`relative pb-2 ${
                    router.pathname === "/brand"
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
                      : ""
                  }`}
                >
                  企業精神
                </Link>
                <Link
                  href="/history"
                  className={`relative pb-2 ${
                    router.pathname === "/history"
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
                      : ""
                  }`}
                >
                  關係企業
                </Link>
              </div>
              <div className="h-[calc(100vh-200px)] overflow-y-auto pr-4 space-y-6 pt-5">
                {RELATED_COMPANIES.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden">
                        <Image
                          src={`https://web.forestdev.work/gaoch/company/${item.img}?v=1`}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="object-cover object-center"
                        />
                      </div>
                      <h3 className="text-xl font-semibold ">{item.name}</h3>
                    </div>
                    <div className="mt-4">
                      <div className="text-gray-900 font-semibold mb-1">
                        學歷：
                      </div>
                      <div className="text-gray-600 mb-1">
                        {item.educational.map((item, index) => (
                          <p key={index} className="mb-1">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-gray-900 font-semibold mb-1">
                        簡歷：
                      </div>
                      <div className="text-gray-600 mb-1">
                        {item.projects.map((project, index) => (
                          <p key={index} className="mb-1">
                            {project}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 可滾動的企業列表 */}
          </div>

          {/* 右側圖片 */}
          <div className="w-1/2 h-full relative  items-center justify-center">
            {/* gradient bg */}
            <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent z-10"></div>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="   w-full h-full"
            >
              <Image
                src="https://web.forestdev.work/gaoch/02.jpg" // 請確保有此圖片
                alt="關係企業圖片"
                fill
                className="object-cover "
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
