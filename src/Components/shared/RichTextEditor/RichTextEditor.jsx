import { useRef, useEffect, useState } from 'react';
import { Toolbar } from './Toolbar';
import { cn } from '../../../lib/utils';
import './EditorStyles.css';

/**
 * LuminaEditor - A professional, portable rich text editor component.
 * Built for precision rendering and high stability.
 */
export function RichTextEditor({ 
  content = '', 
  onChange, 
  onBlur, 
  onPreview = () => {},
  placeholder = 'Start typing your content here...',
  className
}) {
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [stats, setStats] = useState({ words: 0, characters: 0 });

  useEffect(() => {
    // Force the browser to use inline styles instead of semantic tags for maximum portability
    document.execCommand('styleWithCSS', false, 'true');
    
    if (contentRef.current) {
      let cleanHtml = content;
      // If the incoming content is "packaged" (contains our style block), unpack it
      if (content.includes('lumina-portable-content')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const mainDiv = tempDiv.querySelector('.lumina-portable-content');
        if (mainDiv) {
          cleanHtml = mainDiv.innerHTML;
        }
      }

      if (contentRef.current.innerHTML !== cleanHtml) {
        contentRef.current.innerHTML = cleanHtml;
        updateStats(contentRef.current.innerText);
      }
    }
  }, [content]);

  /**
   * Generates a portable, self-contained HTML string.
   * This includes a unique style block that ensures the content looks the same
   * on any site or app without needing external CSS.
   */
  const getPortableHtml = (rawHtml) => {
    const scopeId = `lumina-content-${Math.random().toString(36).slice(2, 9)}`;
    const styleBlock = `
<style>
  #${scopeId} { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.7; font-size: 16px; color: #374151; }
  #${scopeId} ul, #${scopeId} ol { list-style-position: outside; margin-left: 2rem; margin-top: 1rem; margin-bottom: 1rem; }
  #${scopeId} li { margin-bottom: 0.5rem; }
  #${scopeId} h1 { font-size: 32px; font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; color: #111827; }
  #${scopeId} h2 { font-size: 24px; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #111827; }
  #${scopeId} p { margin-bottom: 1rem; }
  #${scopeId} img { max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 2rem auto; }
  #${scopeId} table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; border: 1px solid #d1d5db; }
  #${scopeId} td, #${scopeId} th { border: 1px solid #d1d5db; padding: 0.75rem; text-align: left; }
  #${scopeId} blockquote { border-left: 4px solid #d1d5db; padding: 1rem 1.5rem; background: #f9fafb; font-style: italic; margin: 1.5rem 0; }
  #${scopeId} pre { background: #1e293b; color: #f8fafc; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; font-family: monospace; }
</style>
    `.replace(/\n/g, '').trim();

    return `${styleBlock}<div id="${scopeId}" class="lumina-portable-content">${rawHtml}</div>`;
  };

  const handleInput = () => {
    if (contentRef.current) {
      const rawHtml = contentRef.current.innerHTML;
      const portableHtml = getPortableHtml(rawHtml);
      onChange?.(portableHtml);
      updateStats(contentRef.current.innerText);
    }
  };

  const updateStats = (text) => {
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    setStats({ words, characters: chars });
  };

  const handleBlur = () => {
    if (contentRef.current) {
      onBlur?.(contentRef.current.innerHTML);
    }
  };

  // Function to execute commands
  const execCommand = (command, value) => {
    if (command === 'listStyle') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let node = selection.anchorNode;
        while (node && node !== contentRef.current) {
          if (node.nodeName === 'UL' || node.nodeName === 'OL') {
            node.style.listStyleType = value || '';
            break;
          }
          node = node.parentNode;
        }
      }
    } else {
      document.execCommand(command, false, value);
    }
    handleInput();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        execCommand('insertImage', dataUrl);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        const linkHtml = `<a href="${dataUrl}" download="${file.name}">📎 ${file.name}</a>&nbsp;`;
        execCommand('insertHTML', linkHtml);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  return (
    <div 
      className={cn(
        "rounded-sm border border-[#d1d5db] overflow-hidden bg-white shadow-sm flex flex-col",
        className
      )}
    >
      <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
      
      <Toolbar 
        onAction={execCommand} 
        onUploadImage={() => imageInputRef.current?.click()}
        onUploadFile={() => fileInputRef.current?.click()}
        onPreview={onPreview}
      />

      <div className="relative flex-1 overflow-auto bg-white min-h-[600px]">
        <div
          ref={contentRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleBlur}
          className="lumina-content-area outline-none p-[30px_40px] min-h-[600px]"
          data-placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
            }
          }}
        />
      </div>

      <div className="px-3 py-1.5 bg-[#f9fafb] border-t border-[#d1d5db] flex items-center justify-between text-[11px] text-[#6b7280] font-medium">
        <div className="flex gap-4">
          <span>Words: {stats.words}</span>
          <span>Chars: {stats.characters}</span>
        </div>
        <div className="font-semibold text-[#111827]">VIDZO ACTIVE</div>
      </div>
    </div >
  );
}
