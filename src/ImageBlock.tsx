import { type Block, type BlockNoteEditor, type BlockSpec, type PropSchema } from '@blocknote/core'
import { InlineContent, createReactBlockSpec } from '@blocknote/react'
import type { BlockRenderProps } from './BlockRenderProps'
import styles from './ImageBlock.module.scss'
import { GetEditableSectionImageQuery, useBetterQuery, useImageUpload } from './dummy'

// BlockNoteJS Plug-in - Company Image Block

type ImageBlockPropSchema = PropSchema & {
  id: {
    default: string
  }
}

type ImageBlockSchema = {
  readonly image: BlockSpec<'image', ImageBlockPropSchema>
}

// ----- Default values -----

const UNDEFINED_IMAGE = ''
const imageProps: ImageBlockPropSchema = {
  id: {
    default: UNDEFINED_IMAGE,
  },
}

// ----- React component -----

type ImageBlockProps = BlockRenderProps<'image', ImageBlockSchema, ImageBlockPropSchema>

function ImageBlock({ block, editor }: ImageBlockProps) {
  const { events, uploading, onInputFileChange } = useImageUpload({
    editable: true,
    onChange: (arg: { id: string } | undefined) => {
      if (!arg) {
        return
      }

      editor.updateBlock(block.id, {
        props: {
          id: arg.id,
        },
      })
    },
  })

  const { data } = useBetterQuery(GetEditableSectionImageQuery, {
    skip: block.props.id === UNDEFINED_IMAGE,
    variables: {
      id: block.props.id,
    },
  })

  const inputFileId = `file-${block.id}`

  const src = block.props.id !== UNDEFINED_IMAGE && data?.editableSectionImage ? data.editableSectionImage.url : '/default-editor-image.png'

  return (
    <div >
      {editor.isEditable && (
        <input
          id={inputFileId}
          className="sr-only"
          type="file"
          onChange={onInputFileChange}
          disabled={uploading}
          accept={'.jpeg'}
        />
      )}
      <div className={styles.imgContainer}>
        <img src={src} alt="" {...events} contentEditable={false} />
        {editor.isEditable && (
          <label htmlFor={inputFileId} className={styles.editButton}>
            Edit 
          </label>
        )}
      </div>
      <InlineContent />
    </div>
  )
}

// ----------- exports ------------------

export const imageBlockSpec = createReactBlockSpec({
  type: 'image',
  propSchema: imageProps,
  containsInlineContent: true,
  render: ImageBlock,
})

export const imageMenuItem = {
  name: 'Image',
  execute: (editor: BlockNoteEditor<ImageBlockSchema>) => {
    const currentBlock: Block<ImageBlockSchema> = editor.getTextCursorPosition().block
    editor.insertBlocks(
      [
        {
          type: 'image',
        },
      ],
      currentBlock,
      'after',
    )
  },
  group: 'Other',
 
} as const
