import { Editor } from '@tinymce/tinymce-react';

export default function App() {
  return (
    <Editor
      apiKey='4cx74upvye1c3jlc6yvp7gwovem4tuxy7k8hcr0hi33ahbso'
      init={{
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          
          
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | checklist numlist bullist | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        uploadcare_public_key: '804d9ccbe88f7b4b2c4a',
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}