import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import { motion } from "framer-motion";
import { RELATED_PARTNERS } from "@/constants";
import { AboutNavbar } from "@/components/AboutNavbar";
import { ExternalLink } from "lucide-react";

export default function Partners() {
  return (
    <Layout>
      <div className=" min-h-screen  bg-cover bg-center bg-no-repeat">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
          style={{
            backgroundImage: "url(https://web.forestdev.work/gaoch/bg/07.png)",
          }}
        >
          {/* black 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
          <div className="text-white md:text-5xl text-4xl font-bold  z-20 absolute bottom-10 md:left-10 left-5">
            Our Partners <span className="text-white text-xl"> / 協力廠商</span>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full relative mb-[5%]">
          <AboutNavbar />
          {/* 左側導航和企業列表 */}
          <div className="w-full h-full flex items-start justify-center">
            <div className="w-full h-full">
              {/* 頂部導航 */}
              <div className="pt-[%] px-[5%]">
                <div className=" pt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {RELATED_PARTNERS.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-lg hover:bg-slate-200 hover:shadow-xl transition-shadow duration-500"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="w-20 aspect-square rounded-md overflow-hidden"
                        >
                          <Image
                            src={`https://web.forestdev.work/gaoch/company/${item.img}?v=1`}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="object-cover object-top w-full h-full"
                          />
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="text-xl font-semibold flex items-center gap-2 "
                        >
                          {item.name}
                          <a href={item.link} target="_blank">
                            <ExternalLink size={16} />
                          </a>
                        </motion.h3>
                      </div>
                      {item.description && (
                        <div className="mt-4 p-2">
                          <div className="text-gray-900 font-semibold mb-1">
                            團隊介紹
                          </div>
                          <div className="text-gray-600 mb-1  tracking-wider">
                            {item.description}
                          </div>
                        </div>
                      )}

                      {item.educational.length > 0 && (
                        <div className="mt-4 p-2">
                          <div className="text-gray-900 font-semibold mb-1">
                            學歷：
                          </div>
                          <div className="text-gray-600 mb-1  tracking-wider">
                            {item.educational.map((item, index) => (
                              <p key={index} className="mb-1">
                                {item}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.projects.length > 0 && (
                        <div className="mt-4 p-2">
                          <div className="text-gray-900 font-semibold mb-1">
                            簡歷：
                          </div>
                          <div className="text-gray-600 mb-1  tracking-wider">
                            {item.projects.map((project, index) => (
                              <p key={index} className="mb-1">
                                {project}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 可滾動的企業列表 */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
