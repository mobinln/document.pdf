import { useEffect, useRef, useState } from "react";
import { createRandomUsers, userType } from "./mock/user";
import { createRandomContent, createRandomImage } from "./mock/content";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function App() {
  const [users, setUsers] = useState<userType[]>([]);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUsers(createRandomUsers());
  }, []);

  const handlePrint = async () => {
    try {
      if (headerRef.current && tableRef.current && footerRef.current) {
        const doc = new jsPDF();

        await doc.html(headerRef.current, {
          x: 5,
          y: 1,
          html2canvas: {
            allowTaint: true,
            async: true,
            letterRendering: true,
            useCORS: true,
            scale: 0.24,
          },
        });

        autoTable(doc, {
          startY: 250,
          margin: { vertical: 10 },
          html: tableRef.current,
        });

        // await doc.html(footerRef.current, {
        //   x: 5,
        //   y: 1,
        //   html2canvas: {
        //     allowTaint: true,
        //     async: true,
        //     letterRendering: true,
        //     useCORS: true,
        //     scale: 0.24,
        //   },
        // });

        doc.save();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Generate PDF</h1>
      <button style={{ marginTop: 16 }} onClick={handlePrint}>
        print
      </button>
      <div className="page">
        <div ref={headerRef}>
          <h3>Header, Users</h3>
          <p>{createRandomContent()}</p>
          <img src={createRandomImage()} alt="" />
        </div>
        <table ref={tableRef} style={{ margin: "8px auto" }}>
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Bio</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <img src={u.avatar} alt="" style={{ width: 100, height: 100, objectFit: "cover" }} />
                </td>
                <td>{u.fullName}</td>
                <td>{u.bio}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={footerRef}>
          <img src={createRandomImage()} alt="" />
          <p>{createRandomContent()}</p>
          <h3>Footer, Users</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
