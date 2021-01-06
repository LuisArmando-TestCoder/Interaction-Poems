export default function downloadCanvasRecordingOnStop(mediaRecorder: MediaRecorder) {
    const chunks = []

    mediaRecorder.ondataavailable = event => chunks.push(event.data)
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, {type: 'video/webm'})
        try {
            const anchor: any = document.createElement('a')

            anchor.download = 'myvid.webm'
            anchor.href = URL.createObjectURL(blob)
    
            anchor.click()
        } catch (error) {
            console.error(error)
        }
    }
}