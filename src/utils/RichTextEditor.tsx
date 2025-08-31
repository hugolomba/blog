import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_RICH_TEXT_EDITOR_API_KEY}
      value={value}
        onEditorChange={(newValue) => onChange(newValue)}
      init={{
        plugins: ['lists', 'link'],
        toolbar: 'undo redo| title | bold italic underline | bullist numlist | link',
      }}
      // initialValue={value}
    />
  );
}

