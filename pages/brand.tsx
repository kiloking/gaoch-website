import Layout from "@/components/layouts/Layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Brand() {
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
          <div className="w-1/2 h-full">
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
                <Link
                  href="/partners"
                  className={`relative pb-2 ${
                    router.pathname === "/partners"
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
                      : ""
                  }`}
                >
                  協力廠商
                </Link>
              </div>
              <div className="pt-10">
                <div className="text-[#04C798] text-xl font-bold">
                  職人堅持 以誠築家
                </div>
                <div className="text-black text-xl font-bold">
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
              className="   w-full h-full"
            >
              <img
                src="https://web.forestdev.work/gaoch/s1-1_p01.png"
                alt=""
                className="w-full object-cover h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
