"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Quote,
  List,
  ListOrdered,
  Heading2,
  Undo,
  Redo,
} from "lucide-react";

interface EditorProps {
  value: string;
  onChange: (html: string) => void;
}

const EditorToolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const toggle = (fn: () => void, active: string) => {
    fn();
  };

  const btnClass = (isActive: boolean) =>
    `p-2 rounded hover:bg-muted transition-colors ${
      isActive ? "bg-muted text-primary font-bold" : "text-muted-foreground"
    }`;

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/20 items-center">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass(editor.isActive("strike"))}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>

      <div className="w-[1px] h-6 bg-border mx-2" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
        title="Section Header"
      >
        <Heading2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive("blockquote"))}
        title="Quote"
      >
        <Quote size={18} />
      </button>

      <div className="w-[1px] h-6 bg-border mx-2" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 text-muted-foreground hover:bg-muted rounded"
        disabled={!editor.can().undo()}
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 text-muted-foreground hover:bg-muted rounded"
        disabled={!editor.can().redo()}
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function RichTextEditor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your story here...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg bg-background shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-ring">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
