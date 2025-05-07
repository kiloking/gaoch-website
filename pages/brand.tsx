import Layout from "@/components/layouts/Layout";
import { motion } from "framer-motion";
import { AboutNavbar } from "@/components/AboutNavbar";
import { useRef } from "react";

export default function Brand() {
  const scrollRef = useRef(null);
  return (
    <Layout>
      <div className=" min-h-screen  bg-cover bg-center bg-no-repeat">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
          style={{
            backgroundImage: "url(https://web.forestdev.work/gaoch/bg/10.png)",
          }}
        >
          {/* black 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
          <div className="text-white md:text-5xl text-4xl font-bold  z-20 absolute bottom-10 md:left-10 left-5">
            Our Brand <span className="text-white text-xl"> / 企業精神</span>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full relative pb-[8%]">
          <AboutNavbar />

          {/* if brand Component if history Component if partners Component */}
          <div className="w-full h-full flex flex-col  items-start justify-between relative gap-2">
            <div
              className="w-full h-full relative   items-center justify-center mx-auto"
              ref={scrollRef}
            >
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="   w-[100%] aspect-[16/10] mx-auto  relative"
              >
                <img
                  src="https://web.forestdev.work/gaoch/s1-1_p01.png"
                  alt=""
                  className="w-full object-cover h-full contrast-[75%]  rounded-xl  "
                />
                <div className="absolute top-5 right-0 text-2xl font-black font-noto text-zinc-800 bg-[#e2d0aa] px-4 py-0">
                  企業精神
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute md:top-[45%] top-[80%] left-[0%] md:text-4xl text-2xl font-black font-noto text-zinc-50 bg-[#e2d0aa00] px-4 py-0 tracking-widest"
                >
                  “ 職人堅持 以誠築家 ”
                </motion.div>

                {/* <div className=" absolute top-4 -right-4 w-20 h-20 bg-amber-600/0 border-8 border-amber-600 -z-10"></div> */}
                {/* <div className="absolute top-5 left-5 w-full h-full bg-gradient-to-b from-black/40 via-black/30 to-transparent -z-10"></div> */}
              </motion.div>
            </div>
            <motion.div className="w-[100%]  mx-auto    bg-white  ">
              <div className="py-[3%] px-[4%]">
                <div className="pt- flex flex-col gap-2 items-center">
                  <div className="text-[#04C798] md:text-4xl text-3xl font-bold mb-2 font-noto">
                    眼光獨到 - 務實建築人
                  </div>

                  <div className="text-zinc-800 text-base  space-y-4 pt-[3%] tracking-widest leading-8 font-semibold text-center">
                    <p>
                      「高誠事業」自2003年開始在桃園市青埔、八德、中壢、過嶺、楊梅等地區以穩健的腳步累積經驗與實力好口碑。董事長高武一先生秉持著穩扎穩打、樸實謙和的態度，帶領同仁為日後高誠事業的發展打下了穩固的基礎。
                    </p>
                    <p>
                      經營房地產多年，不只累積深厚實力，更憑藉著實事求是的態度以及對在地政策的了解，讓他成為桃園在地深耕眼光獨到的『務實建築人』。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
