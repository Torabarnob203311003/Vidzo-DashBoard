import { 
  Bold, Italic, Underline, Strikethrough, 
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon, Table as TableIcon, 
  Undo, Redo, Minus, Baseline, 
  Subscript, Superscript, FileText, Eraser,
  Indent as IndentIcon, Outdent as OutdentIcon,
  Video, Terminal, PaintBucket, Highlighter,
  Eye
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

const COLORS = [
  '#000000', '#424242', '#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'
];

const ToolbarButton = ({ 
  onClick, 
  active, 
  disabled, 
  children, 
  title 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    onMouseDown={(e) => e.preventDefault()} // Prevents loss of focus in editor
    className={cn(
      "w-8 h-8 flex items-center justify-center rounded-[6px] transition-colors bg-transparent border-none text-[#1e293b]",
      "hover:bg-[#e2e8f0]",
      active && "bg-[#dbeafe] text-[#2563eb]",
      disabled && "opacity-30 cursor-not-allowed"
    )}
  >
    {children}
  </button>
);

export function Toolbar({ onAction, onUploadImage, onUploadFile, onPreview }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const Group = ({ children }) => (
    <div className="flex items-center gap-[1px] px-2 border-r border-[#d1d5db] h-8 last:border-r-0">
      {children}
    </div>
  );

  return (
    <div className="bg-[#f3f4f6] border-b border-[#d1d5db] p-1.5 flex flex-wrap gap-y-1 items-center shadow-sm">
      {/* 1. Source */}
      <Group>
        <ToolbarButton onClick={() => alert('Source view is disabled.')} title="Source Code">
          <Terminal size={15} strokeWidth={2.5} />
        </ToolbarButton>
      </Group>

      {/* 2. Basic Styling */}
      <Group>
        <ToolbarButton onClick={() => onAction('bold')} title="Bold">
          <Bold size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('italic')} title="Italic">
          <Italic size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('underline')} title="Underline">
          <Underline size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('strikeThrough')} title="Strikethrough">
          <Strikethrough size={15} strokeWidth={2.5} />
        </ToolbarButton>
      </Group>

      {/* 3. Script */}
      <Group>
        <ToolbarButton onClick={() => onAction('superscript')} title="Superscript">
          <Superscript size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('subscript')} title="Subscript">
          <Subscript size={15} strokeWidth={2.5} />
        </ToolbarButton>
      </Group>

      {/* 4. Lists & Indent */}
      <Group>
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={() => onAction('insertUnorderedList')} title="Bullets">
            <List size={15} strokeWidth={2.5} />
          </ToolbarButton>
          <select 
            className="text-[10px] bg-white border border-[#d1d5db] rounded px-0.5 h-7 focus:outline-none"
            onChange={(e) => onAction('listStyle', e.target.value)}
            title="Bullet Style"
            defaultValue="disc"
          >
            <option value="disc">Disc</option>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="none">None</option>
          </select>
        </div>
        
        <div className="flex items-center gap-0.5 ml-1">
          <ToolbarButton onClick={() => onAction('insertOrderedList')} title="Numbers">
            <ListOrdered size={15} strokeWidth={2.5} />
          </ToolbarButton>
          <select 
            className="text-[10px] bg-white border border-[#d1d5db] rounded px-0.5 h-7 focus:outline-none"
            onChange={(e) => onAction('listStyle', e.target.value)}
            title="Number Style"
            defaultValue="decimal"
          >
            <option value="decimal">1, 2, 3</option>
            <option value="lower-alpha">a, b, c</option>
            <option value="upper-alpha">A, B, C</option>
            <option value="lower-roman">i, ii, iii</option>
            <option value="upper-roman">I, II, III</option>
          </select>
        </div>
        
        <ToolbarButton onClick={() => onAction('outdent')} title="Outdent">
          <OutdentIcon size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('indent')} title="Indent">
          <IndentIcon size={15} strokeWidth={2.5} />
        </ToolbarButton>
      </Group>

      {/* 5. Typography & Color */}
      <Group>
        <select 
          className="text-[12px] bg-white border border-[#d1d5db] rounded px-1 h-7 focus:outline-none"
          onChange={(e) => onAction('fontName', e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times</option>
          <option value="Courier New">Courier</option>
          <option value="Georgia">Georgia</option>
        </select>
        <select 
          className="text-[12px] bg-white border border-[#d1d5db] rounded px-1 h-7 focus:outline-none ml-1"
          onChange={(e) => onAction('fontSize', e.target.value)}
        >
          <option value="3">16px</option>
          <option value="1">12px</option>
          <option value="2">14px</option>
          <option value="4">18px</option>
          <option value="5">24px</option>
          <option value="6">32px</option>
        </select>
        
        <div className="relative ml-1">
          <ToolbarButton onClick={() => setShowColorPicker(!showColorPicker)} title="Text Color">
            <Baseline size={15} strokeWidth={2.5} />
          </ToolbarButton>
          {showColorPicker && (
            <div
              className="absolute top-full left-0 mt-2 p-2 bg-white border border-[#d1d5db] shadow-xl rounded-lg grid grid-cols-5 gap-1 z-[100]"
            >
              {COLORS.map(color => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-sm border border-[#d1d5db] cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    onAction('foreColor', color);
                    setShowColorPicker(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="relative ml-1">
          <ToolbarButton onClick={() => setShowBgColorPicker(!showBgColorPicker)} title="Background Color">
            <PaintBucket size={15} strokeWidth={2.5} />
          </ToolbarButton>
          {showBgColorPicker && (
            <div
              className="absolute top-full left-0 mt-2 p-2 bg-white border border-[#d1d5db] shadow-xl rounded-lg grid grid-cols-5 gap-1 z-[100]"
            >
              {COLORS.map(color => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-sm border border-[#d1d5db] cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    onAction('hiliteColor', color);
                    setShowBgColorPicker(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <select 
          className="text-[12px] bg-white border border-[#d1d5db] rounded px-1 h-7 focus:outline-none ml-1"
          onChange={(e) => onAction('formatBlock', e.target.value)}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="blockquote">Quote</option>
          <option value="pre">Code</option>
        </select>
      </Group>

      {/* 6. Media & Tables */}
      <Group>
        <ToolbarButton onClick={onUploadImage} title="Image">
          <ImageIcon size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => alert('Video upload disabled')} title="Video">
          <Video size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={onUploadFile} title="File">
          <FileText size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => {
            const rows = window.prompt("Rows?", "3");
            const cols = window.prompt("Cols?", "3");
            if(rows && cols) {
              let tableHtml = '<table style="width:100%; border-collapse: collapse; border: 1px solid #d1d5db; margin: 16px 0;">';
              for(let i=0; i<parseInt(rows); i++) {
                tableHtml += '<tr>';
                for(let j=0; j<parseInt(cols); j++) {
                  tableHtml += '<td style="border: 1px solid #d1d5db; padding: 8px; min-height: 24px;">&nbsp;</td>';
                }
                tableHtml += '</tr>';
              }
              tableHtml += '</table>';
              onAction('insertHTML', tableHtml);
            }
          }} 
          title="Table"
        >
          <TableIcon size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('createLink', window.prompt('URL') || '')} title="Link">
          <LinkIcon size={15} strokeWidth={2.5} />
        </ToolbarButton>
      </Group>

      {/* 7. Align & Flow */}
      <Group>
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={() => onAction('justifyLeft')} title="Align Left">
            <AlignLeft size={15} strokeWidth={2.5} />
          </ToolbarButton>
          <ToolbarButton onClick={() => onAction('justifyCenter')} title="Align Center">
            <AlignCenter size={15} strokeWidth={2.5} />
          </ToolbarButton>
          <ToolbarButton onClick={() => onAction('justifyRight')} title="Align Right">
            <AlignRight size={15} strokeWidth={2.5} />
          </ToolbarButton>
          <ToolbarButton onClick={() => onAction('justifyFull')} title="Justify">
            <AlignJustify size={15} strokeWidth={2.5} />
          </ToolbarButton>
        </div>
        <div className="flex items-center gap-0.5 ml-2">
          <ToolbarButton onClick={() => onAction('undo')} title="Undo">
            <Undo size={15} strokeWidth={2.5} />
          </ToolbarButton>
          <ToolbarButton onClick={() => onAction('redo')} title="Redo">
            <Redo size={15} strokeWidth={2.5} />
          </ToolbarButton>
        </div>
      </Group>

      {/* 8. Extra Utils */}
      <Group>
        <ToolbarButton onClick={() => onAction('insertHorizontalRule')} title="Horizontal Line">
          <Minus size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('removeFormat')} title="Eraser">
          <Eraser size={15} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton onClick={() => alert('Format painter not implemented')} title="Copy Format">
          <Highlighter size={15} strokeWidth={2.5} />
        </ToolbarButton>
      </Group>

      {/* 9. View (High Model Trigger) */}
      <Group>
        <ToolbarButton onClick={onPreview} title="Show Preview">
          <Eye size={15} strokeWidth={2.5} />
        </ToolbarButton>
      </Group>
    </div>
  );
}
