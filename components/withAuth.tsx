import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.replace("/login");
      }
    }, [status, router]);

    if (status === "loading") {
      return <div>載入中...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
