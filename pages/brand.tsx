import Layout from "@/components/layouts/Layout";
import { motion } from "framer-motion";
import { AboutNavbar } from "@/components/AboutNavbar";

export default function Brand() {
  return (
    <Layout>
      <div className=" min-h-screen  bg-cover bg-center bg-no-repeat">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
          style={{
            backgroundImage: "url(https://web.forestdev.work/gaoch/bg/01.png)",
          }}
        >
          {/* black 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
          <div className="text-white text-5xl font-bold  z-20 absolute bottom-10 left-10">
            Our Brand <span className="text-white text-xl"> / 企業精神</span>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full relative">
          <AboutNavbar />

          {/* if brand Component if history Component if partners Component */}
          <div className="w-full h-full flex items-start justify-center">
            <div className="w-1/2 h-full ">
              <div className="pt-[15%] px-[10%]">
                <div className="pt-10 flex flex-col gap-2 items-start">
                  <div className="text-black text-2xl font-bold mb-2">
                    - 企業精神
                  </div>
                  <div className="text-[#04C798] text-3xl font-bold mb-5">
                    職人堅持 以誠築家
                  </div>

                  <div className="text-black text-base px-3 py-1  bg-amber-500">
                    眼光獨到 - 務實建築人
                  </div>
                  <div className="text-black text-base pt-4 space-y-4">
                    <p>
                      「高誠事業」自2003年開始在桃園市青埔、八德、中壢、過嶺、楊梅等地區以穩健的腳步累積經驗與實力好口碑。董事長高武一先生秉持著穩扎穩打、樸實謙和的態度，帶領同仁為日後高誠事業的發展打下了穩固的基礎。
                    </p>
                    <p>
                      經營房地產多年，不只累積深厚實力，更憑藉著實事求是的態度以及對在地政策的了解，讓他成為航空城先行發展區裡，眼光獨到的「務實建築人」。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full relative  items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="   w-full h-[calc(100vh-100px)]"
              >
                <img
                  src="https://web.forestdev.work/gaoch/s1-1_p01.png"
                  alt=""
                  className="w-full object-cover h-full"
                />
                <div className="absolute top-5 left-5 w-full h-full bg-gradient-to-b from-black/40 via-black/30 to-transparent -z-10"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
