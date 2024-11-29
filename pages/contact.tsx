import Layout from "@/components/layouts/Layout";
import { useState, FormEvent, ChangeEvent } from "react";

interface RepairForm {
  type: "公設" | "非公設";
  unit: string;
  contactName: string;
  phone: string;
  content: string;
  images: File[];
  date: string;
}
interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  businessHours: string;
  mapUrl: string;
}
export default function Contact() {
  const [formData, setFormData] = useState<RepairForm>({
    type: "公設",
    unit: "",
    contactName: "",
    phone: "",
    content: "",
    images: [],
    date: new Date().toISOString().split("T")[0], // 自動帶入今天日期
  });

  // 處理圖片上傳
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 2) {
      alert("最多只能上傳兩張圖片");
      return;
    }
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  // 移除圖片
  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 這裡處理表單提交邏輯
    console.log(formData);
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

            {/* 右側：報修表單 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">線上報修</h2>
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
                    維修內容 *
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
                    上傳圖片（最多2張）
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    disabled={formData.images.length >= 2}
                  />
                  {/* 預覽圖片 */}
                  <div className="mt-2 flex gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
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

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  送出報修
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
