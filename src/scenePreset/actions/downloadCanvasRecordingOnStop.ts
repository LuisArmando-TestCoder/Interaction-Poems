export default function downloadCanvasRecordingOnStop(mediaRecorder: MediaRecorder) {
    const chunks = []

    mediaRecorder.ondataavailable = event => chunks.push(event.data)
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, {type: 'video/webm'})
        if (window) {
            const anchor: any = window.document.createElement('a')

            anchor.download = 'myvid.webm'
            anchor.href = URL.createObjectURL(blob)
    
            anchor.click()
        }
    }
}