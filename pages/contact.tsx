import Layout from "@/components/layouts/Layout";
import { useState, FormEvent, useRef } from "react";
import { api } from "@/utils/api";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { ImageUploadButton } from "@/components/ImageUploadButton";
import { RepairFormData } from "@/types/types";

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  businessHours: string;
  mapUrl: string;
}
export default function Contact() {
  const [formData, setFormData] = useState<RepairFormData>({
    type: "公設",
    unit: "",
    contactName: "",
    phone: "",
    content: "",
    images: [],
    date: new Date().toISOString().split("T")[0], // 自動帶入今天日期
    status: "待處理",
  });

  const [resetImages, setResetImages] = useState(false);

  const { mutate: createRepair, isLoading } = api.repair.create.useMutation({
    onSuccess: () => {
      toast("維修單建立成功，我們會盡快處理您的維修需求", {
        position: "top-center",
      });
      // 重置表單
      setFormData({
        type: "公設",
        unit: "",
        contactName: "",
        phone: "",
        content: "",
        images: [],
        date: new Date().toISOString().split("T")[0],
        status: "待處理",
      });
      setUploadedImages([]);
      setResetImages(true); // 觸發重置
      recaptchaRef.current?.reset();
      setIsVerified(false);
    },
    onError: () => {
      toast("提交失敗，請稍後再試", {
        position: "top-center",
      });
    },
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleRecaptchaChange = (token: string | null) => {
    setIsVerified(!!token);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      toast("請完成人機驗證", {
        position: "top-center",
      });
      return;
    }

    try {
      await createRepair({
        type: formData.type,
        unit: formData.unit,
        contactName: formData.contactName,
        phone: formData.phone,
        content: formData.content,
        date: formData.date,
        images: formData.images,
        status: "待處理",
      });

      // 重置 reCAPTCHA
      recaptchaRef.current?.reset();
      setIsVerified(false);
    } catch {
      console.error("提交失敗");
    }
  };

  // 聯絡資訊 state
  const [contactInfo] = useState<ContactInfo>({
    address: "325桃園市龍潭區工二路一段96巷9號",
    phone: "03-470-6501",
    email: "service@gaoch.com.tw",
    businessHours: "週一至週五 09:00-17:00",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14477.118789727136!2d121.2048513!3d24.8884394!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34683ccfdddb9505%3A0x62a11cb420799f3f!2z6auY6Kqg6ZaL55m85bu66Kit5pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1732854454586!5m2!1szh-TW!2stw",
  });

  // 處理圖片變更
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ url: string; id: number }>
  >([]);

  const handleImagesChange = (url: string, imageId?: number) => {
    if (uploadedImages.length >= 2) {
      toast("最多只能上傳2張圖片", {
        position: "top-center",
      });
      return;
    }

    if (url && imageId) {
      setUploadedImages([...uploadedImages, { url, id: imageId }]);
      setFormData({
        ...formData,
        images: [...(formData.images || []), imageId],
      });
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat pt-[0px]"
        style={{
          backgroundImage: "url(https://web.forestdev.work/gaoch/s1-1_bg.png)",
        }}
      >
        <div
          className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
          style={{
            backgroundImage: "url(https://web.forestdev.work/gaoch/bg06.jpg)",
          }}
        >
          {/* black 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
          <div className="text-white text-5xl font-bold  z-20 absolute bottom-10 left-10">
            Contact Us <span className="text-white text-xl"> / 聯絡我們</span>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-[5%]">
          {/* 標題圖片 */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左側：聯絡資訊和地圖 */}
            <div className="space-y-8">
              {/* 聯絡資訊 */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">聯絡資訊</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-medium">地址</h3>
                      <p className="text-gray-600">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-medium">電話</h3>
                      <p className="text-gray-600">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-medium">營業時間</h3>
                      <p className="text-gray-600">
                        {contactInfo.businessHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">地圖位置</h2>
                <div className="aspect-video w-full">
                  <iframe
                    src={contactInfo.mapUrl}
                    className="w-full h-full rounded-lg"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* 右側：報修表 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex flex-col justify-center items-center mb-6">
                <h2 className="text-2xl font-bold mb-2">線上報修</h2>
                <p className="text-sm text-gray-500">
                  此表單適用於住戶進行設備報修，若有其他業務需求請來信或來電洽詢。
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 報修類型 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    報修類型 *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as "公設" | "非公設",
                      })
                    }
                  >
                    <option value="公設">公設</option>
                    <option value="非公設">非公設</option>
                  </select>
                </div>

                {/* 戶別 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    戶別 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例：A棟-1F-1號"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                  />
                </div>

                {/* 聯絡人 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    聯絡人 *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                  />
                </div>

                {/* 聯絡電話 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    聯絡電話 *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                {/* 維修內容 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    維修內容描述 *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                  ></textarea>
                </div>

                {/* 圖片上傳 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    詳細圖片上傳
                    <p className="text-xs text-gray-500">
                      *最多2張，僅限JPG、PNG格式，單張圖片請勿超過10MB
                    </p>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <ImageUploadButton
                        onImagesChange={handleImagesChange}
                        inputId="image-upload-1"
                        disabled={uploadedImages.length >= 2}
                        reset={resetImages}
                        completedWord="圖片上傳完成"
                      />
                    </div>
                    <div>
                      <ImageUploadButton
                        onImagesChange={handleImagesChange}
                        inputId="image-upload-2"
                        disabled={uploadedImages.length >= 2}
                        reset={resetImages}
                        completedWord="圖片上傳完成"
                      />
                    </div>
                  </div>
                </div>

                {/* 填單日期 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    填單日期
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none bg-gray-100"
                    value={formData.date}
                    readOnly
                  />
                </div>

                {/* 在送出按鈕前添加 reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={handleRecaptchaChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isVerified}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "處理中..." : "送出報修"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
