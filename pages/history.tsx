import Layout from "@/components/layouts/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";

export default function History() {
  const router = useRouter();

  const companies = [
    {
      name: "企業名稱 A",
      description: "專注於建築設計與室內規劃...",
      year: "2010",
      business: "建築設計",
    },
    {
      name: "企業名稱 B",
      description: "提供專業的營建管理服務...",
      year: "2015",
      business: "營建管理",
    },
    {
      name: "企業名稱 C",
      description: "專業的室內設計與裝修服務...",
      year: "2018",
      business: "室內設計",
    },
    // 可以添加更多企業...
  ];

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
                {companies.map((company, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      {company.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{company.description}</p>
                    <div className="text-sm text-gray-500">
                      <p>成立時間：{company.year}年</p>
                      <p>主要業務：{company.business}</p>
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
