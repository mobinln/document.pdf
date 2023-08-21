import { Route, Routes } from "react-router-dom";

import Html from "../pages/html";
import List from "../pages/list";
import Table from "../pages/table";

import MainLayout from "../layout/main";

export default function PanelRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Table />} />
        <Route path="html" element={<Html />} />
        <Route path="list" element={<List />} />
      </Route>
    </Routes>
  );
}
