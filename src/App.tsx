import { BlockNoteView, getDefaultReactSlashMenuItems, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { defaultBlockSchema } from '@blocknote/core'
import { imageBlockSpec, imageMenuItem } from "./ImageBlock";
import type { BlockSchema } from '@blocknote/core'

const schema = {
  ...defaultBlockSchema,
  image: imageBlockSpec,
} satisfies BlockSchema


const initialContentBug = [
  {
    id: '8910231',
    type: 'image',
    props: {
      id: 'image-189231'
    }
  }
];

const initialContent = null
/* const initialContent = initialContentBug */

export default function App() {
  // Creates a new editor instance.
  const editor = useBlockNote({
    blockSchema: schema,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(schema),
      // Custom menu items go here.
      // They need to satisfy ReactSlashMenuItem<typeof schema>.
      // See https://www.blocknotejs.org/docs/block-types#custom-block-types
      imageMenuItem,
    ],
    initialContent: initialContent as any
  });

  // Renders the editor instance using a React component.
  return (<div>
    <p>To reproduce bug: uncomment </p>
    <code>
      /* const initialContent = initialContentBug */
    </code>
    <BlockNoteView editor={editor} theme={"light"} /></div>);
}