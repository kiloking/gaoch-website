import Layout from "@/components/layouts/Layout";

import VideoBackground from "@/components/shared/VideoBackground";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <Layout>
      <VideoBackground videoId="aDC3qAeyDjs" />
      <main className="relative">
        <div className="fixed top-[88px] left-0 right-0 px-4 md:px-20">
          <section className="flex w-full relative h-full items-center justify-center">
            <div className="w-1/2 h-full"></div>
            <div className="w-2/3 h-full relative items-center justify-center py-[5%]">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="top-0 left-0 w-[70%]"
              >
                <img
                  src="https://web.forestdev.work/gaoch/s1_p01.png?=1"
                  alt=""
                  className="w-full drop-shadow-lg shadow-black"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="w-[50%] absolute bottom-[10%] right-[18%] "
              >
                <img src="https://web.forestdev.work/gaoch/s1_p02.png" alt="" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-[50%] absolute top-[4%] right-[18%] "
              >
                <img
                  src="https://web.forestdev.work/gaoch/s1_p03.png?=1"
                  alt=""
                />
              </motion.div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
