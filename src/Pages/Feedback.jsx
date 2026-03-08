/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Search, Star, Eye } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useUseGetFeedbackQuery } from "@/redux/features/feedback/feedbackApi";

const Feedback = () => {
  const { data: feedback, isLoading } = useUseGetFeedbackQuery();

  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const headers = ["ID", "Name", "Feedback", "Rating", "Action"];

  const openModal = (data) => {
    setSelectedFeedback(data);
    setShowModal(true);
  };

  return (
    <div className="p-10 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Feedback</h2>

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl w-96 focus:outline-none shadow-sm font-medium"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full no-scrollbar">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-white border-b border-gray-50">
              <TableRow>
                {headers.map((h) => (
                  <TableHead
                    key={h}
                    className="px-10 py-8 text-[12px] font-black text-[#1E293B] uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-20 text-gray-400 font-bold"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                feedback?.data?.map((item, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <TableCell className="px-10 py-6 text-sm font-bold text-gray-500">
                      {i + 1}
                    </TableCell>

                    <TableCell className="px-10 py-6 text-sm font-black text-[#1E293B]">
                      {item.name}
                    </TableCell>

                    <TableCell className="px-10 py-6 text-sm font-bold text-gray-500 max-w-sm truncate">
                      {item.feedback}
                    </TableCell>

                    <TableCell className="px-10 py-6">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <Star
                            key={s}
                            size={16}
                            className="text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </TableCell>

                    <TableCell className="px-10 py-6 text-[#FFC12D]">
                      <button onClick={() => openModal(item)}>
                        <Eye size={20} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && selectedFeedback && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.45)",
            zIndex: 1000,
            fontFamily: "'DM Sans','Segoe UI',sans-serif",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              width: "320px",
              boxShadow: "0 12px 48px rgba(0,0,0,0.22)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 18px 14px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>
                Feedback Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#e74c3c",
                  fontSize: "22px",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "18px" }}>
              <p style={{ fontWeight: 700, marginBottom: "6px" }}>Name:</p>
              <p style={{ marginBottom: "12px" }}>{selectedFeedback.name}</p>
              <p style={{ fontWeight: 700, marginBottom: "6px" }}>Feedback:</p>
              <p>{selectedFeedback.feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;