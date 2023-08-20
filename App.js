/* eslint-disable array-callback-return */
import { Routes, Route, Router } from "react-router-dom";
import { routes } from "./routes/routers";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { Fragment } from "react";

function App() {
  return (
    <div>
      <Routes>
        {routes.map((router, index) => {
          const Page = router.page;
          const Layout = router.isShowHeader ? DefaultComponent : Fragment;
          return (
            <Route
              path={router.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
