import { FC, lazy, Suspense } from "react";

interface LazyWrapperProps {
  // 只填写/src/pages/下的路劲
  // 例如：src/pages/home，这里就写/home。
  path: string;
}

const LazyWrapper: FC<LazyWrapperProps> = ({ path }) => {
  const LazyComponent = lazy(() => import(`/src/pages${path}`));

  return (
    <Suspense fallback={<div>loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyWrapper;
