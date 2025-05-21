import Layout from "@/components/layouts/Layout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/utils/api";
import { SquareArrowOutUpRight } from "lucide-react";
import Head from "next/head";

export default function Projects() {
  // 專案資料

  const { data: projects } = api.projects.getAll.useQuery();

  return (
    <>
      <Head>
        <title>高誠事業 - 新案鑒賞</title>
      </Head>
      <Layout>
        <div className=" min-h-screen  bg-cover bg-center bg-no-repeat  pt-[0px] bg-zinc-100 pb-[10%]">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
            style={{
              backgroundImage:
                "url(https://web.forestdev.work/gaoch/bg/08.png)",
            }}
          >
            {/* black 遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
            <div className="text-white md:text-5xl text-4xl font-bold  z-20 absolute bottom-10 md:left-10 left-5">
              Projects <span className="text-white text-xl"> / 新案鑒賞</span>
            </div>
          </motion.div>
          <div className="container mx-auto px-4 mt-[5%]">
            {/* 頁面標題 */}

            {/* 專案列表 */}
            <div className="grid grid-cols-1 md:grid-cols-3  gap-14">
              {projects &&
                projects.map((project) => (
                  <Link
                    href={project.link}
                    key={project.id}
                    className="group"
                    target="_blank"
                  >
                    <div className="bg-white/0 rounded-lg flex flex-col items-start justify-between w-full gap-2">
                      {/* 專案圖片 */}
                      <div
                        className="relative w-full"
                        style={{ aspectRatio: "16/10" }}
                      >
                        <div className="relative w-full h-full  rounded-lg overflow-hidden">
                          <Image
                            src={project.coverImage?.url || ""}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 "
                          />
                          <div className="absolute w-full bg-zinc-800  bottom-0 p-2 flex justify-between items-center">
                            <div className="m">
                              <span
                                className={`
                          px-3 py-1 rounded-lg text-sm
                          ${
                            project.status === "熱銷中" ? "text-pink-700  " : ""
                          }
                          ${
                            project.status === "即將完工"
                              ? " text-indigo-300"
                              : ""
                          }
                          ${
                            project.status === "即將開案" ? "text-lime-300" : ""
                          }
                          text-white
                        `}
                              >
                                {project.status}
                              </span>
                            </div>
                            <a
                              className=" flex items-center text-sm text-zinc-100 gap-1 hover:text-slate-200"
                              href={project.link}
                            >
                              介紹頁連結
                              <SquareArrowOutUpRight size={15} />
                            </a>
                          </div>
                        </div>
                        {/* link icon top right */}
                      </div>

                      {/* 專案資訊 */}
                      <div className="p-2 w-full">
                        {/* 狀態標籤 */}

                        <h3 className="font-bold mb-2 flex justify-between items-end w-full">
                          <div className="text-2xl  "> {project.title}</div>

                          <div className="flex items-center   text-red-800 invisible">
                            {project.price ? "" : ""}
                          </div>
                        </h3>
                        <div className="space-y-2 text-gray-600 mt-4 w-full ">
                          <div className="flex items-center  justify-between   ">
                            <div className="">基地位置</div>
                            <div className=" text-black">
                              {project.location}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 justify-between">
                            <div className="">基地面積</div>
                            <div className=" text-black">{project.area}</div>
                          </div>
                          <div className="flex items-center gap-2  justify-between">
                            <div className="">規劃坪數</div>
                            <div className=" text-black">{project.size}</div>
                          </div>
                          <div className="flex items-center gap-2 justify-between">
                            <div className="">規劃樓層</div>
                            <div className=" text-black">{project.floors}</div>
                          </div>
                          <div className="flex items-center gap-2 justify-between">
                            <div className="">規劃戶車</div>
                            <div className=" text-black">
                              {project.household}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 justify-between">
                            <div className="">建築設計</div>
                            <div className=" text-black">
                              {project.design_company}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 justify-between">
                            <div className="">施工營造</div>
                            <div className=" text-black">
                              {project.construction_company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
