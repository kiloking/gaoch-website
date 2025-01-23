import Layout from "@/components/layouts/Layout";
import { useState, FormEvent, useRef } from "react";
import { api } from "@/utils/api";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { ImageUploadButton } from "@/components/ImageUploadButton";
import { RepairFormData } from "@/types/types";
import { motion } from "framer-motion";
import {
  COMMUNITY_LIST,
  CONTACT_TIME_LIST,
  REPAIR_AREA_LIST,
  REPAIR_CLASS_LIST,
} from "@/constants";

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  businessHours: string;
  mapUrl: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<RepairFormData>({
    unit: "",
    contactName: "",
    phone: "",
    content: "",
    images: [],
    date: new Date().toISOString().split("T")[0],
    status: "待處理",
    community_code: "",
    community_name: "",
    email: "",
    contact_time: "",
    repair_area: "",
    repair_class: "",
    videoId: null,
  });

  const [resetImages, setResetImages] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const { mutate: createRepair, isLoading } = api.repair.create.useMutation({
    onSuccess: () => {
      toast.success("報修單已傳送，我們會盡快處理您的維修需求", {
        position: "top-center",
      });
      setFormData({
        unit: "",
        contactName: "",
        phone: "",
        content: "",
        images: [],
        date: new Date().toISOString().split("T")[0],
        status: "待處理",
        community_code: "",
        community_name: "",
        email: "",
        contact_time: "",
        repair_area: "",
        repair_class: "",
        videoId: null,
      });
      setUploadedImages([]);
      setResetImages(true);
      setTimeout(() => {
        setResetImages(false);
      }, 0);
      recaptchaRef.current?.reset();
      setIsVerified(false);
    },
    onError: () => {
      toast("提交失敗，請稍後再試", {
        position: "top-center",
      });
    },
  });

  const handleRecaptchaChange = (token: string | null) => {
    setIsVerified(!!token);
  };

  const handleFormChange = (field: keyof RepairFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast("請輸入有效的電子郵件地址", { position: "top-center" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!isVerified) {
      toast("請完成人機驗證", {
        position: "top-center",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await createRepair({
        ...formData,
        status: "待處理",
        community_code: formData.community_code || "",
        community_name: formData.community_name || "",
        email: formData.email || "",
        videoId: formData.videoId,
        images: formData.images || [],
      });

      recaptchaRef.current?.reset();
      setIsVerified(false);
    } catch {
      console.error("提交失敗");
    }
  };

  // const handleFormSubmit = () => {
  //   handleSubmit();
  // };

  const [contactInfo] = useState<ContactInfo>({
    address: "325桃園市龍潭區工二路一段96巷11號",
    phone: "03-470-6501",
    email: "service@gaoch.com.tw",
    businessHours: "週一至週五 09:00-17:00",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d115741.86256370951!2d121.1468398!3d24.9683871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34683ccfdddb9505%3A0x95c3c5c3cee035be!2z6auY6Kqg5a-m5qWt5pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1737627460364!5m2!1szh-TW!2stw",
  });

  const [uploadedImages, setUploadedImages] = useState<
    Array<{ url: string; id: number }>
  >([]);
  // const [uploadedVideo, setUploadedVideo] = useState<{
  //   url: string;
  //   id: number;
  // } | null>(null);

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

  // const handleVideoChange = (url: string, videoId?: number) => {
  //   if (url && videoId) {
  //     setUploadedVideo({ url, id: videoId });
  //     setFormData({
  //       ...formData,
  //       videoId,
  //     });
  //   }
  // };

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat pt-[0px] pb-[8%]"
        style={{
          backgroundImage: "url(https://web.forestdev.work/gaoch/s1-1_bg.png)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center w-full bg-zinc-100 h-[300px] bg-cover bg-center bg-no-repeat relative -z-0"
          style={{
            backgroundImage: "url(https://web.forestdev.work/gaoch/bg/02.png)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
          <div className="text-white text-5xl font-bold  z-20 absolute bottom-10 left-10">
            Contact Us <span className="text-white text-xl"> / 聯絡我們</span>
          </div>
        </motion.div>
        <div className="container mx-auto px-4 mt-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
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

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex flex-col justify-center items-center mb-6">
                <h2 className="text-2xl font-bold mb-2">線上報修</h2>
                <p className="text-sm text-gray-500">
                  此表單適用於住戶進行設備報修，若有其他業務需求請來信或來電洽詢。
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    社區 *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.community_code}
                    onChange={(e) => {
                      const selectedCommunity = COMMUNITY_LIST.find(
                        (c) => c.code === e.target.value
                      );
                      setFormData({
                        ...formData,
                        community_code: e.target.value,
                        community_name: selectedCommunity?.name || "",
                      });
                    }}
                  >
                    <option value="">請選擇社區</option>
                    {COMMUNITY_LIST.map((community) => (
                      <option key={community.code} value={community.code}>
                        {community.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    戶別 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A棟-1F-1號"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.unit}
                    onChange={(e) => handleFormChange("unit", e.target.value)}
                  />
                </div>

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
                      handleFormChange("contactName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    聯絡電話 *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. 123@abc.com"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    方便聯絡時間 *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.contact_time}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        contact_time: e.target.value,
                      });
                    }}
                  >
                    <option value="">方便聯絡時間</option>
                    {CONTACT_TIME_LIST.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    區域 *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.repair_area}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        repair_area: e.target.value,
                      });
                    }}
                  >
                    <option value="">區域</option>
                    {REPAIR_AREA_LIST.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    類別 *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.repair_class}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        repair_class: e.target.value,
                      });
                    }}
                  >
                    <option value="">類別</option>
                    {REPAIR_CLASS_LIST.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 維修內容 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    維修內容 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 浴室外側地板滲水"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    value={formData.content}
                    onChange={(e) =>
                      handleFormChange("content", e.target.value)
                    }
                  />
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

                {/* 影片上傳 */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    影片上傳
                    <p className="text-xs text-gray-500">
                      *僅限MP4格式，檔案大小請勿超過100MB
                    </p>
                  </label>
                  <VideoUploadButton
                    onVideoChange={handleVideoChange}
                    inputId="video-upload"
                    reset={resetImages}
                    completedWord="影片上傳完成"
                    isSubmitting={isSubmitting}
                    onSubmit={handleFormSubmit}
                  />
                  {uploadedVideo && (
                    <div className="mt-2">
                      <video
                        src={uploadedVideo.url}
                        controls
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                </div> */}
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

                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={handleRecaptchaChange}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading || !isVerified}
                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "提交中..." : "提交"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
