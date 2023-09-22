import type { BlockNoteEditor, BlockSchema, BlockSpec, PropSchema, SpecificBlock } from '@blocknote/core'

export type BlockRenderProps<Type extends string, BSchema extends BlockSchema, PSchema extends PropSchema> = {
  block: SpecificBlock<BSchema & { [k in Type]: BlockSpec<Type, PSchema> }, Type>
  editor: BlockNoteEditor<BSchema & { [k in Type]: BlockSpec<Type, PSchema> }>
}
