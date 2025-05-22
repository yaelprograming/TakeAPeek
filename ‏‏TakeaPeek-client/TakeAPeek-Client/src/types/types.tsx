// export type User = {
//     id?: string | undefined,
//     name: string ,
//     email: string ,
//     password: string,
//     roleName: 'Viewer' | 'Editor' | 'Admin'|string;
    
//     }

export type MyFile={

        id: string;
        name: string; // שם הקובץ כפי שמגיע מהשרת
        fileType: string; // סוג הקובץ
        size: number; // גודל הקובץ
        s3Key: string; // מפתח ה-S3
        IsDeleted:false|true|"false"|"true"|""
        OwnerId:string
}

export type MyFolder= {
    id: string;
    name: string;
    s3Key: string; // מפתח ה-S3
    parentFolderId: string,
        IsDeleted:false|true|"false"|"true"|""
        OwnerId:string

}

// export interface CollageImage {
//         id: string
//         file: File
//         url: string
//         width: number
//         height: number
//         x: number
//         y: number
//         rotation: number
//         flipped: boolean
//         scale: number
//       }
      
//       export interface Template {
//         id: string
//         name: string
//         layout: {
//           x: number
//           y: number
//           width: number
//           height: number
//         }[]
//         thumbnail: string
//       }
      
//       export interface AspectRatio {
//         id: string
//         name: string
//         value: number
//       }

export interface CollageImage {
        id: string
        file?: File
        url?: string
        width: number
        height: number
        x: number
        y: number
        rotation: number
        flipped: boolean
        scale: number
        opacity?: number
        borderRadius?: number
        shadow?: boolean
      }
      
      export interface CollageText {
        id: string
        content: string
        x: number
        y: number
        width: number
        height: number
        fontFamily?: string
        fontSize?: number
        color?: string
        bold?: boolean
        italic?: boolean
        underline?: boolean
        align?: "left" | "center" | "right"
        opacity?: number
        backgroundColor?: string
        borderRadius?: number
        shadow?: boolean
      }
      
      export interface Template {
        id: string
        name: string
        layout: TemplatePosition[]
        thumbnail: string
      }
      
      export interface TemplatePosition {
        x: number
        y: number
        width: number
        height: number
      }
      
      export interface AspectRatio {
        id: string
        name: string
        value: number
      }
      