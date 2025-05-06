import Layout from "@/components/layouts/Layout";

import VideoBackground from "@/components/shared/VideoBackground";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <Layout>
      <VideoBackground videoId="IDExhBqZyHQ" />
      <main className="relative">
        <motion.div
          className="fixed top-1/2 left-0 right-0 px-4 md:px-20"
          initial={{ opacity: 0, scale: 0.5, y: "-60%" }}
          animate={{ opacity: 1, scale: 1, y: "-60%" }}
          transition={{ duration: 0.4 }}
        >
          <section className="flex flex-col w-full relative h-full items-center justify-center  py-[5%]">
            <div
              className=" relative items-center justify-center  md:text-[100px] text-[45px] font-bold"
              style={{
                background:
                  "linear-gradient(to top right, #FFFFFF80 0%, #858585 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              務實 專業 用心
            </div>
            <div className="text-white/70 text-lg font-bold md:w-[70%] w-[90%] mx-auto text-center">
              深耕房地產相關行業多年，除了累積豐厚經驗與建實力，憑藉著務實的態度與在地政策的了解，{" "}
              <br />
              <span className="text-amber-400 ">「高誠事業」</span>
              得以成長為耀眼的「在地建築口碑品牌」。
            </div>
          </section>
        </motion.div>
      </main>
    </Layout>
  );
}
