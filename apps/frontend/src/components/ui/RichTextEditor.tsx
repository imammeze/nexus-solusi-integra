'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import ImageExt from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useCallback } from 'react';
import styles from './RichTextEditor.module.css';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: 'small' | 'default';
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Mulai menulis...',
  minHeight = 'default',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      ImageExt,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Sync external value changes (e.g. when loading data)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Masukkan URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Masukkan URL gambar:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={styles.editorWrapper}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        {/* Text Style */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${styles.toolbarBtn} ${editor.isActive('bold') ? styles.active : ''}`}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${styles.toolbarBtn} ${editor.isActive('italic') ? styles.active : ''}`}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${styles.toolbarBtn} ${editor.isActive('underline') ? styles.active : ''}`}
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${styles.toolbarBtn} ${editor.isActive('strike') ? styles.active : ''}`}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        {/* Headings */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`${styles.toolbarBtn} ${editor.isActive('heading', { level: 1 }) ? styles.active : ''}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${styles.toolbarBtn} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`${styles.toolbarBtn} ${editor.isActive('heading', { level: 3 }) ? styles.active : ''}`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${styles.toolbarBtn} ${editor.isActive('bulletList') ? styles.active : ''}`}
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${styles.toolbarBtn} ${editor.isActive('orderedList') ? styles.active : ''}`}
            title="Numbered List"
          >
            1.
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${styles.toolbarBtn} ${editor.isActive('blockquote') ? styles.active : ''}`}
            title="Blockquote"
          >
            ❝
          </button>
        </div>

        {/* Alignment */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'left' }) ? styles.active : ''}`}
            title="Align Left"
          >
            ≡
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'center' }) ? styles.active : ''}`}
            title="Align Center"
          >
            ≡
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'right' }) ? styles.active : ''}`}
            title="Align Right"
          >
            ≡
          </button>
        </div>

        {/* Insert */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={setLink}
            className={`${styles.toolbarBtn} ${editor.isActive('link') ? styles.active : ''}`}
            title="Insert Link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={addImage}
            className={styles.toolbarBtn}
            title="Insert Image"
          >
            🖼
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={styles.toolbarBtn}
            title="Horizontal Rule"
          >
            ―
          </button>
        </div>

        {/* Undo/Redo */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={styles.toolbarBtn}
            title="Undo"
          >
            ↩
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={styles.toolbarBtn}
            title="Redo"
          >
            ↪
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <EditorContent
        editor={editor}
        className={`${styles.editorContent} ${minHeight === 'small' ? styles.editorContentSmall : ''}`}
      />
    </div>
  );
}
