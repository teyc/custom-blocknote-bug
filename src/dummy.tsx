import { useEffect, useState } from "react"

export const GetEditableSectionImageQuery = ''
export function useBetterQuery(queryName: unknown, options: unknown) {
    const [state, setState] = useState<ImageBlockData | undefined>()
    useEffect(() => {
        setTimeout(() => setState({
            editableSectionImage: {
                url: 'https://www.blocknotejs.org/img/logos/banner.svg'
            }
        }), 1000)
    })
    return { data: state }
}

export function useImageUpload(arg0: { editable: boolean; onChange: (arg: { id: string}  | undefined) => void }): { events: any; uploading: any; onInputFileChange: any } {
    throw new Error('Function not implemented.')
  }
  
  
type ImageBlockData = {
    editableSectionImage: {
        url: string
    }
}