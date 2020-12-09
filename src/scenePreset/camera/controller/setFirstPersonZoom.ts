export default function setFirstPersonZoom(camera: THREE.PerspectiveCamera) {
    const maxZoom = 100
    const minZoom = 10

    window.addEventListener("wheel", event => {
        const delta = -Math.sign(event.deltaY)
        const zoom = Math.min(maxZoom, Math.max(minZoom, camera.getFocalLength() + delta))
        
        camera.setFocalLength(zoom)
    })
}