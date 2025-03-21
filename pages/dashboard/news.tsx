import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/utils/api";
import { toast } from "sonner";
import DashboardLayout from "@/components/layouts/Dashboardlayout";

interface NewsData {
  id: number;
  title: string;
  image: string;
  url: string;
  isVisible: boolean;
}

export default function NewsPage() {
  const [url, setUrl] = useState("");
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [editableTitle, setEditableTitle] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const { data: allNews } = api.news.readAll.useQuery();
  const utils = api.useUtils();
  const fetchNews = api.news.fetch.useMutation();
  const createNews = api.news.create.useMutation();
  const deleteNews = api.news.delete.useMutation();
  const updateNewsVisibility = api.news.isVisible.useMutation();
  const handleFetch = () => {
    fetchNews.mutate(
      { url },
      {
        onSuccess: (data: {
          title: string | undefined;
          image: string | undefined;
        }) => {
          setNewsData({
            id: Date.now(),
            title: data.title || "無標題",
            image: data.image || "",
            url: url,
            isVisible: true,
          });
          setEditableTitle(data.title || "無標題");
        },
        onError: () => {
          toast("擷取失敗，請稍後再試。", {
            position: "top-center",
          });
        },
      }
    );
  };

  const handleSaveToDatabase = async () => {
    if (newsData) {
      try {
        await createNews.mutate(
          {
            title: editableTitle,
            image: newsData.image,
            url: newsData.url,
            isVisible,
          },
          {
            onSuccess: () => {
              toast("新聞已成功儲存到資料庫！", {
                position: "top-center",
              });
              utils.news.readAll.invalidate();
              setNewsData(null);
              setEditableTitle("");
              setUrl("");
              setIsVisible(true);
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast("儲存失敗，請稍後再試。", {
          position: "top-center",
        });
      }
    } else {
      toast("沒有可儲存的新聞資料。", {
        position: "top-center",
      });
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("您確定要刪除這條新聞嗎？");
    if (confirmed) {
      try {
        await deleteNews.mutate(
          { id },
          {
            onSuccess: () => {
              utils.news.readAll.invalidate();
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast("刪除失敗，請稍後再試。", {
          position: "top-center",
        });
      }
    }
  };

  const handleToggleVisibility = async (
    id: number,
    currentVisibility: boolean
  ) => {
    const newVisibility = !currentVisibility; // 切換顯示狀態
    try {
      await updateNewsVisibility.mutate(
        {
          id,
          isVisible: newVisibility,
        },
        {
          onSuccess: () => {
            utils.news.readAll.invalidate();
            toast("顯示狀態已更新！", {
              position: "top-center",
            });
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast("更新顯示狀態失敗，請稍後再試。", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (allNews) {
      console.log(allNews);
    }
  }, [allNews]);

  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">新聞擷取器</h2>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="請輸入新聞網址"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={handleFetch} disabled={fetchNews.isLoading}>
                {fetchNews.isLoading ? "擷取中..." : "擷取"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {newsData && (
          <Card>
            <CardContent className="space-y-4 py-4">
              <Input
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                className="text-2xl font-semibold"
              />
              <a href={url} target="_blank" rel="noopener noreferrer">
                <p className="text-blue-500 underline">{url}</p>
              </a>
              {newsData.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={newsData.image}
                    alt={newsData.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  className="mr-2"
                />
                <label>顯示此新聞</label>
              </div>
              <Button onClick={handleSaveToDatabase} className="mt-4">
                新增到新聞列表
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">所有新聞</h2>
          </CardHeader>
          <CardContent>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">標題</th>
                  <th className="border border-gray-300 p-2">網址</th>
                  <th className="border border-gray-300 p-2">顯示狀態</th>
                  <th className="border border-gray-300 p-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {allNews &&
                  allNews.map((news) => (
                    <tr key={news.id}>
                      <td className="border border-gray-300 p-2">
                        {news.title}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <a
                          href={news.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {news.url}
                        </a>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="checkbox"
                          checked={news.isVisible}
                          onChange={() =>
                            handleToggleVisibility(news.id, news.isVisible)
                          }
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Button className="mr-2">編輯</Button>
                        <Button onClick={() => handleDelete(news.id)}>
                          刪除
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
