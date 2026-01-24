import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('<p>Write Privacy Policy content here...</p>');

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      <h2 className="text-3xl font-black text-[#1E293B] mb-6">Privacy Policy</h2>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onBlur={newContent => setContent(newContent)}
        // eslint-disable-next-line no-unused-vars
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

export default PrivacyPolicy;
