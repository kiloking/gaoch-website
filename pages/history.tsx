import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import { motion } from "framer-motion";
import { RELATED_COMPANIES } from "@/constants";
import { AboutNavbar } from "@/components/AboutNavbar";

export default function History() {
  return (
    <Layout>
      <div className=" min-h-screen  bg-cover bg-center bg-no-repeat">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
          style={{
            backgroundImage: "url(https://web.forestdev.work/gaoch/bg/04.png)",
          }}
        >
          {/* black 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
          <div className="text-white text-5xl font-bold  z-20 absolute bottom-10 left-10">
            Our Company <span className="text-white text-xl"> / 關係企業</span>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full relative">
          <AboutNavbar />
          {/* 左側導航和企業列表 */}
          <div className="w-full h-full flex items-start justify-center">
            <div className="w-2/3 h-full">
              {/* 頂部導航 */}
              <div className="pt-[%] px-[5%]">
                <div className=" pt-5 grid grid-cols-2 gap-5">
                  {RELATED_COMPANIES.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-2 rounded-lg shadow-lg hover:bg-slate-200 hover:shadow-xl transition-shadow duration-500"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-24 aspect-square rounded-md overflow-hidden">
                          <Image
                            src={`https://web.forestdev.work/gaoch/02.jpg`}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h3 className="text-xl font-semibold ">
                            {item.name}
                          </h3>
                          {item.link && item.link !== "" && (
                            <a
                              href={item.link}
                              target="_blank"
                              className="text-sm text-blue-500 hover:text-blue-700"
                            >
                              前往官網
                            </a>
                          )}
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
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="   w-full h-[calc(100vh-100px)]"
              >
                <img
                  src="https://web.forestdev.work/gaoch/bg/02.png"
                  alt=""
                  className="w-full object-cover h-full"
                />
                <div className="absolute top-3 left-3 w-full h-full bg-blue-800 to-transparent -z-10"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
