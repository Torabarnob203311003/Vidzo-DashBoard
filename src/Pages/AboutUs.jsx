/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('<p>Write About Us content here...</p>');

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      <h2 className="text-3xl font-black text-[#1E293B] mb-6">About Us</h2>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use onBlur
        onChange={newContent => {}}
        config={{
          readonly: false,
          height: 500,
          toolbarButtonSize: "middle",
          buttons: [
            'bold','italic','underline','strikethrough','|',
            'ul','ol','|',
            'link','unlink','|',
            'font','fontsize','brush','paragraph','|',
            'align','undo','redo','hr'
          ],
          style: {
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            padding: "1rem"
          }
        }}
      />
    </div>
  );
};

export default AboutUs;
