export interface CanvasSave {
    image: HTMLImageElement,
    event: Event
}

const downloadAnchor = document.createElement('a')

downloadAnchor.download = 'canvasScreen.png'

function downloadImage(base64: string) {
    downloadAnchor.href = base64
    downloadAnchor.click()
}

function retrieveImage({ base64, resolve, reject }) {
    const image = document.createElement('img')

    image.src = base64

    image.addEventListener('load', (event: Event) => {
        resolve({ image, event })
    })
    image.addEventListener('error', (event: Event) => {
        reject({ image, event })
    })
}

export default function saveCanvasScreen(canvas: HTMLCanvasElement): Promise<CanvasSave> {
    return new Promise((resolve, reject) => {
        const base64 = canvas.toDataURL()

        downloadImage(base64)
        retrieveImage({ base64, resolve, reject })
    })
}